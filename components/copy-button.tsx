"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium transition-colors hover:bg-surface-2"
    >
      {copied ? "Copiado" : "Copiar email"}
    </button>
  );
}
