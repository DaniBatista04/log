import { CopyButton } from "@/components/copy-button";
import { WeekSwitcher } from "@/components/week-switcher";
import {
  getChangelog,
  getTaskLog,
  isReady,
  sortByCategory,
  weekOptions,
} from "@/lib/log";

export const dynamic = "force-dynamic";

const CHECKLIST = [
  "Toda linha responde “o que melhorou para alguém?”, não “o que eu mexi?”",
  "Nenhuma palavra que só quem é de TI entende — webhook, endpoint, deploy, API, front, indexação, ambiente",
  "Cada item se entende de primeira, sem precisar reler",
  "Onde outra pessoa ajudou, o crédito está dividido",
  "No máximo ~8 linhas de conteúdo",
  "Fechou com abertura para feedback",
];

const MAX_LINHAS = 8;

function line(title: string, impact: string) {
  return impact ? `- ${title} — ${impact}` : `- ${title}`;
}

export default async function Email({ searchParams }: PageProps<"/email">) {
  const params = await searchParams;
  const weeks = getChangelog();

  if (weeks.length === 0) {
    return <p className="text-ink-2">Sem semanas registradas no changelog.</p>;
  }

  const wanted = typeof params.semana === "string" ? params.semana : null;
  const week = weeks.find((w) => w.id === wanted) ?? weeks[0];
  const tasks = getTaskLog().find((t) => t.id === week.id)?.tasks ?? [];

  const cliente = sortByCategory(
    week.entries.filter((e) => e.audience === "cliente"),
  );
  const interno = sortByCategory(
    week.entries.filter((e) => e.audience === "interno"),
  );
  const prontas = tasks.filter(isReady);
  const feitas = prontas.filter((t) => t.status === "entregue");
  const andamento = prontas.filter((t) => t.status === "andamento");
  /** Ficaram de fora do rascunho porque ainda falta escrever o impacto. */
  const incompletas = tasks.filter((t) => !t.placeholder && t.note !== null);

  const blocks: string[] = [
    `Assunto: Mural — o que mudou na semana (${week.range})`,
    "",
    "Oi pessoal,",
    "",
    "Resumo rápido do que saiu no Mural essa semana:",
  ];

  if (cliente.length) {
    blocks.push(
      "",
      "Para quem usa o Mural no dia a dia",
      ...cliente.map((e) => line(e.title, e.impact)),
    );
  }
  if (interno.length) {
    blocks.push(
      "",
      "Para o suporte / operação",
      ...interno.map((e) => line(e.title, e.impact)),
    );
  }
  if (feitas.length) {
    blocks.push("", "Fora do Mural", ...feitas.map((t) => `- ${t.text}`));
  }
  if (andamento.length) {
    blocks.push(
      "",
      "Em andamento para a próxima semana",
      ...andamento.map((t) => `- ${t.text}`),
    );
  }

  blocks.push(
    "",
    "Qualquer coisa que estiver incomodando no Mural, pode mandar pra mim que eu coloco na fila.",
    "",
    "Abraço,",
    "Daniel",
  );

  const draft = blocks.join("\n");
  const linhas =
    cliente.length + interno.length + feitas.length + andamento.length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Email da semana
          </h1>
          <p className="mt-1 text-sm text-ink-2">
            Rascunho gerado a partir de {week.id} ({week.range}) — revise o tom
            antes de enviar.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <WeekSwitcher
            currentId={week.id}
            options={weekOptions(
              weeks,
              (id) => `/email?semana=${encodeURIComponent(id)}`,
            )}
          />
          <CopyButton text={draft} />
        </div>
      </div>

      {incompletas.length > 0 && (
        <section className="rounded-xl border border-line bg-surface-2 p-4">
          <h2 className="text-sm font-medium">
            {incompletas.length === 1
              ? "1 demanda ficou fora do rascunho"
              : `${incompletas.length} demandas ficaram fora do rascunho`}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-ink-2">
            Falta escrever o impacto no{" "}
            <code className="font-mono">WEEKLY-LOG.md</code>. Enquanto a nota
            estiver lá, o item não entra no email.
          </p>
          <ul className="mt-3 space-y-2.5">
            {incompletas.map((task) => (
              <li key={task.text} className="flex gap-2 text-sm">
                {task.area && (
                  <span className="mt-0.5 shrink-0 rounded bg-surface px-1.5 py-0.5 font-mono text-xs text-ink-2">
                    {task.area}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="leading-relaxed">{task.text}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-ink-3">
                    {task.note}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div>
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl border border-line bg-surface p-6 font-sans text-sm leading-relaxed">
          {draft}
        </pre>
        <p className="mt-2 text-xs text-ink-3">
          {linhas} {linhas === 1 ? "linha" : "linhas"} de conteúdo
          {linhas > MAX_LINHAS
            ? ` — acima das ~${MAX_LINHAS} do checklist, corte o que não teve impacto visível.`
            : "."}
        </p>
      </div>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-3">
          Antes de enviar
        </h2>
        <ul className="space-y-1.5 text-sm text-ink-2">
          {CHECKLIST.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden className="text-ink-3">
                ·
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
