"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AudienceBadge } from "@/components/badge";
import { WeekSwitcher, type WeekOption } from "@/components/week-switcher";
import type { HubItem } from "@/lib/hub";
import { Customizer } from "./customizer";
import { BOARD_KEY, buildLayout, type Command } from "./layout";
import { readLook, saveLook, serverLook, subscribeLook } from "./look";

// O three.js só existe no navegador; no servidor fica o aviso de carregando.
const Scene = dynamic(() => import("./scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-ink-3">
      Montando o escritório…
    </div>
  ),
});

export function Arquivo({
  weekId,
  range,
  items,
  names,
  pending,
  options,
}: {
  weekId: string;
  range: string;
  items: HubItem[];
  names: Record<string, string>;
  pending: string[];
  options: WeekOption[];
}) {
  const layout = useMemo(() => buildLayout(items, names), [items, names]);
  const byId = useMemo(() => new Map(items.map((item) => [item.id, item])), [items]);
  const missingImpact = useMemo(
    () => Object.fromEntries(items.map((item) => [item.id, Boolean(item.note)])),
    [items],
  );

  const [openKey, setOpenKey] = useState<string | null>(null);
  const [command, setCommand] = useState<Command | null>(null);
  const [top, setTop] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const labels = useRef<HTMLDivElement>(null);
  const look = useSyncExternalStore(subscribeLook, readLook, serverLook);
  const [customizing, setCustomizing] = useState(false);

  const close = useCallback(() => setOpenKey(null), []);
  // Abrir uma pasta tira o painel de personalização do caminho.
  const openPanel = useCallback((key: string) => {
    setCustomizing(false);
    setOpenKey(key);
  }, []);

  // A cena ocupa a tela toda abaixo do menu, que muda de altura quando quebra linha.
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const measure = () => setTop(header.getBoundingClientRect().bottom);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!openKey && !customizing) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenKey(null);
      setCustomizing(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openKey, customizing]);

  const delivered = items.filter((item) => item.status === "entregue").length;
  const open = openKey && openKey !== BOARD_KEY ? byId.get(openKey) : undefined;
  const groups = layout.cabinets.map((cabinet) => ({
    name: cabinet.name,
    items: cabinet.folders.map((folder) => byId.get(folder.id)!),
  }));

  return (
    <div className="fixed inset-x-0 bottom-0 overflow-hidden" style={{ top }}>
      {items.length > 0 ? (
        <Scene
          layout={layout}
          missingImpact={missingImpact}
          pendingCount={pending.length}
          openKey={openKey}
          command={command}
          onOpen={openPanel}
          onClose={close}
          onHover={setHovered}
          labels={labels}
          look={look}
          customizing={customizing}
          reducedMotion={reducedMotion}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-ink-2">
          Nenhuma demanda registrada nesta semana.
        </div>
      )}

      {/* Rótulos presos a pontos da cena; a cena atualiza a posição de cada um. */}
      <div ref={labels} className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {layout.cabinets.map((cabinet) => (
          <div key={cabinet.slug} data-anchor={`cabinet:${cabinet.slug}`} className={LABEL} style={HIDDEN}>
            {cabinet.name}
            <span className="flex items-center gap-1 text-[11px] font-normal text-stone-500">
              {cabinet.open > 0 && (
                <>
                  <span aria-hidden className="size-1.5 rounded-full bg-amber-500" />
                  {cabinet.open}
                </>
              )}
              {cabinet.done > 0 && (
                <>
                  <span aria-hidden className="ml-0.5 size-1.5 rounded-full bg-emerald-600" />
                  {cabinet.done}
                </>
              )}
            </span>
          </div>
        ))}
        {items.length > 0 && (
          <div data-anchor="board" className={LABEL} style={HIDDEN}>
            Pendências <span className="font-normal text-stone-500">{pending.length}</span>
          </div>
        )}
        {hovered && byId.has(hovered) && (
          <div
            data-anchor="tip"
            style={HIDDEN}
            className="absolute left-0 top-0 w-max max-w-56 rounded-lg bg-stone-900/90 px-2.5 py-1.5 text-xs leading-4 text-white shadow-lg"
          >
            {byId.get(hovered)!.title}
          </div>
        )}
      </div>

      {/* HUD */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between gap-3 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <section className="pointer-events-auto rounded-2xl border border-line bg-surface/95 p-4 shadow-sm backdrop-blur">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div>
                <h1 className="text-lg font-semibold tracking-tight">Arquivo</h1>
                <p className="text-xs text-ink-2">
                  {weekId} · {range}
                </p>
              </div>
              <WeekSwitcher currentId={weekId} options={options} />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-2">
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="size-2 rounded-full bg-amber-500" />
                {items.length - delivered} em andamento
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="size-2 rounded-full bg-emerald-600" />
                {delivered} entregues
              </span>
              {items.some((item) => item.note) && (
                <span className="flex items-center gap-1.5">
                  <span aria-hidden className="size-2 rounded-sm bg-[#F4B6A6]" />
                  falta o impacto
                </span>
              )}
            </div>
          </section>

          {items.length > 0 && (
            <label className="pointer-events-auto flex items-center gap-2 rounded-xl border border-line bg-surface/95 px-3 py-2 text-xs shadow-sm backdrop-blur">
              <span className="text-ink-2">Ir até</span>
              <select
                value=""
                onChange={(event) => {
                  const value = event.target.value;
                  if (!value) return;
                  setCommand((c) => ({
                    n: (c?.n ?? 0) + 1,
                    target: value === BOARD_KEY ? { kind: "board" } : { kind: "folder", id: value },
                  }));
                  event.target.blur();
                }}
                className="max-w-56 bg-transparent text-ink outline-none"
              >
                <option value="">uma pasta…</option>
                <option value={BOARD_KEY}>Quadro de pendências</option>
                {groups.map((group) => (
                  <optgroup key={group.name} label={group.name}>
                    {group.items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.status === "entregue" ? "✅" : "⏳"} {item.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
          )}
        </div>

        <div className="flex items-end justify-between gap-3">
          <p className="hidden rounded-lg bg-surface/80 px-3 py-1.5 text-xs text-ink-2 backdrop-blur sm:block">
            WASD ou clique no chão para andar · clique numa pasta para abrir · scroll para zoom ·{" "}
            <Link href="/" className="pointer-events-auto underline underline-offset-2 hover:text-ink">
              ver em lista
            </Link>
          </p>
          {items.length > 0 && !customizing && (
            <button
              type="button"
              onClick={() => {
                setOpenKey(null);
                setCustomizing(true);
              }}
              className="pointer-events-auto ml-auto rounded-lg border border-line bg-surface/95 px-3 py-1.5 text-xs font-medium text-ink shadow-sm backdrop-blur transition-colors hover:bg-surface-2"
            >
              <span aria-hidden>✨</span> Personalizar boneco
            </button>
          )}
        </div>
      </div>

      {customizing && (
        <Customizer look={look} onChange={saveLook} onClose={() => setCustomizing(false)} />
      )}

      {openKey && (
        <aside
          aria-label={open ? open.title : "Pendências"}
          className="absolute inset-x-3 bottom-3 z-30 max-h-[60%] overflow-y-auto rounded-2xl border border-line bg-surface p-5 shadow-xl sm:inset-x-auto sm:bottom-auto sm:right-4 sm:top-24 sm:max-h-[calc(100%-7rem)] sm:w-96"
        >
          {open ? <FolderPanel item={open} projectName={names[open.project]} /> : <PendingPanel pending={pending} />}
          <button
            type="button"
            onClick={close}
            className="mt-5 w-full rounded-lg border border-line px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-2"
          >
            {open ? "Guardar pasta" : "Voltar"} <span className="text-ink-3">Esc</span>
          </button>
        </aside>
      )}
    </div>
  );
}

/** Fora da tela até a cena calcular a posição no primeiro quadro. */
const HIDDEN = { transform: "translate(-9999px, 0)" };

const LABEL =
  "absolute left-0 top-0 flex w-max items-center gap-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-stone-800 shadow-sm ring-1 ring-stone-900/10";

function FolderPanel({ item, projectName }: { item: HubItem; projectName: string }) {
  const done = item.status === "entregue";
  return (
    <article>
      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-medium ${
            done
              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
              : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
          }`}
        >
          <span aria-hidden className={`size-1.5 rounded-full ${done ? "bg-emerald-500" : "bg-amber-500"}`} />
          {done ? "Entregue" : "Em andamento"}
        </span>
        <Link
          href={`/projetos/${item.project}`}
          className="rounded-full bg-surface-2 px-2 py-0.5 font-medium text-ink-2 hover:text-ink"
        >
          {projectName}
        </Link>
        {item.audience && <AudienceBadge audience={item.audience} />}
        {item.category && <span className="text-ink-3">{item.category}</span>}
      </div>
      <h2 className="mt-3 text-base font-semibold leading-6">{item.title}</h2>
      {item.detail && <p className="mt-2 text-sm leading-6 text-ink-2">{item.detail}</p>}
      {item.note && (
        <p className="mt-3 rounded-lg bg-amber-500/10 px-3 py-2 text-xs leading-5 text-amber-800 dark:text-amber-200">
          Falta o impacto: {item.note}
        </p>
      )}
    </article>
  );
}

function PendingPanel({ pending }: { pending: string[] }) {
  return (
    <section>
      <h2 className="text-base font-semibold">Pendências que atravessam a semana</h2>
      {pending.length > 0 ? (
        <ul className="mt-3 flex flex-col gap-2 text-sm leading-6 text-ink-2">
          {pending.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden className="text-ink-3">
                ○
              </span>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-ink-2">Quadro limpo: nada ficou para a semana seguinte.</p>
      )}
    </section>
  );
}
