"use client";

import {
  CHARACTERS,
  DEFAULT_LOOK,
  GLASSES,
  HATS,
  PART_LABEL,
  PARTS,
  randomLook,
  SWATCHES,
  type Look,
  type Part,
} from "./look";

/**
 * Tela de "criar personagem": modelo, cores por parte e acessórios. Cada
 * clique já vale — o boneco muda na hora e acena com a cabeça.
 */
export function Customizer({
  look,
  onChange,
  onClose,
}: {
  look: Look;
  onChange: (look: Look) => void;
  onClose: () => void;
}) {
  const setColor = (part: Part, color: string | null) =>
    onChange({ ...look, colors: { ...look.colors, [part]: color } });
  const step = (delta: number) =>
    onChange({ ...look, base: (look.base + delta + CHARACTERS.length) % CHARACTERS.length });

  return (
    <aside
      aria-label="Personalizar boneco"
      className="absolute inset-x-3 bottom-3 z-30 max-h-[65%] overflow-y-auto rounded-2xl border border-line bg-surface p-5 shadow-xl sm:inset-x-auto sm:bottom-auto sm:left-4 sm:top-24 sm:max-h-[calc(100%-7rem)] sm:w-80"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">Seu boneco</h2>
        <button
          type="button"
          onClick={() => onChange(randomLook())}
          className="rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <span aria-hidden>🎲</span> Sortear
        </button>
      </div>

      <Section title="Modelo">
        <div className="flex items-stretch divide-x divide-line overflow-hidden rounded-lg border border-line text-sm">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Modelo anterior"
            className="w-10 text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
          >
            ‹
          </button>
          <span className="flex-1 py-1.5 text-center text-ink-2">
            <span className="font-medium text-ink">{look.base + 1}</span>
            <span className="text-ink-3"> de {CHARACTERS.length}</span>
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Próximo modelo"
            className="w-10 text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
          >
            ›
          </button>
        </div>
      </Section>

      {PARTS.map((part) => (
        <Section key={part} title={PART_LABEL[part]}>
          <div role="radiogroup" aria-label={PART_LABEL[part]} className="flex flex-wrap gap-1.5">
            <Swatch
              label={`${PART_LABEL[part]}: original do modelo`}
              selected={look.colors[part] === null}
              onClick={() => setColor(part, null)}
            />
            {SWATCHES[part].map((color, i) => (
              <Swatch
                key={color}
                color={color}
                label={`${PART_LABEL[part]}: opção ${i + 1}`}
                selected={look.colors[part]?.toLowerCase() === color.toLowerCase()}
                onClick={() => setColor(part, color)}
              />
            ))}
          </div>
        </Section>
      ))}

      <Section title="Óculos">
        <Segmented
          label="Óculos"
          options={GLASSES}
          value={look.glasses}
          onChange={(glasses) => onChange({ ...look, glasses })}
        />
      </Section>

      <Section title="Na cabeça">
        <Segmented
          label="Na cabeça"
          options={HATS}
          value={look.hat}
          onChange={(hat) => onChange({ ...look, hat })}
        />
        {look.hat === "bone" && (
          <p className="mt-1.5 text-[11px] text-ink-3">O boné acompanha a cor da roupa.</p>
        )}
      </Section>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={() => onChange(DEFAULT_LOOK)}
          className="rounded-lg border border-line px-3 py-2 text-sm text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
        >
          Voltar ao original
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-lg bg-ink px-3 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Pronto
        </button>
      </div>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h3 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Swatch({
  color,
  label,
  selected,
  onClick,
}: {
  color?: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={label}
      title={color ? undefined : "Original do modelo"}
      onClick={onClick}
      className={`grid size-7 place-items-center rounded-full ring-offset-2 ring-offset-surface transition-shadow ${
        selected ? "ring-2 ring-ink" : "ring-1 ring-line hover:ring-ink-3"
      }`}
      style={color ? { background: color } : undefined}
    >
      {!color && (
        <span aria-hidden className="text-xs text-ink-2">
          ↺
        </span>
      )}
    </button>
  );
}

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex divide-x divide-line overflow-hidden rounded-lg border border-line text-xs"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={option.value === value}
          onClick={() => onChange(option.value)}
          className={`flex-1 px-2 py-1.5 transition-colors ${
            option.value === value
              ? "bg-surface-2 font-medium text-ink"
              : "text-ink-2 hover:bg-surface-2 hover:text-ink"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
