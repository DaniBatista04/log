import fs from "node:fs";
import path from "node:path";

/**
 * O front não tem banco: ele lê os markdowns da raiz do repo, que é também a
 * raiz do projeto Next. Os arquivos continuam sendo a fonte única — editar o
 * .md atualiza a tela.
 */
const LOG_DIR = process.env.LOG_DIR
  ? path.resolve(process.env.LOG_DIR)
  : process.cwd();

export type Audience = "cliente" | "interno";

export type Entry = {
  audience: Audience;
  category: string;
  title: string;
  impact: string;
};

export type ChangelogWeek = {
  id: string;
  number: number | null;
  range: string;
  entries: Entry[];
};

export type TaskStatus = "entregue" | "andamento";

export type Task = {
  area: string | null;
  status: TaskStatus;
  text: string;
  /**
   * Nota editorial no formato `*(falta … )*`: o que ainda precisa ser escrito
   * antes do email sair. Fica fora do texto para não vazar no rascunho.
   */
  note: string | null;
  placeholder: boolean;
};

export type TaskSection = {
  title: string;
  items: Task[];
};

export type TaskWeek = {
  id: string;
  number: number | null;
  range: string;
  tasks: Task[];
  sections: TaskSection[];
};

export const CATEGORY_ORDER = [
  "Adicionado",
  "Melhorado",
  "Corrigido",
  "Performance",
  "Interno",
];

function read(file: string): string | null {
  try {
    return fs.readFileSync(path.join(LOG_DIR, file), "utf8");
  } catch {
    return null;
  }
}

/** `## [Semana 33] — 10 a 14 de agosto de 2026` e também sem colchetes. */
const WEEK_RE = /^##\s+\[?([^\]\n—-]+?)\]?\s*[—–-]\s*(.+)$/;
const CATEGORY_RE = /^###\s+(.+)$/;
/** `- 🟢 **Título** — impacto` */
const ENTRY_RE = /^[-*]\s*(🟢|⚙️)?\s*\*\*(.+?)\*\*\s*(?:[—–-]\s*(.*))?$/u;
/** `- [n8n] ⏳ texto` — área e status são opcionais; sem marcador, a task conta como entregue. */
const TASK_RE = /^[-*]\s*(?:\[([^\]]+)\]\s*)?(✅|⏳)?\s*(.+)$/u;
/** `**Pendências que atravessam pra semana 34:**` */
const SUBSECTION_RE = /^\*\*(.+?):?\*\*$/;
const BULLET_RE = /^[-*]\s/;
/** `*(falta dizer o que isso destravou — completar antes do email.)*` */
const NOTE_RE = /\*\(([\s\S]+?)\)\*/;

/**
 * Junta as linhas de continuação de um item de lista no próprio item. Os dois
 * markdowns são escritos com as linhas quebradas em ~100 colunas, e sem isso o
 * texto de cada task chegava cortado na metade da frase.
 */
function logicalLines(raw: string): string[] {
  const lines: string[] = [];
  let insideBullet = false;

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    const indented = /^\s+\S/.test(line);
    const continuation =
      insideBullet &&
      indented &&
      !BULLET_RE.test(trimmed) &&
      !trimmed.startsWith("#");

    if (continuation) {
      lines[lines.length - 1] += ` ${trimmed}`;
      continue;
    }

    lines.push(trimmed);
    insideBullet = BULLET_RE.test(trimmed);
  }

  return lines;
}

function weekNumber(id: string): number | null {
  const m = id.match(/(\d+)/);
  return m ? Number(m[1]) : null;
}

/**
 * Semana mais recente primeiro: é o que as três telas querem por padrão. Onde
 * não há número na sigla da semana, a ordem do arquivo vale como cronologia.
 */
function newestFirst<T extends { number: number | null }>(weeks: T[]): T[] {
  return weeks
    .map((week, index) => ({ week, index }))
    .sort((a, b) => {
      const an = a.week.number;
      const bn = b.week.number;
      if (an !== null && bn !== null && an !== bn) return bn - an;
      return b.index - a.index;
    })
    .map(({ week }) => week);
}

