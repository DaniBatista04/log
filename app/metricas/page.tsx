import { Stat } from "@/components/stat";
import { getProjects, getWeeks } from "@/lib/hub";
import { shortRange } from "@/lib/log";

export const dynamic = "force-dynamic";

/** Acima disso a lista de projetos junta o resto em "Outros". */
const TOP_PROJECTS = 7;

export default function Metricas() {
  const weeks = getWeeks();
  const projects = getProjects(weeks);
  const items = weeks.flatMap((week) => week.items);

  const delivered = items.filter((item) => item.status === "entregue").length;
  const missingImpact = items.filter((item) => item.note).length;
  const current = weeks[0];
  const activeNow = new Set(current?.items.map((item) => item.project)).size;

  const perWeek = [...weeks].reverse().map((week) => {
    const done = week.items.filter((item) => item.status === "entregue").length;
    return {
      id: week.id,
      label: shortRange(week.range),
      done,
      doing: week.items.length - done,
      total: week.items.length,
    };
  });
  const maxWeek = Math.max(1, ...perWeek.map((week) => week.total));

  const top = projects.slice(0, TOP_PROJECTS).map((project) => ({
    name: project.name,
    count: project.items.length,
  }));
  const rest = projects
    .slice(TOP_PROJECTS)
    .reduce((sum, project) => sum + project.items.length, 0);
  if (rest > 0) top.push({ name: "Outros", count: rest });
  const maxProject = Math.max(1, ...top.map((project) => project.count));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Métricas</h1>
        <p className="mt-1 text-sm text-ink-2">
          Contado direto do WEEKLY-LOG e do CHANGELOG, de{" "}
          {weeks.at(-1)?.id} a {current?.id}.
        </p>
      </div>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={delivered} label="Entregas registradas" />
        <Stat value={weeks.length} label="Semanas registradas" />
        <Stat
          value={activeNow}
          label="Projetos com movimento"
          hint={current ? `na ${current.id}` : undefined}
        />
        <Stat
          value={missingImpact}
          label="Sem impacto escrito"
          hint="não entram no email"
        />
      </section>

      <section className="rounded-2xl border border-line bg-surface p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-semibold">Demandas por semana</h2>
          <div className="flex gap-4 text-xs text-ink-2">
            <Legend dot="bg-emerald-500" label="Entregue" />
            <Legend dot="bg-amber-500" label="Em andamento" />
          </div>
        </div>

        <div className="mt-6 flex h-56 items-end gap-2 border-b border-line sm:gap-4">
          {perWeek.map((week) => (
            <div
              key={week.id}
              tabIndex={0}
              className="group relative flex h-full min-w-0 flex-1 flex-col justify-end outline-none"
            >
              <span className="mb-1 text-center text-xs font-medium tabular-nums text-ink-2">
                {week.total}
              </span>
              <div
                className="mx-auto flex w-full max-w-12 flex-col gap-0.5"
                style={{ height: `${(week.total / maxWeek) * 85}%` }}
              >
                {week.doing > 0 && (
                  <div
                    className="rounded-t bg-amber-500"
                    style={{ flexGrow: week.doing }}
                  />
                )}
                <div
                  className={`bg-emerald-500 ${week.doing > 0 ? "" : "rounded-t"}`}
                  style={{ flexGrow: week.done }}
                />
              </div>
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden w-max -translate-x-1/2 rounded-lg border border-line bg-surface px-3 py-2 text-xs shadow-lg group-hover:block group-focus:block">
                <p className="font-medium">
                  {week.id} · {week.label}
                </p>
                <p className="mt-1 text-ink-2">{week.done} entregues</p>
                <p className="text-ink-2">{week.doing} em andamento</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2 sm:gap-4">
          {perWeek.map((week) => (
            <span
              key={week.id}
              className="min-w-0 flex-1 truncate text-center text-[11px] text-ink-3"
            >
              {week.id.replace(/^Semana\s*/i, "S")}
            </span>
          ))}
        </div>

        <details className="mt-5 text-sm">
          <summary className="cursor-pointer text-xs text-ink-3 hover:text-ink">
            Ver em tabela
          </summary>
          <table className="mt-3 w-full text-left text-xs">
            <thead className="text-ink-3">
              <tr>
                <th className="py-1 font-medium">Semana</th>
                <th className="py-1 text-right font-medium">Entregues</th>
                <th className="py-1 text-right font-medium">Em andamento</th>
                <th className="py-1 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="tabular-nums text-ink-2">
              {perWeek.map((week) => (
                <tr key={week.id} className="border-t border-line">
                  <td className="py-1.5">
                    {week.id} <span className="text-ink-3">{week.label}</span>
                  </td>
                  <td className="py-1.5 text-right">{week.done}</td>
                  <td className="py-1.5 text-right">{week.doing}</td>
                  <td className="py-1.5 text-right">{week.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-5">
        <h2 className="font-semibold">Demandas por projeto</h2>
        <p className="mt-1 text-xs text-ink-3">Todas as semanas somadas.</p>
        <div className="mt-5 flex flex-col gap-3">
          {top.map((project) => (
            <div key={project.name} className="flex items-center gap-3 text-sm">
              <span className="w-24 shrink-0 truncate text-ink-2">
                {project.name}
              </span>
              <div className="h-2.5 min-w-0 flex-1">
                <div
                  className="h-full rounded-r bg-interno"
                  style={{ width: `${(project.count / maxProject) * 100}%` }}
                />
              </div>
              <span className="w-20 shrink-0 text-right text-xs tabular-nums text-ink-2">
                {project.count}{" "}
                <span className="text-ink-3">
                  ({Math.round((project.count / items.length) * 100)}%)
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span aria-hidden className={`size-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
