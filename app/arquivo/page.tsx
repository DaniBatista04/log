import { Arquivo } from "@/components/arquivo/arquivo";
import { getWeeks, projectName } from "@/lib/hub";
import { weekOptions } from "@/lib/log";

export const dynamic = "force-dynamic";

/**
 * As mesmas demandas da tela inicial, num escritório 3D: cada projeto vira uma
 * estante, cada demanda vira uma pasta e o boneco vai buscar a que você
 * clicar. É só outra forma de ver os dois markdowns — não grava nada.
 */
export default async function ArquivoPage({ searchParams }: PageProps<"/arquivo">) {
  const params = await searchParams;
  const weeks = getWeeks();

  if (weeks.length === 0) {
    return (
      <p className="text-ink-2">
        Não achei o <code className="font-mono">WEEKLY-LOG.md</code> nem o{" "}
        <code className="font-mono">CHANGELOG.md</code>.
      </p>
    );
  }

  const wanted = typeof params.semana === "string" ? params.semana : null;
  const week = weeks.find((w) => w.id === wanted) ?? weeks[0];
  const names = Object.fromEntries(
    week.items.map((item) => [item.project, projectName(item.project)]),
  );
  const href = (id: string) =>
    id === weeks[0].id ? "/arquivo" : `/arquivo?semana=${encodeURIComponent(id)}`;

  return (
    <Arquivo
      key={week.id}
      weekId={week.id}
      range={week.range}
      items={week.items}
      names={names}
      pending={week.pending}
      options={weekOptions(weeks, href)}
    />
  );
}
