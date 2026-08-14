import type { Audience } from "@/lib/log";

/**
 * Público sempre com rótulo escrito, nunca só a cor —
 * quem não distingue verde de azul precisa ler a mesma informação.
 */
export function AudienceBadge({ audience }: { audience: Audience }) {
  const cliente = audience === "cliente";
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
        cliente
          ? "bg-cliente-soft text-cliente"
          : "bg-interno-soft text-interno"
      }`}
    >
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${
          cliente ? "bg-cliente" : "bg-interno"
        }`}
      />
      {cliente ? "Cliente vê" : "Interno"}
    </span>
  );
}

export function CategoryLabel({ category }: { category: string }) {
  return (
    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-3">
      {category}
    </h3>
  );
}
