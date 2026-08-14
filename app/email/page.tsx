import { CopyButton } from "@/components/copy-button";
import { getChangelog, getTaskLog, sortByCategory } from "@/lib/log";

export const dynamic = "force-dynamic";

const CHECKLIST = [
  "Toda linha responde “o que melhorou para alguém?”, não “o que eu mexi?”",
  "Nenhuma palavra que só quem é de TI entende — webhook, endpoint, deploy, API, front, indexação, ambiente",
  "Cada item se entende de primeira, sem precisar reler",
  "Onde outra pessoa ajudou, o crédito está dividido",
  "No máximo ~8 linhas de conteúdo",
  "Fechou com abertura para feedback",
];

function line(title: string, impact: string) {
  return impact ? `- ${title} — ${impact}` : `- ${title}`;
}

export default function Email() {
  const week = getChangelog()[0];
  const tasks = week
    ? getTaskLog().find((t) => t.id === week.id)?.tasks ?? []
    : [];

  if (!week) {
    return <p className="text-ink-2">Sem semanas registradas no changelog.</p>;
  }

  const cliente = sortByCategory(
    week.entries.filter((e) => e.audience === "cliente"),
  );
  const interno = sortByCategory(
    week.entries.filter((e) => e.audience === "interno"),
  );
  const feitas = tasks.filter(
    (t) => !t.placeholder && t.status === "entregue",
  );
  const andamento = tasks.filter(
    (t) => !t.placeholder && t.status === "andamento",
  );

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
    blocks.push(
      "",
      "Fora do Mural",
      ...feitas.map((t) => `- ${t.text}`),
    );
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

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Email da semana
          </h1>
          <p className="mt-1 text-sm text-ink-2">
            Rascunho gerado a partir de {week.id} — revise o tom antes de
            enviar.
          </p>
        </div>
        <CopyButton text={draft} />
      </div>

      <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl border border-line bg-surface p-6 font-sans text-sm leading-relaxed">
        {draft}
      </pre>

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
