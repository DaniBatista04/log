# Changelog — Mural

Registro de tudo que muda no Mural. Fonte única: daqui saem a aba **Atualizações** (para o cliente) e o **email semanal** (para o time interno).

**Marcadores de público:**

- 🟢 **Cliente vê** — entra na aba Atualizações.
- ⚙️ **Interno** — só aparece no email do time e no histórico técnico.

**Como escrever:** curto, amigável e sem nenhuma palavra de TI — nada de webhook, endpoint,
deploy, API, front, indexação, ambiente. Descreva o efeito, não o mecanismo. Se a frase precisa
que alguém explique uma palavra, ela ainda não está pronta. Isso vale também para os itens ⚙️:
eles vão para o email do time, que também não é técnico.

**Categorias:** `Adicionado` · `Melhorado` · `Corrigido` · `Performance` · `Interno`

---

## [Semana 1] — 10 a 14 de agosto de 2026

### Adicionado

- ⚙️ **Ver o Mural do jeito que o cliente vê** — quem atende consegue abrir a conta do cliente sem pedir a senha dele, então o chamado se resolve na hora.
- ⚙️ **Cada versão do Mural com seu próprio ícone** — evita mexer no sistema que está no ar achando que é o de teste.

### Melhorado

- 🟢 **Aviso de carregamento entre as telas** — dá para ver que o sistema está buscando a informação, em vez de parecer travado.

### Corrigido

- 🟢 **Qualidade dos comunicados publicados** — comunicados estavam sendo publicados com qualidade degradada; agora saem na qualidade original.
- 🟢 **Menu lateral** — arrumado o menu que aparecia torto.

### Performance

- 🟢 **Lista de comunicados abre mais rápido** — mesmo em condomínios com muito comunicado publicado, a lista abre sem travar.

---

## [Semana 2] — 17 a 21 de agosto de 2026

### Adicionado

- 🟢 **Aviso de quando o comunicado vai ao ar** — o Mural mostra a previsão da janela em que o comunicado será enviado, então quem publica já sabe quando ele aparece, sem precisar perguntar.
- 🟢 **O Mural ajusta a imagem e o vídeo sozinho** — ao publicar, o próprio Mural deixa o arquivo no tamanho e no peso que as telas pedem. Antes era preciso preparar o arquivo em outro programa antes de subir; agora dá para publicar direto, sem sair do Mural.
- 🟢 **O comunicado em andamento não se perde mais** — se a pessoa sair do editor sem salvar, o Mural guarda o que já estava escrito como rascunho. Antes, sair no meio significava começar tudo de novo.
- 🟢 **Modelos prontos da Focus Media** — o síndico escolhe um modelo feito pela nossa equipe e troca só os textos, nos campos que já vêm marcados. Como o modelo já sai aprovado por nós, o comunicado não fica esperando nossa revisão: segue direto para a janela de publicação mais próxima.
- 🟢 **Fundo desfocado atrás da imagem, se a pessoa quiser** — quando a imagem do comunicado não ocupa a tela toda, quem publica pode preencher o espaço que sobra com uma versão desfocada da própria imagem, e o comunicado fica com cara de tela cheia. É opcional: quem não escolher isso continua vendo o comunicado do jeito de antes.
- ⚙️ **Fila de revisão em sequência** — os comunicados que esperam revisão aparecem em fila, um depois do outro, e a fila divide os comunicados entre todos os revisores que estiverem trabalhando nela naquele momento. Assim duas pessoas não revisam o mesmo comunicado e ninguém precisa combinar quem pega o quê.
- ⚙️ **Aba de relatórios para a nossa equipe** — num lugar só dá para ver como o Mural está sendo usado (quem publica, com que frequência, quais condomínios estão parados), como a fila de revisão está andando (quanto tempo os comunicados esperam e quanto cada revisor concluiu) e onde os comunicados apareceram nas telas. Antes cada uma dessas respostas dependia de alguém levantar na mão, condomínio por condomínio.

### Melhorado

- ⚙️ **Volta para a fila de revisão ao terminar** — quem revisa é levado de volta para a fila assim que conclui um comunicado, em vez de cair na tela inicial e ter que procurar o próximo. Revisar vários seguidos ficou mais rápido.

### Corrigido

- 🟢 **Modelos prontos não esperam mais revisão** — os comunicados feitos com os modelos da Focus Media ainda estavam entrando na fila de revisão, mesmo já saindo aprovados por nós. Agora seguem direto para a janela de publicação mais próxima, como era a proposta.
- ⚙️ **Busca de condomínio no filtro de comunicados** — o campo apagava o que estava sendo digitado, então era preciso começar de novo a cada tentativa. Agora dá para digitar direto, e as opções que aparecem ficaram mais organizadas e fáceis de ler.
- 🟢 **Imagem ampliada na tela de 25** — quando o comunicado não ocupava todo o espaço, ele era esticado e ficava com a imagem ruim. Agora aparece no tamanho certo, sem perder qualidade.
- 🟢 **Aviso de carregamento nos comunicados aprovados** — o aviso de carregamento aparecia em todos os comunicados da lista de uma vez, dando a impressão de que tudo estava sendo processado. Agora ele aparece só no comunicado em questão.
- 🟢 **Sugestão de texto sempre em português** — quando o Mural ajuda a escrever o comunicado, o texto às vezes vinha em inglês e era preciso refazer. Agora vem sempre em português.

### Performance

- 🟢 **O Mural ficou mais leve e abre mais rápido** — as telas do Mural carregam mais rápido em geral, inclusive no celular e em internet mais fraca.
- 🟢 **Lista de comunicados responde melhor** — abrir a lista e rolar por ela ficou mais rápido, mesmo com muito comunicado publicado.
- 🟢 **Editor do comunicado mais leve** — escrever, trocar a imagem e salvar responde mais rápido, com menos espera enquanto o comunicado é montado.

---

## [Semana 3] — 24 a 28 de agosto de 2026

### Melhorado

- 🟢 **Sair do modelo pronto e escrever do zero** — depois de escolher um modelo da Focus Media, dá para apagá-lo com um botão e continuar no mesmo lugar para montar um comunicado livre, do jeito que a pessoa quiser. Antes, quem começava por um modelo ficava preso a ele.
