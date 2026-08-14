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
  placeholder: boolean;
};

export type TaskSection = {
  title: string;
  items: Task[];
};

export type TaskWeek = {
  id: string;
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

function weekNumber(id: string): number | null {
  const m = id.match(/(\d+)/);
  return m ? Number(m[1]) : null;
}

export function getChangelog(): ChangelogWeek[] {
  const raw = read("CHANGELOG.md");
  if (!raw) return [];

  const weeks: ChangelogWeek[] = [];
  let week: ChangelogWeek | null = null;
  let category = "Geral";

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();

    const weekMatch = trimmed.match(WEEK_RE);
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

    const categoryMatch = trimmed.match(CATEGORY_RE);
    if (categoryMatch) {
      category = categoryMatch[1].trim();
      continue;
    }

    const entryMatch = trimmed.match(ENTRY_RE);
    if (entryMatch) {
      week.entries.push({
        audience: entryMatch[1] === "🟢" ? "cliente" : "interno",
        category,
        title: entryMatch[2].trim(),
        impact: (entryMatch[3] ?? "").trim(),
      });
    }
  }

  return weeks;
}

export function getTaskLog(): TaskWeek[] {
  const raw = read("WEEKLY-LOG.md");
  if (!raw) return [];

  const weeks: TaskWeek[] = [];
  let week: TaskWeek | null = null;
  let section: TaskSection | null = null;

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();

    const weekMatch = trimmed.match(WEEK_RE);
    if (weekMatch) {
      week = {
        id: weekMatch[1].trim(),
        range: weekMatch[2].trim(),
        tasks: [],
        sections: [],
      };
      section = null;
      weeks.push(week);
      continue;
    }

    if (!week) continue;

    const subsectionMatch = trimmed.match(SUBSECTION_RE);
    if (subsectionMatch) {
      section = { title: subsectionMatch[1].trim(), items: [] };
      week.sections.push(section);
      continue;
    }

    const taskMatch = trimmed.match(TASK_RE);
    if (taskMatch && (trimmed.startsWith("- ") || trimmed.startsWith("* "))) {
      const text = taskMatch[3].trim();
      const task: Task = {
        area: taskMatch[1]?.trim() ?? null,
        status: taskMatch[2] === "⏳" ? "andamento" : "entregue",
        text,
        placeholder: /^\(.*\)$/.test(text),
      };
      if (section) section.items.push(task);
      else week.tasks.push(task);
    }
  }

  return weeks;
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
