import type { Box, Layout } from "./layout";

/**
 * Caminho do boneco até a pasta. Linha reta bateria em estante no meio do
 * caminho, então a sala vira uma grade, o A* acha a rota e depois os cantos
 * desnecessários são cortados enquanto houver linha de visão.
 */

export const RADIUS = 0.28;
const CELL = 0.2;

export type Grid = {
  cols: number;
  rows: number;
  originX: number;
  originZ: number;
  blocked: Uint8Array;
};

export function bounds(layout: Layout) {
  const margin = 0.25 + RADIUS;
  return {
    minX: -layout.width / 2 + margin,
    maxX: layout.width / 2 - margin,
    minZ: -layout.depth / 2 + margin,
    maxZ: layout.depth / 2 - margin,
  };
}

const inside = (box: Box, x: number, z: number, pad: number) =>
  x > box.minX - pad && x < box.maxX + pad && z > box.minZ - pad && z < box.maxZ + pad;

export function isFree(layout: Layout, x: number, z: number) {
  const room = bounds(layout);
  if (x < room.minX || x > room.maxX || z < room.minZ || z > room.maxZ) return false;
  return !layout.colliders.some((box) => inside(box, x, z, RADIUS));
}

export function buildGrid(layout: Layout): Grid {
  const cols = Math.ceil(layout.width / CELL);
  const rows = Math.ceil(layout.depth / CELL);
  const originX = -layout.width / 2;
  const originZ = -layout.depth / 2;
  const blocked = new Uint8Array(cols * rows);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = originX + (c + 0.5) * CELL;
      const z = originZ + (r + 0.5) * CELL;
      blocked[r * cols + c] = isFree(layout, x, z) ? 0 : 1;
    }
  }
  return { cols, rows, originX, originZ, blocked };
}

const cellOf = (g: Grid, x: number, z: number) => ({
  c: Math.min(g.cols - 1, Math.max(0, Math.floor((x - g.originX) / CELL))),
  r: Math.min(g.rows - 1, Math.max(0, Math.floor((z - g.originZ) / CELL))),
});

const center = (g: Grid, i: number) => ({
  x: g.originX + ((i % g.cols) + 0.5) * CELL,
  z: g.originZ + (Math.floor(i / g.cols) + 0.5) * CELL,
});

/** Célula livre mais próxima, para quando o destino cai dentro de um móvel. */
function nearestFree(g: Grid, start: number) {
  if (!g.blocked[start]) return start;
  const seen = new Uint8Array(g.blocked.length);
  const queue = [start];
  seen[start] = 1;
  for (let head = 0; head < queue.length; head++) {
    const i = queue[head];
    if (!g.blocked[i]) return i;
    const c = i % g.cols;
    const r = Math.floor(i / g.cols);
    for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nc = c + dc;
      const nr = r + dr;
      if (nc < 0 || nr < 0 || nc >= g.cols || nr >= g.rows) continue;
      const n = nr * g.cols + nc;
      if (!seen[n]) {
        seen[n] = 1;
        queue.push(n);
      }
    }
  }
  return start;
}

function lineOfSight(g: Grid, a: { x: number; z: number }, b: { x: number; z: number }) {
  const steps = Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / (CELL / 2));
  for (let s = 1; s < steps; s++) {
    const t = s / steps;
    const { c, r } = cellOf(g, a.x + (b.x - a.x) * t, a.z + (b.z - a.z) * t);
    if (g.blocked[r * g.cols + c]) return false;
  }
  return true;
}

export function findPath(
  g: Grid,
  from: { x: number; z: number },
  to: { x: number; z: number },
): { x: number; z: number }[] {
  const s = cellOf(g, from.x, from.z);
  const e = cellOf(g, to.x, to.z);
  const start = nearestFree(g, s.r * g.cols + s.c);
  const goal = nearestFree(g, e.r * g.cols + e.c);
  const exact = goal === e.r * g.cols + e.c;
  const end = exact ? to : center(g, goal);

  if (lineOfSight(g, from, end)) return [end];

  const n = g.blocked.length;
  const cost = new Float32Array(n).fill(Infinity);
  const prev = new Int32Array(n).fill(-1);
  const closed = new Uint8Array(n);
  const open: number[] = [start];
  cost[start] = 0;
  const gc = goal % g.cols;
  const gr = Math.floor(goal / g.cols);
  const h = (i: number) => Math.hypot((i % g.cols) - gc, Math.floor(i / g.cols) - gr);

  while (open.length) {
    // A grade é pequena (algumas milhares de células): busca linear basta.
    let best = 0;
    for (let k = 1; k < open.length; k++) {
      if (cost[open[k]] + h(open[k]) < cost[open[best]] + h(open[best])) best = k;
    }
    const i = open.splice(best, 1)[0];
    if (i === goal) break;
    if (closed[i]) continue;
    closed[i] = 1;
    const c = i % g.cols;
    const r = Math.floor(i / g.cols);
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (!dr && !dc) continue;
        const nc = c + dc;
        const nr = r + dr;
        if (nc < 0 || nr < 0 || nc >= g.cols || nr >= g.rows) continue;
        const j = nr * g.cols + nc;
        if (g.blocked[j] || closed[j]) continue;
        // Diagonal não corta quina de móvel.
        if (dr && dc && (g.blocked[r * g.cols + nc] || g.blocked[nr * g.cols + c])) continue;
        const next = cost[i] + (dr && dc ? Math.SQRT2 : 1);
        if (next < cost[j]) {
          cost[j] = next;
          prev[j] = i;
          open.push(j);
        }
      }
    }
  }

  if (prev[goal] === -1 && goal !== start) return [];

  const cells: { x: number; z: number }[] = [];
  for (let i = goal; i !== -1 && i !== start; i = prev[i]) cells.unshift(center(g, i));
  cells[cells.length - 1] = end;

  // Corta os degraus da grade: de cada ponto, pula para o mais distante visível.
  const path: { x: number; z: number }[] = [];
  let anchor = from;
  let k = 0;
  while (k < cells.length) {
    let far = k;
    for (let m = cells.length - 1; m > k; m--) {
      if (lineOfSight(g, anchor, cells[m])) {
        far = m;
        break;
      }
    }
    path.push(cells[far]);
    anchor = cells[far];
    k = far + 1;
  }
  return path;
}