export function getChangelog(): ChangelogWeek[] {
  const raw = read("CHANGELOG.md");
  if (!raw) return [];

  const weeks: ChangelogWeek[] = [];
  let week: ChangelogWeek | null = null;
  let category = "Geral";

  for (const line of logicalLines(raw)) {
    const weekMatch = line.match(WEEK_RE);
    if (weekMatch) {
      week = {
        id: weekMatch[1].trim(),
        number: weekNumber(weekMatch[1]),
        range: weekMatch[2].trim(),
        entries: [],
      };
      category = "Geral";
      weeks.push(week);
      continue;
    }

    if (!week) continue;

    const categoryMatch = line.match(CATEGORY_RE);
    if (categoryMatch) {
      category = categoryMatch[1].trim();
      continue;
    }

    const entryMatch = line.match(ENTRY_RE);
    if (entryMatch) {
      week.entries.push({
        audience: entryMatch[1] === "🟢" ? "cliente" : "interno",
        category,
        title: entryMatch[2].trim(),
        impact: (entryMatch[3] ?? "").trim(),
      });
    }
  }

  return newestFirst(weeks);
}

function parseTask(match: RegExpMatchArray): Task {
  const rawText = match[3].trim();
  const noteMatch = rawText.match(NOTE_RE);
  const text = rawText.replace(NOTE_RE, "").replace(/\s+/g, " ").trim();

  return {
    area: match[1]?.trim() ?? null,
    status: match[2] === "⏳" ? "andamento" : "entregue",
    text,
    note: noteMatch ? noteMatch[1].replace(/\s+/g, " ").trim() : null,
    placeholder: text === "" || /^\(.*\)$/.test(text),
  };
}

export function getTaskLog(): TaskWeek[] {
  const raw = read("WEEKLY-LOG.md");
  if (!raw) return [];

  const weeks: TaskWeek[] = [];
  let week: TaskWeek | null = null;
  let section: TaskSection | null = null;

  for (const line of logicalLines(raw)) {
    const weekMatch = line.match(WEEK_RE);
    if (weekMatch) {
      week = {
        id: weekMatch[1].trim(),
        number: weekNumber(weekMatch[1]),
        range: weekMatch[2].trim(),
        tasks: [],
        sections: [],
      };
      section = null;
      weeks.push(week);
      continue;
    }

    if (!week) continue;

    const subsectionMatch = line.match(SUBSECTION_RE);
    if (subsectionMatch) {
      section = { title: subsectionMatch[1].trim(), items: [] };
      week.sections.push(section);
      continue;
    }

    if (!BULLET_RE.test(line)) continue;

    const taskMatch = line.match(TASK_RE);
    if (taskMatch) {
      const task = parseTask(taskMatch);
      if (section) section.items.push(task);
      else week.tasks.push(task);
    }
  }

  return newestFirst(weeks);
}

/** Task que entra no email: já escrita e sem nota de "falta descrever". */
export function isReady(task: Task): boolean {
  return !task.placeholder && task.note === null;
}

export function sortByCategory(entries: Entry[]): Entry[] {
  return [...entries].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.category);
    const bi = CATEGORY_ORDER.indexOf(b.category);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

export function groupByCategory(entries: Entry[]): [string, Entry[]][] {
  const map = new Map<string, Entry[]>();
  for (const entry of sortByCategory(entries)) {
    const list = map.get(entry.category) ?? [];
    list.push(entry);
    map.set(entry.category, list);
  }
  return [...map.entries()];
}

/** `24 a 28 de agosto de 2026` → `{ day: "24–28", month: "ago", year: "2026" }` */
const PARSED_RANGE_RE =
  /^(\d{1,2})(?:\s*(?:a|até|[—–-])\s*(\d{1,2}))?\s+de\s+([A-Za-zÀ-ÿ]+)(?:\s+de\s+(\d{4}))?/i;

/** Rótulo curto para o seletor de semana: `24–28 ago`. */
export function shortRange(range: string): string {
  const m = range.match(PARSED_RANGE_RE);
  if (!m) return range;
  const days = m[2] ? `${m[1]}–${m[2]}` : m[1];
  return `${days} ${m[3].slice(0, 3).toLowerCase()}`;
}

/**
 * Cabeçalho de agrupamento do seletor: `Agosto de 2026`. É o que impede a
 * lista de virar um paredão de semanas soltas quando o ano avançar.
 */
export function monthLabel(range: string): string {
  const m = range.match(PARSED_RANGE_RE);
  if (!m) return range;
  const month = m[3].charAt(0).toUpperCase() + m[3].slice(1).toLowerCase();
  return m[4] ? `${month} de ${m[4]}` : month;
}

/**
 * Monta as opções do seletor de semana a partir das semanas já ordenadas.
 * Fica aqui porque as duas telas que têm seletor precisam do mesmo formato.
 */
export function weekOptions(
  weeks: { id: string; range: string }[],
  href: (id: string) => string,
) {
  return weeks.map((week) => ({
    id: week.id,
    range: week.range,
    label: shortRange(week.range),
    group: monthLabel(week.range),
    href: href(week.id),
  }));
}
