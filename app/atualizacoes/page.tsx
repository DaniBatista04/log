import { getChangelog, groupByCategory } from "@/lib/log";

export const dynamic = "force-dynamic";

export default function Atualizacoes() {
  const weeks = getChangelog()
    .map((week) => ({
      ...week,
      entries: week.entries.filter((entry) => entry.audience === "cliente"),
    }))
    .filter((week) => week.entries.length > 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Aba Atualizações
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-2">
          Prévia do que o cliente vê dentro do Mural: só os itens marcados como
          🟢. É este conteúdo que o modal de &quot;novidades&quot; deve mostrar
          quando a versão vista pelo usuário estiver atrás da atual.
        </p>
      </div>

      {/* Moldura simulando o painel dentro do Mural */}
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
        <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-5 py-3">
          <span aria-hidden className="size-2 rounded-full bg-cliente" />
          <span className="text-sm font-medium">Novidades no Mural</span>
        </div>

        <div className="divide-y divide-line">
          {weeks.map((week) => (
            <section key={week.id} className="px-5 py-6">
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
          ))}

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
