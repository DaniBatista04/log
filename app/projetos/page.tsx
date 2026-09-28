import Link from "next/link";
import { getProjects, plural } from "@/lib/hub";

export const dynamic = "force-dynamic";

export default function Projetos() {
  const projects = getProjects();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Projetos</h1>
        <p className="mt-1 text-sm text-ink-2">
          Cada área do WEEKLY-LOG vira um projeto; o Mural vem do CHANGELOG.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projetos/${project.slug}`}
            className="flex flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-ink-3"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-semibold">{project.name}</h2>
              <span className="text-xs text-ink-3">
                {plural(project.items.length, "demanda", "demandas")}
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-3">
              {project.firstWeek === project.lastWeek
                ? project.lastWeek
                : `${project.firstWeek} → ${project.lastWeek}`}
            </p>
            <div className="mt-5 flex gap-4 text-xs text-ink-2">
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="size-2 rounded-full bg-emerald-500" />
                {plural(project.delivered, "entregue", "entregues")}
              </span>
              {project.inProgress > 0 && (
                <span className="flex items-center gap-1.5">
                  <span aria-hidden className="size-2 rounded-full bg-amber-500" />
                  {project.inProgress} em andamento
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
