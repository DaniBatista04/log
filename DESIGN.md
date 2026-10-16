# Design — Log / Hub de demandas

Tudo abaixo foi extraído do código. Onde não há evidência, está marcado "a definir".

## Cores

Tokens em `app/globals.css` (`:root` + `@media (prefers-color-scheme: dark)`), expostos ao
Tailwind via `@theme inline` como `bg-*`, `text-*`, `border-*`:

| Token Tailwind | Variável | Claro | Escuro | Uso |
|---|---|---|---|---|
| `background` | `--background` | `#fafaf9` | `#0c0a09` | fundo da página, inputs |
| `surface` | `--surface` | `#ffffff` | `#1c1917` | cards, header, painéis |
| `surface-2` | `--surface-2` | `#f5f5f4` | `#292524` | coluna do kanban, item ativo, hover |
| `line` | `--line` | `#e7e5e4` | `#333029` | bordas e divisores |
| `ink` | `--ink` | `#1c1917` | `#fafaf9` | texto principal |
| `ink-2` | `--ink-2` | `#57534e` | `#b8b2ac` | texto secundário |
| `ink-3` | `--ink-3` | `#a8a29e` | `#78716c` | rótulos, contagens, dicas |
| `cliente` / `cliente-soft` | `--cliente*` | `#15803d` / `#dcfce7` | `#4ade80` / `#14321f` | público "Cliente vê" (🟢) |
| `interno` / `interno-soft` | `--interno*` | `#4f46e5` / `#e0e7ff` | `#a5b4fc` / `#1e1b4b` | público "Interno" (⚙️), barras por projeto |

Base neutra = escala *stone* do Tailwind. Cores de status usam a paleta padrão do Tailwind, não
tokens: **âmbar** (`bg-amber-500`, `bg-amber-500/15 text-amber-700 dark:text-amber-300`) = em
andamento / falta impacto; **esmeralda** (`bg-emerald-500`) = entregue (`components/kanban.tsx`,
`app/metricas/page.tsx`).

Arquivo 3D (`components/arquivo/palette.ts`), "clima de maquete": piso `#E8D9C0`, parede
`#B9C4C9`, madeira `#7A5C45`, planta `#5E8C61`, cortiça `#C9A26B`, tapete `#3E6FA8`; status
`andamento #E0A43A`, `entregue #5E9C6A`; post-its `#F7E07B #F4B6A6 #A9D8C4 #B7C8F0`.

Ícone (`app/icon.svg`): `#16a34a` com barras brancas.

## Tipografia

- **Geist** (sans) e **Geist Mono** via `next/font/google` em `app/layout.tsx`, ligadas a
  `--font-sans` / `--font-mono`. `font-mono` para nomes de arquivo e linhas de markdown.
- Escala em uso (classes Tailwind): título de página `text-2xl font-semibold tracking-tight`;
  título de seção `text-sm font-semibold` ou `font-semibold`; corpo `text-sm`; secundário `text-xs`;
  micro `text-[11px]`; rótulo de grupo `text-xs font-semibold uppercase tracking-wider text-ink-3`;
  valor de KPI `text-2xl font-semibold`. Números com `tabular-nums`.

## Espaçamento e layout

- Conteúdo em `main.mx-auto.max-w-5xl.px-6.py-10`; header em `max-w-6xl px-6 py-4` (`app/layout.tsx`, `components/nav.tsx`).
- Páginas empilham seções com `flex flex-col gap-8` (ou `space-y-8`); cards internos `p-4`/`p-5`, cards de kanban `p-3.5`.
- Grades: KPIs `grid-cols-2 sm:grid-cols-4 gap-3`; kanban `md:grid-cols-2 gap-4`; projetos `sm:grid-cols-2 lg:grid-cols-3`.
- Arquivo 3D é exceção: cena `fixed` em tela cheia abaixo do header, com HUD sobreposto
  (`bg-surface/95 backdrop-blur`).

## Raio, bordas e sombras

- `rounded-2xl` seções e colunas; `rounded-xl` cards, KPIs, dropdown; `rounded-lg` inputs e botões;
  `rounded-md` itens do menu e `CopyButton`; `rounded-full` chips, badges e pontos de status.
- Borda padrão `border border-line`. Estado vazio com `border-dashed`.
- Sombras discretas: `shadow-sm` em cards; `shadow-lg` em dropdown/tooltip; `shadow-xl` em painéis do 3D.

## Componentes

Sem biblioteca de componentes (nada de shadcn/Radix). Componentes próprios em `components/`:
`Nav`, `Kanban` (+ `Card`), `AudienceBadge`, `CategoryLabel`, `Stat`, `FilterChip` (link com
`aria-current`), `WeekSwitcher` (‹ / lista agrupada por mês / ›), `NewDemand` (`<details>` com
formulário que gera texto), `CopyButton`. Disclosure nativo via `<details>/<summary>`.

## Ícones

Sem biblioteca de ícones. Usa glifos e emoji no texto: `‹ › ▾ ○ ·`, `⏳ ✅ 🟢 ⚙️ ✨`, e pontos
coloridos (`size-2 rounded-full`). Glifos decorativos levam `aria-hidden`.

## Responsivo

Breakpoints padrão do Tailwind (`sm`, `md`, `lg`). Mobile-first: grades colapsam para 1–2 colunas;
o kanban só limita altura com rolagem a partir de `md`; no Arquivo 3D os painéis viram folha
inferior (`inset-x-3 bottom-3`) no celular e coluna lateral a partir de `sm`; a dica de controles
some no celular (`hidden sm:block`). Menu quebra linha com `flex-wrap`.

## Estados

- **Vazio:** "Nada aqui." (coluna do kanban, caixa tracejada); "Nenhuma demanda registrada nesta
  semana."; "Nenhum item marcado como 🟢 ainda."; "Quadro limpo: nada ficou para a semana seguinte."
- **Sem dados/arquivo:** "Não achei o WEEKLY-LOG.md nem o CHANGELOG.md. Aponte LOG_DIR…"
- **Carregando:** só no 3D — "Montando o escritório…". Não há `loading.tsx` (páginas são server-side).
- **Erro:** a definir (não há `error.tsx`; projeto inexistente cai em `notFound()`).
- **Pendência editorial:** chip âmbar "Falta o impacto".
- **Feedback:** `CopyButton` troca para "Copiado" por 2 s.
- **Tema escuro:** automático por `prefers-color-scheme`; sem alternador manual.
- **Movimento:** o 3D respeita `prefers-reduced-motion`.

## Faça

- Use os tokens (`surface`, `line`, `ink-*`, `cliente`, `interno`) em vez de hex soltos.
- Mantenha âmbar = em andamento e verde = entregue em todas as telas, inclusive no 3D.
- Escreva o público por extenso ("Cliente vê", "Interno") além da cor.
- Reaproveite `Stat`, `FilterChip`, `Kanban`, `WeekSwitcher` antes de criar componente novo.
- Mantenha a interface sóbria e textual; densidade de informação acima de decoração.

## Não faça

- Não introduza biblioteca de UI ou de ícones sem necessidade — o projeto não usa nenhuma.
- Não use cor como única forma de informação.
- Não aplique cores da marca Focus Media inventadas: não há tokens de marca definidos (a definir).
- Não adicione formulários que "salvam": o hub é só leitura dos markdowns.
