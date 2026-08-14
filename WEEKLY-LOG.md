# Log semanal — demandas fora do Mural

Tudo que não é código do Mural: automações, integrações, apoio a outras áreas, quebra-galho, reunião que virou entrega.

Anote **cru e no dia** — não precisa estar bonito. A curadoria acontece na segunda, quando o email é montado.

Formato de cada linha: `- [área] ✅ o que foi feito — para quem / o que destravou`

Status: `✅` entregue · `⏳` em andamento. Sem marcador, conta como entregue.

---

## Semana 1 — 10 a 14 de agosto de 2026

- [n8n] ✅ O comercial agora envia os materiais das telas por uma página só. O sistema ajusta o arquivo (tamanho, peso e som), dá o nome no padrão que as telas exigem, guarda na pasta certa do Teams e responde por email dizendo como ficou. Antes era um arquivo por vez, tudo na mão.

- [telas] ✅ O site que monta o conteúdo de notícias e clima das telas saiu do meu computador e foi para o ar, com endereço próprio. Antes ele só rodava na minha máquina, então dependia de eu estar com o computador ligado.
- [telas] ⏳ Fazendo o site buscar notícias e clima sozinho todo dia. Hoje alguém precisa pedir a atualização na mão; a ideia é que as telas recebam o conteúdo do dia sem ninguém lembrar disso.

**Pendências que atravessam pra semana 2:**

- Terminar a atualização automática diária de notícias e clima das telas.

**Aprendizados / contexto que não pode se perder:**

- **Por que existe uma página de envio.** O nome do arquivo é rígido demais para depender de
  memória humana, então a página garante o padrão em vez de cobrar que o comercial decore a
  regra. (Contexto técnico, não vai para o email.)
- **Nomenclatura exigida pela KUMA** (API chinesa que alimenta as telas OOH). Os comunicados
  precisam seguir `AAAAMMDD-formato-ordem-duração` — ex.: `20260812-25-1-10` é 12/08/2026,
  formato 25", material 1, 10 segundos.
- **A ordem tem que bater entre formatos.** Em campanha com 2+ vídeos, o vídeo 1 do 25" tem que
  ser o vídeo 1 do 32" (`20260812-25-1-10` ↔ `20260812-32-1-10`). É assim que a KUMA casa os
  materiais equivalentes entre os dois tamanhos de tela. Errar a ordem quebra a correspondência,
  e é justamente o erro que ninguém percebe na hora do upload — foi o que motivou o front.
