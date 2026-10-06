import {
  CanvasTexture,
  SRGBColorSpace,
  type BufferAttribute,
  type Material,
  type MeshStandardMaterial,
  type Object3D,
  type SkinnedMesh,
  type Texture,
} from "three";
import { PARTS, type Part } from "./look";

/**
 * Troca de cor dos personagens do Kenney.
 *
 * A textura deles é uma tabela de rampas: cada material ocupa um bloco de
 * 64×128 px (8 colunas × 4 linhas na imagem) com um degradê que faz a sombra.
 * As duas linhas de cima estão vazias. Para pintar a camisa de vermelho, a
 * gente desenha uma rampa vermelha num bloco vazio e aponta para lá só os
 * vértices da camisa — o sombreado vem junto, porque cada vértice mantém a
 * posição dentro do bloco.
 */


const COLS = 8;
const ROWS = 4;
/** Rampas de pele do pacote (salmão, marrom, clara), em `coluna,linha`. */
const SKIN_BLOCKS = new Set(["5,3", "6,3", "7,3"]);
/** Bloco vazio que recebe a rampa nova de cada parte. */
const TARGET: Record<Part, [number, number]> = {
  skin: [0, 0],
  hair: [1, 0],
  shirt: [2, 0],
  pants: [3, 0],
};
/** Todo rosto do pacote tem 220 vértices de pele na cabeça. */
const FACE_VERTICES = 220;

type MeshInfo = {
  mesh: SkinnedMesh;
  original: Float32Array;
  parts: (Part | null)[];
};

export type Recolor = {
  meshes: MeshInfo[];
  source: Partial<Record<Part, [number, number]>>;
  pixels: ImageData;
  map: Texture;
};

const blockOf = (u: number, v: number) =>
  `${Math.min(COLS - 1, Math.floor(u * COLS))},${Math.min(ROWS - 1, Math.floor(v * ROWS))}`;

const parseBlock = (key: string) => key.split(",").map(Number) as [number, number];

function count(map: Map<string, number>, key: string) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function argmax(map: Map<string, number>, skip: (key: string) => boolean) {
  let best: string | null = null;
  for (const [key, n] of map) {
    if (!skip(key) && (best === null || n > map.get(best)!)) best = key;
  }
  return best;
}

/** Olhos e boca: escuros como muito cabelo, mas não são cabelo. */
const isFace = (x: number, y: number, z: number) =>
  z > 0.14 && y > 0.39 && y < 0.52 && Math.abs(x) < 0.11;

/**
 * Descobre, no modelo já clonado, qual bloco é a pele, o cabelo, a camisa e
 * a calça, e marca cada vértice. Clona geometria e material para que a troca
 * de cor não vaze para outro boneco que use o mesmo arquivo.
 */
export function analyze(model: Object3D): Recolor | null {
  const meshes: SkinnedMesh[] = [];
  model.traverse((o) => {
    if ((o as SkinnedMesh).isSkinnedMesh) meshes.push(o as SkinnedMesh);
  });
  const sample = meshes[0]?.material as MeshStandardMaterial | undefined;
  const image = sample?.map?.image as CanvasImageSource & { width: number; height: number };
  if (!sample?.map || !image) return null;

  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(image, 0, 0);
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const head = new Map<string, number>();
  const hairCandidates = new Map<string, number>();
  const arms = new Map<string, number>();
  const torso = new Map<string, number>();
  const legs = new Map<string, number>();

  type Vertex = { block: string; joint: string; face: boolean };
  const vertices = new Map<SkinnedMesh, Vertex[]>();

  for (const mesh of meshes) {
    mesh.geometry = mesh.geometry.clone();
    mesh.material = (mesh.material as Material).clone();
    const uv = mesh.geometry.attributes.uv as BufferAttribute;
    const pos = mesh.geometry.attributes.position as BufferAttribute;
    const index = mesh.geometry.attributes.skinIndex as BufferAttribute;
    const weight = mesh.geometry.attributes.skinWeight as BufferAttribute;
    const isHead = mesh.name.includes("head");
    const list: Vertex[] = [];

    for (let i = 0; i < uv.count; i++) {
      let k = 0;
      for (let j = 1; j < 4; j++) if (weight.getComponent(i, j) > weight.getComponent(i, k)) k = j;
      const joint = mesh.skeleton.bones[index.getComponent(i, k)]?.name ?? "";
      const block = blockOf(uv.getX(i), uv.getY(i));
      const face = isHead && isFace(pos.getX(i), pos.getY(i), pos.getZ(i));
      list.push({ block, joint, face });

      if (isHead) {
        count(head, block);
        if (!face) count(hairCandidates, block);
      } else if (joint.startsWith("arm")) count(arms, block);
      else if (joint === "torso") count(torso, block);
      else if (joint.startsWith("leg")) count(legs, block);
    }
    vertices.set(mesh, list);
  }

  // Pele: bloco de pele presente na cabeça; se também estiver nas mãos, melhor.
  const inHead = [...head.keys()].filter((b) => SKIN_BLOCKS.has(b));
  const inHands = inHead.filter((b) => arms.has(b));
  const pool = inHands.length ? inHands : inHead;
  const skin = pool.sort(
    (a, b) => Math.abs(head.get(a)! - FACE_VERTICES) - Math.abs(head.get(b)! - FACE_VERTICES),
  )[0];

  const hair = argmax(hairCandidates, (b) => b === skin);
  // Camisa: o peito pesa quatro vezes mais que os braços, senão a muleta ou
  // a luva (que aparecem nos dois braços) ganham da roupa.
  const top = new Map<string, number>();
  for (const [b, n] of torso) top.set(b, (top.get(b) ?? 0) + 4 * n);
  for (const [b, n] of arms) top.set(b, (top.get(b) ?? 0) + n);
  const shirt = argmax(top, (b) => SKIN_BLOCKS.has(b));
  const pants = argmax(legs, (b) => SKIN_BLOCKS.has(b));

  const infos: MeshInfo[] = [];
  for (const [mesh, list] of vertices) {
    const isHead = mesh.name.includes("head");
    const parts = list.map(({ block, joint, face }): Part | null => {
      if (block === skin) return "skin";
      if (isHead) return block === hair && !face ? "hair" : null;
      if ((joint === "torso" || joint.startsWith("arm")) && block === shirt) return "shirt";
      if (joint.startsWith("leg") && block === pants) return "pants";
      return null;
    });
    const uv = mesh.geometry.attributes.uv as BufferAttribute;
    infos.push({ mesh, original: Float32Array.from(uv.array as ArrayLike<number>), parts });
  }

  const source: Recolor["source"] = {};
  if (skin) source.skin = parseBlock(skin);
  if (hair) source.hair = parseBlock(hair);
  if (shirt) source.shirt = parseBlock(shirt);
  if (pants) source.pants = parseBlock(pants);

  return { meshes: infos, source, pixels, map: sample.map };
}

