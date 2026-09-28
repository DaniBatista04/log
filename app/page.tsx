import { FilterChip } from "@/components/filter-chip";
import { Kanban } from "@/components/kanban";
import { NewDemand } from "@/components/new-demand";
import { Stat } from "@/components/stat";
import { WeekSwitcher } from "@/components/week-switcher";
import { countBy, getProjects, getWeeks, MURAL, projectName } from "@/lib/hub";
import { weekOptions } from "@/lib/log";

export const dynamic = "force-dynamic";

export default async function Demandas({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const weeks = getWeeks();

  if (weeks.length === 0) {
    return (
      <p className="text-ink-2">
        Não achei o <code className="font-mono">WEEKLY-LOG.md</code> nem o{" "}
        <code className="font-mono">CHANGELOG.md</code>. Aponte{" "}
        <code className="font-mono">LOG_DIR</code> para a pasta do log.
      </p>
    );
  }

  const wanted = typeof params.semana === "string" ? params.semana : null;
  const week = weeks.find((w) => w.id === wanted) ?? weeks[0];
  const isCurrent = week.id === weeks[0].id;

  const counts = countBy(week.items, (item) => item.project);
  const weekProjects = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const projeto =
    typeof params.projeto === "string" && counts.has(params.projeto)
      ? params.projeto
      : null;
  const visible = projeto
    ? week.items.filter((item) => item.project === projeto)
    : week.items;

  const delivered = week.items.filter((i) => i.status === "entregue").length;
  const names = Object.fromEntries(
    weekProjects.map(([slug]) => [slug, projectName(slug)]),
  );
  const areas = getProjects(weeks)
    .map((project) => project.slug)
    .filter((slug) => slug !== MURAL && slug !== "outros");

  const href = (semana: string, proj: string | null) => {
    const query = new URLSearchParams();
    if (semana !== weeks[0].id) query.set("semana", semana);
    if (proj) query.set("projeto", proj);
    const qs = query.toString();
    return qs ? `/?${qs}` : "/";
  };

  return (
    <div className="flex flex-col gap-8">
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
          options={weekOptions(weeks, (id) => href(id, null))}
        />
      </div>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={week.items.length} label="Demandas na semana" />
        <Stat value={delivered} label="Entregues" />
        <Stat value={week.items.length - delivered} label="Em andamento" />
        <Stat value={weekProjects.length} label="Projetos com movimento" />
      </section>

      <NewDemand areas={areas} />

      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <FilterChip href={href(week.id, null)} active={!projeto}>
            Todos <span className="text-ink-3">{week.items.length}</span>
          </FilterChip>
          {weekProjects.map(([slug, count]) => (
            <FilterChip
              key={slug}
              href={href(week.id, slug)}
              active={projeto === slug}
            >
              {names[slug]} <span className="text-ink-3">{count}</span>
            </FilterChip>
          ))}
        </div>
        <Kanban items={visible} projectNames={projeto ? undefined : names} />
      </section>

      {week.pending.length > 0 && (
        <section className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="text-sm font-semibold">
            Pendências que atravessam a semana
          </h2>
          <ul className="mt-3 flex flex-col gap-2 text-sm leading-6 text-ink-2">
            {week.pending.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="text-ink-3">
                  ○
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
