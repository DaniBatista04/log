@AGENTS.md

# log — hub de demandas do Daniel (Focus Media)

Registro pessoal de trabalho que vira comunicação interna. Dois markdowns na raiz são a **fonte
única**; o front Next.js só os lê e mostra:

- `CHANGELOG.md` — tudo que muda no **Mural** (portal dos condomínios). Alimenta a aba
  Atualizações do Mural (itens 🟢) e o e-mail semanal.
- `WEEKLY-LOG.md` — demandas **fora do Mural** (n8n, telas, CRM, WhatsApp, apoio a outras áreas).
- `templates/email-semanal.md` — modelo e checklist de tom do e-mail de segunda.

Público das telas: o próprio Daniel (curadoria semanal) e, indiretamente, o time interno que recebe
o e-mail. O README tem a rotina, a regra dos marcadores e a explicação do bloqueio de `vercel.app`
na rede do escritório (UDM) — leia antes de "consertar" o deploy.

## Stack (versões instaladas)

- Next.js 16.3.1 (App Router, Server Components com `dynamic = "force-dynamic"`), React 19.2.8
- Tailwind CSS 4.3 via `@tailwindcss/postcss`, tokens em `app/globals.css` (`@theme inline`)
- Fonte Geist / Geist Mono via `next/font/google` (`app/layout.tsx`)
- `three` 0.186 + `@react-three/fiber` 9.8 só na tela Arquivo 3D
- TypeScript 5.9, ESLint 9 (`eslint-config-next`). Alias `@/*` → raiz do projeto
- Deploy: Vercel, a partir do `main` (prod: `https://log-delta-rouge.vercel.app`)

## Comandos (package.json)

```bash
npm run dev     # next dev
npm run build   # next build
npm run start
npm run lint    # eslint
```

Não há testes. Não há banco. `LOG_DIR` (opcional) aponta para outra pasta com os dois `.md`.

## Estrutura

```
CHANGELOG.md, WEEKLY-LOG.md   # dados — editados à mão
lib/log.ts                    # parser dos dois markdowns (regex)
lib/hub.ts                    # junta tudo em semanas/projetos/itens do kanban
app/page.tsx                  # Demandas (kanban da semana)
app/projetos/, app/projetos/[slug]/   # projetos por [área]; Mural = CHANGELOG
app/metricas/                 # contagens por semana e por projeto
app/arquivo/                  # Arquivo 3D (components/arquivo/*)
app/atualizacoes/, app/email/ # fora do menu: prévia da aba do Mural e rascunho do e-mail
components/                   # nav, kanban, badge, stat, filter-chip, week-switcher, new-demand, copy-button
public/personagens/           # modelos .glb do Kenney (CC0)
```

## Formato dos markdowns (o parser em `lib/log.ts` depende disso)

- Semana: `## [Semana N] — 10 a 14 de agosto de 2026` (colchetes opcionais). Numeração conta a
  partir da entrada na empresa (Semana 1 = 10–14/08/2026).
- CHANGELOG: `### Categoria` (Adicionado · Melhorado · Corrigido · Performance · Interno) e
  `- 🟢|⚙️ **Título** — impacto`. 🟢 = cliente vê; ⚙️ = interno.
- WEEKLY-LOG: `- [área] ✅|⏳ texto`. Sem marcador conta como entregue. `[área]` vira projeto
  (slug). Nota editorial `*(falta …)*` tira o item do e-mail e mostra "Falta o impacto".
- Subseção `**Pendências que atravessam pra semana N:**` vira o quadro de pendências.
- Linhas de continuação indentadas são juntadas ao item.

Ao mexer no parser, confira as quatro telas que leem os mesmos dados (Demandas, Projetos, Métricas,
Arquivo 3D) e as duas fora do menu.

## Convenções

- Texto do CHANGELOG/e-mail: curto, sem jargão de TI (nada de webhook, endpoint, deploy, API,
  front…). Descreva o efeito, não o mecanismo. Isso vale também para os itens ⚙️.
- O hub **não grava nada**: mudar de coluna é trocar `⏳` por `✅` no markdown. "Anotar demanda"
  só gera a linha para copiar.
- Código: aspas duplas, ponto e vírgula, componentes em `components/` com export nomeado,
  comentários em português explicando o porquê.
- Cores só pelos tokens (`bg-surface`, `text-ink-2`, `border-line`, `bg-cliente-soft`…). Ver `DESIGN.md`.
- Público sempre com rótulo escrito ("Cliente vê" / "Interno"), nunca só cor.
- Leia `node_modules/next/dist/docs/` antes de usar API do Next (ver `AGENTS.md`).

## O que NÃO fazer

- **Rota nova que lê markdown precisa entrar em `outputFileTracingIncludes` no `next.config.ts`**,
  senão o deploy sobe sem os arquivos e a tela fica vazia em produção.
- Não faça push no `main` sem pedido: a Vercel publica direto dali, e o conteúdo dos `.md` é o que
  vai para o ar e para o e-mail.
- Não reescreva entradas antigas do CHANGELOG/WEEKLY-LOG nem invente demandas ou impactos — são
  registro histórico. Se faltar impacto, deixe a nota `*(falta …)*`.
- Não troque a rede/DNS do projeto por causa do bloqueio de `vercel.app` no escritório: o problema
  é o UDM local (ver README).
- `index.html` na raiz está vazio e fora do git; não faz parte do app.
