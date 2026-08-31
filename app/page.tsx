import Link from "next/link";
import { AudienceBadge, CategoryLabel } from "@/components/badge";
import { WeekSwitcher } from "@/components/week-switcher";
import { getChangelog, getTaskLog, groupByCategory, weekOptions } from "@/lib/log";

export const dynamic = "force-dynamic";

const FILTERS = [
  { key: "todos", label: "Todos" },
  { key: "cliente", label: "Cliente vê" },
  { key: "interno", label: "Interno" },
] as const;

export default async function Painel({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const weeks = getChangelog();
  const taskWeeks = getTaskLog();

  if (weeks.length === 0) {
    return (
      <p className="text-ink-2">
        Não achei o <code className="font-mono">CHANGELOG.md</code> na raiz do
        repo. Rode o app de dentro de <code className="font-mono">web/</code> ou
        aponte <code className="font-mono">LOG_DIR</code> para a pasta do log.
      </p>
    );
  }

  const filter =
    typeof params.publico === "string" &&
    FILTERS.some((f) => f.key === params.publico)
      ? params.publico
      : "todos";

  const wanted = typeof params.semana === "string" ? params.semana : null;
  const week = weeks.find((w) => w.id === wanted) ?? weeks[0];
  const tasks = taskWeeks.find((t) => t.id === week.id) ?? null;
  const isCurrent = week.id === weeks[0].id;

  const clientCount = week.entries.filter(
    (e) => e.audience === "cliente",
  ).length;
  const pendingTasks =
    tasks?.tasks.filter((t) => !t.placeholder).length ?? 0;

  const visible =
    filter === "todos"
      ? week.entries
      : week.entries.filter((e) => e.audience === filter);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">{week.id}</h1>
            {isCurrent && (
              <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-ink-2">
                mais recente
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-ink-2">{week.range}</p>
        </div>
        <WeekSwitcher
          currentId={week.id}
          options={weekOptions(
            weeks,
            (id) =>
              `/?semana=${encodeURIComponent(id)}${
                filter === "todos" ? "" : `&publico=${filter}`
              }`,
          )}
        />
      </div>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={week.entries.length} label="Mudanças no Mural" />
        <Stat value={clientCount} label="O cliente percebe" accent="cliente" />
        <Stat
          value={week.entries.length - clientCount}
          label="Interno / técnico"
          accent="interno"
        />
        <Stat value={pendingTasks} label="Demandas fora do Mural" />
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-medium">Mural</h2>
          <div className="flex gap-1 rounded-lg bg-surface-2 p-1 text-xs">
            {FILTERS.map((f) => (
              <Link
                key={f.key}
                href={`/?semana=${encodeURIComponent(week.id)}&publico=${f.key}`}
                className={`rounded-md px-2.5 py-1 transition-colors ${
                  filter === f.key
                    ? "bg-surface font-medium text-ink shadow-sm"
                    : "text-ink-2 hover:text-ink"
                }`}
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="text-sm text-ink-2">Nada nesse filtro essa semana.</p>
        ) : (
          <div className="space-y-8">
            {groupByCategory(visible).map(([category, entries]) => (
              <div key={category}>
                <CategoryLabel category={category} />
                <ul className="space-y-2">
                  {entries.map((entry) => (
                    <li
                      key={entry.title}
                      className="rounded-xl border border-line bg-surface p-4"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{entry.title}</span>
                        <AudienceBadge audience={entry.audience} />
                      </div>
                      {entry.impact && (
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                          {entry.impact}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {tasks && (
        <section>
          <h2 className="mb-5 text-lg font-medium">Fora do Mural</h2>
          <ul className="space-y-2">
            {tasks.tasks.map((task) => (
              <li
                key={task.text}
                className="rounded-xl border border-line bg-surface px-4 py-3 text-sm"
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  {task.area && (
                    <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-ink-2">
                      {task.area}
                    </span>
                  )}
                  {!task.placeholder && (
                    <span className="text-xs text-ink-3">
                      {task.status === "entregue" ? "Entregue" : "Em andamento"}
                    </span>
                  )}
                  <span
                    className={
                      task.placeholder ? "text-ink-3" : "leading-relaxed"
                    }
                  >
                    {task.text}
                  </span>
                </div>
                {task.note && (
                  <p className="mt-2 border-l-2 border-line pl-2.5 text-xs leading-relaxed text-ink-3">
                    Falta escrever: {task.note}
                  </p>
                )}
              </li>
            ))}
          </ul>

          {tasks.sections.map((section) => (
            <div key={section.title} className="mt-6">
              <CategoryLabel category={section.title} />
              <ul className="space-y-1.5 text-sm">
                {section.items.map((item) => (
                  <li
                    key={item.text}
                    className={item.placeholder ? "text-ink-3" : "text-ink-2"}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

function Stat({
  value,
  label,
  accent,
}: {
  value: number;
  label: string;
  accent?: "cliente" | "interno";
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-center gap-2">
        {accent && (
          <span
            aria-hidden
            className={`size-2 rounded-full ${
              accent === "cliente" ? "bg-cliente" : "bg-interno"
            }`}
          />
        )}
        <span className="text-3xl font-semibold tabular-nums tracking-tight">
          {value}
        </span>
      </div>
      <p className="mt-1 text-xs leading-snug text-ink-2">{label}</p>
    </div>
  );
}
