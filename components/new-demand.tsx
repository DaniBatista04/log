"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

/**
 * O hub não grava nada: a fonte continua sendo o WEEKLY-LOG.md. Em vez de um
 * formulário que some ao recarregar, este monta a linha já no formato do log
 * para colar no arquivo.
 */
export function NewDemand({ areas }: { areas: string[] }) {
  const [area, setArea] = useState(areas[0] ?? "");
  const [status, setStatus] = useState<"⏳" | "✅">("⏳");
  const [text, setText] = useState("");

  const tag = area.trim() ? `[${area.trim()}] ` : "";
  const line = `- ${tag}${status} ${text.trim() || "o que foi feito — para quem / o que destravou"}`;

  return (
    <details className="group rounded-2xl border border-line bg-surface">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-medium">
        <span>+ Anotar demanda</span>
        <span className="hidden text-xs font-normal text-ink-3 sm:inline sm:group-open:hidden">
          gera a linha para o WEEKLY-LOG.md
        </span>
      </summary>
      <div className="flex flex-col gap-3 border-t border-line px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex flex-col gap-1 text-xs text-ink-2">
            Área
            <input
              list="areas"
              value={area}
              onChange={(event) => setArea(event.target.value)}
              className="w-full rounded-lg border border-line bg-background px-3 py-2 text-sm text-ink outline-none focus:border-ink-2 sm:w-36"
            />
            <datalist id="areas">
              {areas.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
          </label>
          <label className="flex flex-col gap-1 text-xs text-ink-2">
            Status
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as "⏳" | "✅")}
              className="rounded-lg border border-line bg-background px-3 py-2 text-sm text-ink outline-none"
            >
              <option value="⏳">⏳ Em andamento</option>
              <option value="✅">✅ Entregue</option>
            </select>
          </label>
          <label className="flex flex-1 flex-col gap-1 text-xs text-ink-2">
            O que foi feito
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="para quem e o que destravou"
              className="rounded-lg border border-line bg-background px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-3 focus:border-ink-2"
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-surface-2 px-3 py-2">
          <code className="min-w-0 flex-1 break-words font-mono text-xs text-ink-2">
            {line}
          </code>
          <CopyButton text={line} label="Copiar linha" />
        </div>
      </div>
    </details>
  );
}
