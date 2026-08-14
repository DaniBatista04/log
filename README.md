# Log — sistema de registro de demandas

Sistema para não perder o histórico do que é feito e alimentar o post/email semanal.

## Arquivos

| Arquivo | Para quê |
|---|---|
| `CHANGELOG.md` | Tudo que muda no **Mural**. Fonte única da aba Atualizações e do email. |
| `WEEKLY-LOG.md` | Demandas **fora do Mural** (automações, Teams, n8n, apoio a outras áreas). |
| `templates/email-semanal.md` | Modelo do email interno + checklist de tom. |
| `app/`, `components/`, `lib/` | Front que lê os dois markdowns e mostra tudo na tela. |

## Rodando o front

```bash
npm install   # só na primeira vez
npm run dev
```

Três telas:

- **Painel** — a semana inteira, com filtro por público e as demandas fora do Mural.
- **Aba Atualizações** — prévia exata do que o cliente vê (só os 🟢).
- **Email da semana** — rascunho gerado a partir do changelog, com botão de copiar.

Não tem banco: o front lê os `.md` da raiz a cada request. Editou o markdown, atualizou a tela.
Para apontar para outra pasta, use a variável `LOG_DIR`.

No deploy da Vercel os markdowns entram no bundle pelo `outputFileTracingIncludes` do
`next.config.ts` — se você criar uma rota nova que lê algum arquivo, precisa incluí-la lá.

## Rotina

**Todo dia (2 min):** aconteceu algo? Uma linha no arquivo certo. Cru, sem capricho.

**Segunda de manhã (15 min):**

1. Abre o `CHANGELOG.md` da semana que fechou.
2. Os itens 🟢 alimentam a aba Atualizações do Mural.
3. Monta o email com o template, puxando o impacto de cada linha.
4. Abre a seção da nova semana nos dois arquivos.

## Numeração das semanas

Contadas a partir da entrada na empresa, não pela semana do calendário. A primeira semana
(10 a 14 de agosto de 2026) é a Semana 1. Ao abrir uma semana nova, é só incrementar a última.

## Regra dos marcadores

- 🟢 = **cliente vê**. Se o usuário final do Mural nota a diferença, é verde.
- ⚙️ = **interno**. Refactor, ferramenta de suporte, ambiente, infra.

Na dúvida: se você precisa explicar o que é para a pessoa entender o benefício, é ⚙️.

## Aba "Atualizações" no Mural — gatilho recomendado

Não usar dia fixo. Guardar `last_seen_version` por usuário e mostrar o badge/modal quando houver versão nova que aquela pessoa ainda não viu.

- Quem entra todo dia não perde nada.
- Quem sumiu duas semanas vê o acumulado de uma vez.

O conteúdo sai do próprio changelog, filtrando só os 🟢 — não precisa de CMS.

## Snippet para colar no CLAUDE.md do repo do Mural

```md
## Changelog

Ao concluir qualquer mudança funcional, adicione uma entrada em `CHANGELOG.md`
(no repo `projetos/log`) sob a semana atual, no formato:

- <marcador> **<título curto>** — <o que muda na prática para quem usa>

Marcadores: 🟢 = cliente final percebe · ⚙️ = interno/técnico.
Categorias: Adicionado · Melhorado · Corrigido · Performance · Interno.
Nunca descreva a implementação: descreva o efeito.
```
