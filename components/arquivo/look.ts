/** Partes do boneco que trocam de cor. */
export type Part = "skin" | "hair" | "shirt" | "pants";
export const PARTS: Part[] = ["skin", "hair", "shirt", "pants"];

/**
 * Personagens do pacote Mini Characters, do Kenney (CC0), em
 * `public/personagens`. Fica aqui, e não no avatar, para o HUD não puxar o
 * three.js junto.
 */
export const CHARACTERS = [
  "character-male-d",
  "character-female-d",
  "character-female-e",
  "character-male-e",
  "character-female-b",
  "character-male-a",
  "character-female-f",
  "character-male-f",
  "character-female-c",
  "character-male-b",
  "character-female-a",
  "character-male-c",
] as const;

export const characterUrl = (index: number) =>
  `/personagens/${CHARACTERS[index % CHARACTERS.length]}.glb`;

/**
 * A aparência do boneco: modelo base, cores por parte e acessórios. Fica só
 * no navegador de quem escolheu.
 */
export type Glasses = "nenhum" | "grau" | "escuro";
export type Hat = "nenhum" | "bone" | "fone";

export type Look = {
  base: number;
  colors: Record<Part, string | null>;
  glasses: Glasses;
  hat: Hat;
};

export const DEFAULT_LOOK: Look = {
  base: 0,
  colors: { skin: null, hair: null, shirt: null, pants: null },
  glasses: "nenhum",
  hat: "nenhum",
};

/** Cada parte começa pela cor original do modelo (`null`). */
export const SWATCHES: Record<Part, string[]> = {
  skin: ["#F6D5B8", "#EDB894", "#D9946B", "#B56E48", "#8A4F33", "#5C3523"],
  hair: ["#2B2626", "#5A3A26", "#9A6234", "#E2B862", "#C4552D", "#BDBDC6", "#4A6FC1", "#D46AA8"],
  shirt: [
    "#3E6FA8",
    "#2F3640",
    "#F4F1EA",
    "#C8483E",
    "#E0A43A",
    "#5E9C6A",
    "#8C6BC8",
    "#E77FA6",
    "#4FB3BF",
    "#F08A4B",
  ],
  pants: ["#2F3640", "#3D4F7A", "#5B6470", "#7A5C45", "#C9B48A", "#5E8C61", "#8E3B46", "#E8E4DA"],
};

export const PART_LABEL: Record<Part, string> = {
  skin: "Pele",
  hair: "Cabelo",
  shirt: "Roupa",
  pants: "Calça",
};

export const GLASSES: { value: Glasses; label: string }[] = [
  { value: "nenhum", label: "Sem" },
  { value: "grau", label: "De grau" },
  { value: "escuro", label: "Escuros" },
];

export const HATS: { value: Hat; label: string }[] = [
  { value: "nenhum", label: "Nada" },
  { value: "bone", label: "Boné" },
  { value: "fone", label: "Fone" },
];

export function randomLook(): Look {
  const pick = <T>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)];
  return {
    base: Math.floor(Math.random() * CHARACTERS.length),
    colors: {
      skin: pick(SWATCHES.skin),
      hair: pick(SWATCHES.hair),
      shirt: pick(SWATCHES.shirt),
      pants: pick(SWATCHES.pants),
    },
    glasses: pick(GLASSES).value,
    hat: pick(HATS).value,
  };
}

/* ------------------------------------------------------------------ */
/* Guardado no navegador                                              */
/* ------------------------------------------------------------------ */

const KEY = "arquivo:visual";
/** Versão anterior, que só guardava o número do modelo. */
const OLD_KEY = "arquivo:boneco";
const EVENT = "arquivo:visual";

const HEX = /^#[0-9a-f]{6}$/i;

function parse(raw: string | null, old: string | null): Look {
  if (!raw) {
    const base = Number(old);
    return Number.isInteger(base) && base >= 0
      ? { ...DEFAULT_LOOK, base: base % CHARACTERS.length }
      : DEFAULT_LOOK;
  }
  try {
    const data = JSON.parse(raw) as Partial<Look>;
    const color = (value: unknown) => (typeof value === "string" && HEX.test(value) ? value : null);
    return {
      base:
        Number.isInteger(data.base) && data.base! >= 0 ? data.base! % CHARACTERS.length : 0,
      colors: {
        skin: color(data.colors?.skin),
        hair: color(data.colors?.hair),
        shirt: color(data.colors?.shirt),
        pants: color(data.colors?.pants),
      },
      glasses: GLASSES.some((g) => g.value === data.glasses) ? data.glasses! : "nenhum",
      hat: HATS.some((h) => h.value === data.hat) ? data.hat! : "nenhum",
    };
  } catch {
    return DEFAULT_LOOK;
  }
}

/** Para quando o navegador bloqueia o localStorage: vale até recarregar. */
let fallback: string | null = null;
let cache: { raw: string | null; look: Look } | null = null;

export function readLook(): Look {
  let raw = fallback;
  let old: string | null = null;
  try {
    raw = localStorage.getItem(KEY) ?? fallback;
    old = localStorage.getItem(OLD_KEY);
  } catch {}
  // useSyncExternalStore exige o mesmo objeto enquanto nada mudou.
  if (!cache || cache.raw !== raw) cache = { raw, look: parse(raw, old) };
  return cache.look;
}

export function saveLook(look: Look) {
  const raw = JSON.stringify(look);
  fallback = raw;
  try {
    localStorage.setItem(KEY, raw);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeLook(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export const serverLook = () => DEFAULT_LOOK;
