import Link from "next/link";
import { notFound } from "next/navigation";
import { FilterChip } from "@/components/filter-chip";
import { Kanban } from "@/components/kanban";
import { Stat } from "@/components/stat";
import { countBy, getProjects } from "@/lib/hub";

export const dynamic = "force-dynamic";

export default async function Projeto({
  params,
  searchParams,
}: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const query = await searchParams;
  const project = getProjects().find((item) => item.slug === slug);
  if (!project) notFound();

  const weeks = [...countBy(project.items, (item) => item.weekId).entries()];
  const semana =
    typeof query.semana === "string" && weeks.some(([id]) => id === query.semana)
      ? query.semana
      : null;
  const visible = semana
    ? project.items.filter((item) => item.weekId === semana)
    : project.items;
  const pendingNotes = project.items.filter((item) => item.note).length;

  const href = (id: string | null) =>
    id ? `/projetos/${slug}?semana=${encodeURIComponent(id)}` : `/projetos/${slug}`;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/projetos" className="text-xs text-ink-3 hover:text-ink">
          ← Projetos
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          {project.name}
        </h1>
        <p className="mt-1 text-sm text-ink-2">
          {project.firstWeek === project.lastWeek
            ? project.lastWeek
            : `De ${project.firstWeek} a ${project.lastWeek}`}
        </p>
      </div>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={project.items.length} label="Demandas" />
        <Stat value={project.delivered} label="Entregues" />
        <Stat value={project.inProgress} label="Em andamento" />
        <Stat
          value={pendingNotes}
          label="Sem impacto escrito"
          hint="não entram no email"
        />
      </section>

      <section className="flex flex-col gap-4">
        {weeks.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <FilterChip href={href(null)} active={!semana}>
              Todas <span className="text-ink-3">{project.items.length}</span>
            </FilterChip>
            {weeks.map(([id, count]) => (
              <FilterChip key={id} href={href(id)} active={semana === id}>
                {id} <span className="text-ink-3">{count}</span>
              </FilterChip>
            ))}
          </div>
        )}
        <Kanban items={visible} showWeek={!semana} />
      </section>
    </div>
  );
}
