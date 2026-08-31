"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type WeekOption = {
  id: string;
  /** `24 a 28 de agosto de 2026` */
  range: string;
  /** `24–28 ago` */
  label: string;
  /** `Agosto de 2026` — cabeçalho de agrupamento na lista. */
  group: string;
  href: string;
};

/**
 * Navegação de semanas que não cresce com o log. Em vez de uma fileira de
 * chips que ganha um item por semana, ficam três controles de tamanho fixo:
 * anterior, seguinte e uma lista suspensa agrupada por mês.
 *
 * As opções chegam da mais recente para a mais antiga, então "anterior" (mais
 * velha) é o índice seguinte no array.
 */
export function WeekSwitcher({
  options,
  currentId,
}: {
  options: WeekOption[];
  currentId: string;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (options.length <= 1) return null;

  const index = options.findIndex((option) => option.id === currentId);
  const current = options[index] ?? options[0];
  const older = options[index + 1] ?? null;
  const newer = index > 0 ? options[index - 1] : null;

  return (
    <div ref={root} className="relative">
      <div className="flex items-stretch divide-x divide-line overflow-hidden rounded-lg border border-line bg-surface">
        <Arrow
          option={older}
          label="Semana anterior"
          glyph="‹"
          onNavigate={() => setOpen(false)}
        />

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className="flex min-w-0 items-center gap-2 px-3 py-1.5 text-xs transition-colors hover:bg-surface-2"
        >
          <span className="font-medium">{current.id}</span>
          <span className="text-ink-3">{current.label}</span>
          <span aria-hidden className="text-ink-3">
            ▾
          </span>
        </button>

        <Arrow
          option={newer}
          label="Semana seguinte"
          glyph="›"
          onNavigate={() => setOpen(false)}
        />
      </div>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-20 mt-2 max-h-80 w-64 overflow-y-auto rounded-xl border border-line bg-surface p-1.5 shadow-lg"
        >
          {options.map((option, position) => {
            const first = position === 0 || options[position - 1].group !== option.group;
            const active = option.id === currentId;

            return (
              <div key={option.id}>
                {first && (
                  <p className="px-2.5 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
                    {option.group}
                  </p>
                )}
                <Link
                  href={option.href}
                  role="option"
                  aria-selected={active}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline justify-between gap-3 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                    active
                      ? "bg-surface-2 font-medium text-ink"
                      : "text-ink-2 hover:bg-surface-2 hover:text-ink"
                  }`}
                >
                  <span className="truncate">{option.id}</span>
                  <span className="shrink-0 text-xs text-ink-3">
                    {position === 0 ? "atual" : option.label}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Arrow({
  option,
  label,
  glyph,
  onNavigate,
}: {
  option: WeekOption | null;
  label: string;
  glyph: string;
  onNavigate: () => void;
}) {
  if (!option) {
    return (
      <span
        aria-hidden
        className="flex w-8 items-center justify-center text-sm text-ink-3 opacity-40"
      >
        {glyph}
      </span>
    );
  }

  return (
    <Link
      href={option.href}
      aria-label={`${label}: ${option.id}`}
      title={`${label} — ${option.id}`}
      onClick={onNavigate}
      className="flex w-8 items-center justify-center text-sm text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
    >
      <span aria-hidden>{glyph}</span>
    </Link>
  );
}
