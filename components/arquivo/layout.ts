import type { TaskStatus } from "@/lib/log";

/**
 * O arquivo é gerado a partir das demandas da semana: cada projeto vira uma
 * estante e cada demanda vira uma pasta nela. A cena só desenha o que sai
 * daqui, então mudar o escritório é mexer nestes números, não em componente.
 *
 * Unidades em metros; o chão é o plano y = 0 e as estantes olham para +z,
 * de frente para a câmera.
 */

/** O que a cena entende como destino: uma pasta ou o quadro de pendências. */
export type Target = { kind: "folder"; id: string } | { kind: "board" };
/** Pedido do HUD; `n` muda a cada pedido para repetir o mesmo destino. */
export type Command = { target: Target; n: number };
export const BOARD_KEY = "pendencias";

export type FolderInput = { id: string; project: string; status: TaskStatus };

export type Box = { minX: number; maxX: number; minZ: number; maxZ: number };

export type FolderSlot = {
  id: string;
  status: TaskStatus;
  /** Centro da pasta no mundo. */
  x: number;
  y: number;
  z: number;
  /** 0 = prateleira de cima. Decide até onde o boneco levanta o braço. */
  shelf: number;
  /** Onde o boneco para para pegar a pasta. */
  standX: number;
  standZ: number;
};

export type Cabinet = {
  slug: string;
  name: string;
  x: number;
  z: number;
  width: number;
  folders: FolderSlot[];
  open: number;
  done: number;
};

export type Layout = {
  width: number;
  depth: number;
  cabinets: Cabinet[];
  board: { x: number; z: number; standX: number; standZ: number };
  desk: { x: number; z: number };
  coffee: { x: number; z: number };
  plants: { x: number; z: number }[];
  rug: { x: number; z: number; w: number; d: number };
  spawn: { x: number; z: number };
  colliders: Box[];
};

export const CABINET = { depth: 0.45, height: 1.5 };
export const FOLDER = { thickness: 0.055, height: 0.34, depth: 0.3, pitch: 0.075 };
/** Altura do tampo de cada prateleira, de cima para baixo. */
export const SHELVES = [1.02, 0.56, 0.1];
export const BOARD = { width: 2.4, height: 1.2, y: 1.15 };

const ROW_GAP = 0.6;
const MAX_ROW = 11;
const STAND_OFFSET = 0.5;

function cabinetWidth(count: number) {
  const perShelf = Math.max(4, Math.ceil(count / SHELVES.length));
  return Math.max(1.1, perShelf * FOLDER.pitch + 0.35);
}

export function buildLayout(
  items: FolderInput[],
  names: Record<string, string>,
): Layout {
  const byProject = new Map<string, FolderInput[]>();
  for (const item of items) {
    const list = byProject.get(item.project) ?? [];
    list.push(item);
    byProject.set(item.project, list);
  }
  const projects = [...byProject.entries()].sort(
    (a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]),
  );

  // Fileiras de estantes: a primeira encostada na parede do fundo, as outras
  // soltas no meio da sala, todas viradas para a câmera.
  const rows: { slug: string; list: FolderInput[]; width: number }[][] = [[]];
  let rowLength = 0;
  for (const [slug, list] of projects) {
    const width = cabinetWidth(list.length);
    if (rowLength > 0 && rowLength + ROW_GAP + width > MAX_ROW) {
      rows.push([]);
      rowLength = 0;
    }
    rows[rows.length - 1].push({ slug, list, width });
    rowLength += (rowLength > 0 ? ROW_GAP : 0) + width;
  }

  const lengths = rows.map((row) =>
    row.reduce((sum, c, i) => sum + c.width + (i > 0 ? ROW_GAP : 0), 0),
  );
  const width = Math.max(12, Math.max(...lengths) + 4);
  const depth = 9 + (rows.length - 1) * 3;
  const left = -width / 2;
  const back = -depth / 2;

  const cabinets: Cabinet[] = [];
  rows.forEach((row, r) => {
    const z = back + 0.15 + CABINET.depth / 2 + r * 3;
    // Desloca a fileira para a direita para deixar o canto do quadro livre.
    let x = left + 2.6 + (width - 2.6 - lengths[r]) / 2 - 0.3;
    for (const { slug, list, width: w } of row) {
      const cx = x + w / 2;
      cabinets.push(placeCabinet(slug, names[slug] ?? slug, list, cx, z, w));
      x += w + ROW_GAP;
    }
  });

  const board = {
    x: left + 0.12,
    z: back + 2.4,
    standX: left + 0.12 + 0.75,
    standZ: back + 2.4,
  };
  const desk = { x: width / 2 - 2.6, z: depth / 2 - 2.2 };
  const coffee = { x: left + 0.55, z: depth / 2 - 2.2 };
  const plants = [
    { x: left + 0.5, z: back + 0.5 },
    { x: width / 2 - 0.5, z: back + 0.5 },
    { x: left + 0.5, z: depth / 2 - 3.6 },
  ];
  const rug = { x: 0, z: depth / 2 - 2.6, w: 3.2, d: 2 };
  const spawn = { x: 0, z: depth / 2 - 1 };

  const colliders: Box[] = [
    ...cabinets.map((c) => ({
      minX: c.x - c.width / 2,
      maxX: c.x + c.width / 2,
      minZ: c.z - CABINET.depth / 2,
      maxZ: c.z + CABINET.depth / 2,
    })),
    // Mesa + cadeira.
    { minX: desk.x - 0.8, maxX: desk.x + 0.8, minZ: desk.z - 0.4, maxZ: desk.z + 0.95 },
    // Balcão do café.
    { minX: coffee.x - 0.35, maxX: coffee.x + 0.35, minZ: coffee.z - 0.7, maxZ: coffee.z + 0.7 },
    ...plants.map((p) => ({
      minX: p.x - 0.25,
      maxX: p.x + 0.25,
      minZ: p.z - 0.25,
      maxZ: p.z + 0.25,
    })),
  ];

  return { width, depth, cabinets, board, desk, coffee, plants, rug, spawn, colliders };
}

function placeCabinet(
  slug: string,
  name: string,
  list: FolderInput[],
  x: number,
  z: number,
  width: number,
): Cabinet {
  // Em andamento primeiro: fica na prateleira de cima, à altura dos olhos.
  const sorted = [...list].sort(
    (a, b) => Number(a.status === "entregue") - Number(b.status === "entregue"),
  );
  const perShelf = Math.max(4, Math.ceil(sorted.length / SHELVES.length));
  const front = z + CABINET.depth / 2;

  const folders = sorted.map((item, index) => {
    const shelf = Math.floor(index / perShelf);
    const col = index % perShelf;
    const fx = x - (perShelf * FOLDER.pitch) / 2 + (col + 0.5) * FOLDER.pitch;
    return {
      id: item.id,
      status: item.status,
      x: fx,
      y: SHELVES[shelf] + 0.02 + FOLDER.height / 2,
      z: z + 0.04,
      shelf,
      standX: fx,
      standZ: front + STAND_OFFSET,
    };
  });

  return {
    slug,
    name,
    x,
    z,
    width,
    folders,
    open: list.filter((i) => i.status !== "entregue").length,
    done: list.filter((i) => i.status === "entregue").length,
  };
}