/* ------------------------------------------------------------------ */

function hexToHsl(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return rgbToHsl((n >> 16) & 255, (n >> 8) & 255, n & 255);
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h =
    max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const channel = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [channel(h + 1 / 3) * 255, channel(h) * 255, channel(h - 1 / 3) * 255];
}

/**
 * Aplica as cores escolhidas: desenha as rampas novas numa cópia da textura e
 * move as coordenadas de textura das partes trocadas. `null` mantém a cor
 * original. Devolve a textura nova (o chamador descarta a anterior).
 */
export function applyColors(
  recolor: Recolor,
  colors: Partial<Record<Part, string | null>>,
): Texture {
  const { pixels, source, map } = recolor;
  const w = pixels.width;
  const h = pixels.height;
  const bw = w / COLS;
  const bh = h / ROWS;
  const out = new ImageData(new Uint8ClampedArray(pixels.data), w, h);

  for (const part of PARTS) {
    const color = colors[part];
    const from = source[part];
    if (!color || !from) continue;
    const [tx, ty] = TARGET[part];
    const [th, ts, tl] = hexToHsl(color);

    // Mantém o desenho da sombra: cada pixel fica tão mais claro ou escuro
    // que a média do bloco quanto era no original.
    let mean = 0;
    for (let y = 0; y < bh; y++) {
      for (let x = 0; x < bw; x++) {
        const i = ((from[1] * bh + y) * w + from[0] * bw + x) * 4;
        mean += rgbToHsl(pixels.data[i], pixels.data[i + 1], pixels.data[i + 2])[2];
      }
    }
    mean /= bw * bh;

    for (let y = 0; y < bh; y++) {
      for (let x = 0; x < bw; x++) {
        const i = ((from[1] * bh + y) * w + from[0] * bw + x) * 4;
        const o = ((ty * bh + y) * w + tx * bw + x) * 4;
        const l = rgbToHsl(pixels.data[i], pixels.data[i + 1], pixels.data[i + 2])[2];
        const [r, g, b] = hslToRgb(th, ts, Math.min(0.97, Math.max(0.03, tl + (l - mean))));
        out.data[o] = r;
        out.data[o + 1] = g;
        out.data[o + 2] = b;
        out.data[o + 3] = 255;
      }
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")!.putImageData(out, 0, 0);
  const texture = new CanvasTexture(canvas);
  texture.flipY = map.flipY;
  texture.colorSpace = SRGBColorSpace;
  texture.magFilter = map.magFilter;
  texture.minFilter = map.minFilter;
  texture.wrapS = map.wrapS;
  texture.wrapT = map.wrapT;

  for (const { mesh, original, parts } of recolor.meshes) {
    const uv = mesh.geometry.attributes.uv as BufferAttribute;
    const array = uv.array as Float32Array;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const from = part && colors[part] ? source[part] : undefined;
      if (part && from) {
        const [tx, ty] = TARGET[part];
        array[i * 2] = original[i * 2] + (tx - from[0]) / COLS;
        array[i * 2 + 1] = original[i * 2 + 1] + (ty - from[1]) / ROWS;
      } else {
        array[i * 2] = original[i * 2];
        array[i * 2 + 1] = original[i * 2 + 1];
      }
    }
    uv.needsUpdate = true;
    (mesh.material as MeshStandardMaterial).map = texture;
    (mesh.material as MeshStandardMaterial).needsUpdate = true;
  }

  return texture;
}
