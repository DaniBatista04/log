import {
  getChangelog,
  getTaskLog,
  type Audience,
  type TaskSection,
  type TaskStatus,
} from "@/lib/log";

/**
 * O hub não tem estado próprio: projetos e demandas saem dos mesmos dois
 * markdowns que já alimentam o email. Cada `[área]` do WEEKLY-LOG vira um
 * projeto, e o CHANGELOG inteiro vira o projeto Mural — tudo que está lá já
 * foi entregue.
 */

export type HubItem = {
  id: string;
  project: string;
  status: TaskStatus;
  title: string;
  detail: string;
  /** `*(falta …)*` — o impacto ainda não foi escrito. */
  note: string | null;
  weekId: string;
  weekNumber: number | null;
  range: string;
  /** Só nos itens do Mural. */
  audience?: Audience;
  category?: string;
};

export type HubWeek = {
  id: string;
  number: number | null;
  range: string;
  items: HubItem[];
  /** Pendências que atravessam para a semana seguinte. */
  pending: string[];
};

export type HubProject = {
  slug: string;
  name: string;
  items: HubItem[];
  delivered: number;
  inProgress: number;
  firstWeek: string;
  lastWeek: string;
};

export const MURAL = "mural";
const NO_AREA = "outros";

const NAMES: Record<string, string> = {
  [MURAL]: "Mural",
  crm: "CRM",
  nfc: "NFC",
  n8n: "n8n",
  whatsapp: "WhatsApp",
  "smb-ooh": "SMB OOH",
  [NO_AREA]: "Sem área",
};

export function projectName(slug: string): string {
  if (NAMES[slug]) return NAMES[slug];
  const words = slug.replace(/[-_]+/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function slugify(area: string | null): string {
  if (!area) return NO_AREA;
  return (
    area
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || NO_AREA
  );
}

const stripBold = (text: string) => text.replace(/\*\*/g, "");

/**
 * Card de kanban precisa de um título curto. Quem escreve já costuma abrir a
 * linha com um negrito (`**O Console veio para o CRM.** A operação…`); sem
 * ele, a primeira frase faz o papel.
 */
function splitTitle(text: string): { title: string; detail: string } {
  const bold = text.match(/^\*\*(.+?)\*\*\s*(.*)$/);
  if (bold) {
    return {
      title: bold[1].replace(/[.:]$/, "").trim(),
      detail: stripBold(bold[2]).trim(),
    };
  }

  const plain = stripBold(text);
  const end = plain.search(/[.:]\s/);
  if (end > 0 && end < 160) {
    const detail = plain.slice(end + 1).trim();
    return {
      title: plain.slice(0, end).trim(),
      detail: detail.charAt(0).toUpperCase() + detail.slice(1),
    };
  }
  return { title: plain, detail: "" };
}

function pendingOf(sections: TaskSection[]): string[] {
  return sections
    .filter((section) => /^pend[eê]ncias/i.test(section.title))
    .flatMap((section) => section.items)
    .filter((item) => !item.placeholder)
    .map((item) => stripBold(item.text));
}

/** Semanas da mais recente para a mais antiga, juntando os dois arquivos. */
export function getWeeks(): HubWeek[] {
  const changelog = getChangelog();
  const log = getTaskLog();
  const weeks = new Map<string, HubWeek>();

  const weekFor = (id: string, number: number | null, range: string) => {
    let week = weeks.get(id);
    if (!week) {
      week = { id, number, range, items: [], pending: [] };
      weeks.set(id, week);
    }
    return week;
  };

  for (const entry of log) {
    const week = weekFor(entry.id, entry.number, entry.range);
    week.pending = pendingOf(entry.sections);
    entry.tasks
      .filter((task) => !task.placeholder)
      .forEach((task, index) => {
        week.items.push({
          id: `${slugify(entry.id)}-log-${index}`,
          project: slugify(task.area),
          status: task.status,
          ...splitTitle(task.text),
          note: task.note,
          weekId: entry.id,
          weekNumber: entry.number,
          range: entry.range,
        });
      });
  }

  for (const entry of changelog) {
    const week = weekFor(entry.id, entry.number, entry.range);
    entry.entries.forEach((item, index) => {
      week.items.push({
        id: `${slugify(entry.id)}-mural-${index}`,
        project: MURAL,
        status: "entregue",
        title: item.title,
        detail: item.impact,
        note: null,
        weekId: entry.id,
        weekNumber: entry.number,
        range: entry.range,
        audience: item.audience,
        category: item.category,
      });
    });
  }

  return [...weeks.values()].sort(
    (a, b) => (b.number ?? 0) - (a.number ?? 0),
  );
}

/** Projetos com mais demandas primeiro; o Mural entra como qualquer outro. */
export function getProjects(weeks: HubWeek[] = getWeeks()): HubProject[] {
  const projects = new Map<string, HubProject>();

  // `weeks` vem da mais recente para a mais antiga.
  for (const week of weeks) {
    for (const item of week.items) {
      let project = projects.get(item.project);
      if (!project) {
        project = {
          slug: item.project,
          name: projectName(item.project),
          items: [],
          delivered: 0,
          inProgress: 0,
          firstWeek: week.id,
          lastWeek: week.id,
        };
        projects.set(item.project, project);
      }
      project.items.push(item);
      project.firstWeek = week.id;
      if (item.status === "entregue") project.delivered += 1;
      else project.inProgress += 1;
    }
  }

  return [...projects.values()].sort(
    (a, b) => b.items.length - a.items.length || a.name.localeCompare(b.name),
  );
}

export function plural(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

export function countBy<T>(items: T[], key: (item: T) => string) {
  const counts = new Map<string, number>();
  for (const item of items) {
    counts.set(key(item), (counts.get(key(item)) ?? 0) + 1);
  }
  return counts;
}
