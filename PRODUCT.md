# Produto — Log / Hub de demandas

## Para quem

Para o Daniel (Focus Media), que registra o próprio trabalho, e para o time interno que recebe o
e-mail semanal. Indiretamente para os clientes do **Mural**, que leem a aba Atualizações gerada a
partir do `CHANGELOG.md`.

## Problema que resolve

Não perder o histórico do que foi feito e transformar anotações cruas do dia a dia em comunicação
que um público não técnico entende: o e-mail de segunda e as novidades do Mural. Também dá visão
de volume (quantas demandas, em quais projetos, quantas ainda sem impacto escrito).

## Telas e fluxos

- **Demandas** (`/`) — semana atual em kanban de duas colunas (Em andamento × Entregue), filtro por
  projeto, números da semana, pendências que atravessam a semana e "+ Anotar demanda", que gera a
  linha no formato do `WEEKLY-LOG.md` para copiar.
- **Projetos** (`/projetos`, `/projetos/<área>`) — cada `[área]` do WEEKLY-LOG vira um projeto; o
  CHANGELOG inteiro vira o projeto Mural. Kanban próprio com filtro por semana.
- **Métricas** (`/metricas`) — demandas por semana (barras empilhadas, com tabela) e por projeto.
- **Arquivo 3D** (`/arquivo`) — a semana como escritório em miniatura: projeto = estante, demanda =
  pasta, boneco personalizável que anda até a pasta clicada.
- Fora do menu: **`/atualizacoes`** (prévia do que o cliente vê no Mural, só 🟢) e **`/email`**
  (rascunho do e-mail semanal com botão "Copiar email" e checklist "Antes de enviar").

Fluxo de rotina: anotar uma linha por dia no markdown → na segunda, revisar `/email`, copiar e
enviar → abrir a seção da semana nova nos dois arquivos.

## Tom de voz

Português do Brasil, direto, informal e sem jargão técnico. Frase curta que diz o efeito para quem
usa. Exemplos reais da interface:

- "Nada aqui." · "Falta o impacto" · "Quadro limpo: nada ficou para a semana seguinte."
- "gera a linha para o WEEKLY-LOG.md" · "Copiar linha" · "Copiado"
- "Rascunho gerado a partir de Semana N (…) — revise o tom antes de enviar."
- "Toda linha responde “o que melhorou para alguém?”, não “o que eu mexi?”"
- "Montando o escritório…" · "Personalizar boneco" · "Guardar pasta"
- E-mail: "Oi pessoal, Resumo rápido do que saiu no Mural essa semana:" … "Abraço, Daniel"

## Marca

Ferramenta interna da Focus Media, mas a interface **não usa** identidade visual da Focus: o
cabeçalho é só "Log / Hub" e o ícone (`app/icon.svg`) é um quadrado verde com linhas brancas.
Não há logo nem cores da marca no código.

## O que não é

- Não é um sistema de tarefas: não grava, não edita, não tem login nem banco. A fonte é o markdown.
- Não é o Mural nem o CMS da aba Atualizações — `/atualizacoes` é só prévia.
- Não é ferramenta de equipe com múltiplos usuários; é o log de uma pessoa.
