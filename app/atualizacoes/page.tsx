import { groupByCategory, type Entry, getChangelog } from "@/lib/log";

export const dynamic = "force-dynamic";

/** Quantas semanas ficam abertas; o resto vai para o "ver anteriores". */
const VISIVEIS = 3;

type Week = { id: string; range: string; entries: Entry[] };

export default function Atualizacoes() {
  const weeks: Week[] = getChangelog()
    .map((week) => ({
      ...week,
      entries: week.entries.filter((entry) => entry.audience === "cliente"),
    }))
    .filter((week) => week.entries.length > 0);

  const recentes = weeks.slice(0, VISIVEIS);
  const anteriores = weeks.slice(VISIVEIS);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Aba Atualizações
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-2">
          Prévia do que o cliente vê dentro do Mural: só os itens marcados como
          🟢, da semana mais recente para a mais antiga. É este conteúdo que o
          modal de &quot;novidades&quot; deve mostrar quando a versão vista pelo
          usuário estiver atrás da atual.
        </p>
      </div>

      {/* Moldura simulando o painel dentro do Mural */}
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
        <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-5 py-3">
          <span aria-hidden className="size-2 rounded-full bg-cliente" />
          <span className="text-sm font-medium">Novidades no Mural</span>
        </div>

        <div className="divide-y divide-line">
          {recentes.map((week) => (
            <WeekBlock key={week.id} week={week} />
          ))}

          {anteriores.length > 0 && (
            <details className="group">
              <summary className="cursor-pointer list-none px-5 py-4 text-sm text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink">
                <span className="inline-flex items-center gap-2">
                  <span
                    aria-hidden
                    className="text-ink-3 transition-transform group-open:rotate-90"
                  >
                    ›
                  </span>
                  Semanas anteriores ({anteriores.length})
                </span>
              </summary>
              <div className="divide-y divide-line border-t border-line">
                {anteriores.map((week) => (
                  <WeekBlock key={week.id} week={week} />
                ))}
              </div>
            </details>
          )}

          {weeks.length === 0 && (
            <p className="px-5 py-6 text-sm text-ink-2">
              Nenhum item marcado como 🟢 ainda.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function WeekBlock({ week }: { week: Week }) {
  return (
    <section className="px-5 py-6">
      <p className="text-xs font-medium uppercase tracking-wider text-ink-3">
        {week.range}
      </p>

      <div className="mt-4 space-y-5">
        {groupByCategory(week.entries).map(([category, entries]) => (
          <div key={category}>
            <h2 className="text-sm font-medium">{category}</h2>
            <ul className="mt-2 space-y-2">
              {entries.map((entry) => (
                <li key={entry.title} className="flex gap-2.5 text-sm">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-cliente"
                  />
                  <span className="leading-relaxed">
                    <span className="font-medium">{entry.title}</span>
                    {entry.impact && (
                      <span className="text-ink-2"> — {entry.impact}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
