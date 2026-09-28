import Link from "next/link";
import { AudienceBadge } from "@/components/badge";
import type { HubItem } from "@/lib/hub";
import type { TaskStatus } from "@/lib/log";

const COLUMNS: { status: TaskStatus; label: string; dot: string }[] = [
  { status: "andamento", label: "Em andamento", dot: "bg-amber-500" },
  { status: "entregue", label: "Entregue", dot: "bg-emerald-500" },
];

/**
 * Duas colunas porque o log só tem dois estados: ⏳ e ✅. Mudar uma demanda de
 * coluna é trocar o marcador no WEEKLY-LOG — a tela só reflete o arquivo.
 */
export function Kanban({
  items,
  projectNames,
  showWeek = false,
}: {
  items: HubItem[];
  /** Com nomes, o card mostra e linka o projeto; sem, a tela já é do projeto. */
  projectNames?: Record<string, string>;
  showWeek?: boolean;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {COLUMNS.map((column) => {
        const cards = items.filter((item) => item.status === column.status);
        return (
          <section
            key={column.status}
            className="flex min-h-40 flex-col gap-2 rounded-2xl bg-surface-2 p-3 md:max-h-[80vh] md:overflow-y-auto"
          >
            <div className="flex items-center justify-between px-1 pb-1">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <span aria-hidden className={`size-2 rounded-full ${column.dot}`} />
                {column.label}
              </h3>
              <span className="text-xs text-ink-3">{cards.length}</span>
            </div>
            {cards.map((item) => (
              <Card
                key={item.id}
                item={item}
                projectName={projectNames?.[item.project]}
                showWeek={showWeek}
              />
            ))}
            {cards.length === 0 && (
              <p className="rounded-xl border border-dashed border-line px-3 py-6 text-center text-xs text-ink-3">
                Nada aqui.
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}

function Card({
  item,
  projectName,
  showWeek,
}: {
  item: HubItem;
  projectName?: string;
  showWeek: boolean;
}) {
  return (
    <article className="rounded-xl border border-line bg-surface p-3.5 shadow-sm">
      <p className="text-sm font-medium leading-5">{item.title}</p>
      {item.detail && (
        <p className="mt-1.5 line-clamp-3 text-xs leading-5 text-ink-2">
          {item.detail}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
        {projectName && (
          <Link
            href={`/projetos/${item.project}`}
            className="rounded-full bg-surface-2 px-2 py-0.5 font-medium text-ink-2 hover:text-ink"
          >
            {projectName}
          </Link>
        )}
        {item.audience && <AudienceBadge audience={item.audience} />}
        {item.category && <span className="text-ink-3">{item.category}</span>}
        {showWeek && <span className="text-ink-3">{item.weekId}</span>}
        {item.note && (
          <span
            title={item.note}
            className="rounded-full bg-amber-500/15 px-2 py-0.5 font-medium text-amber-700 dark:text-amber-300"
          >
            Falta o impacto
          </span>
        )}
      </div>
    </article>
  );
}
