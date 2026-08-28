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

### Adicionado

- 🟢 **Excluir rascunho** — dá para apagar um comunicado que ficou pela metade e não vai ser usado, então a lista de rascunhos mostra só o que ainda interessa. Antes o rascunho ficava lá para sempre.
- ⚙️ **Chamado de som e de publicidade** — a lista de motivos do chamado agora tem som e publicidade, então esses pedidos entram pelo caminho certo em vez de virar "outros" ou chegar por fora.
- ⚙️ **Departamento escolhido na abertura do chamado** — quem tem conta de administrador já diz, ao abrir o chamado, qual departamento cuida do assunto, então ele vai direto para as pessoas certas em vez de esperar alguém encaminhar depois.
- ⚙️ **Planilha com os chamados do departamento** — quem atende por um departamento consegue baixar os chamados dele em planilha, então dá para olhar tudo de uma vez, filtrar e montar o número do mês sem pedir para alguém levantar na mão.
- 🟢 **Mais um modelo pronto da Focus Media** — entrou um novo modelo na biblioteca: o síndico troca só os textos e publica. Como o modelo já sai aprovado por nós, o comunicado não espera revisão e segue direto para a próxima janela de publicação.

### Melhorado

- 🟢 **Sair do modelo pronto e escrever do zero** — depois de escolher um modelo da Focus Media, dá para removê-lo por um botão no próprio aviso que explica a trava, confirmar e continuar no mesmo lugar montando um comunicado livre. A arte sai de todos os tamanhos de tela de uma vez, nunca só de um. Antes, quem começava por um modelo ficava preso a ele: a arte não se mexia, as ferramentas de edição não apareciam e não havia caminho de volta.
- 🟢 **Modelos prontos mais fáceis de achar** — o quadro de cada modelo agora fica em pé, com a arte cerca de quatro vezes maior, o nome sobre ela e o selo laranja de "sem revisão"; o cabeçalho mostra quantos modelos existem. Antes o quadro era deitado e pequeno, e mostrava só uma tira do meio da arte — quem procurava dizia não encontrar os modelos.
- 🟢 **Visual mais bonito no tema claro e no escuro** — as cores e o contraste do Mural foram acertados nos dois temas, então ler e usar as telas fica mais agradável tanto de dia quanto à noite.
- ⚙️ **Abrir chamado em outra aba** — os botões de ver e editar chamado agora podem ser abertos em uma nova aba, inclusive na lista do gestor. O clique comum continua abrindo na mesma aba, como antes.
- ⚙️ **Nome, email e telefone preenchidos sozinhos no chamado** — ao escolher o prédio, os dados de contato já vêm preenchidos com o que está cadastrado nele. Antes era preciso digitar tudo de novo em cada chamado.
- ⚙️ **Prédio com endereço na hora de escolher** — a lista de prédios mostra o endereço junto do nome, então dá para separar dois prédios de nome parecido e não abrir o chamado no lugar errado.
- ⚙️ **Responsável já definido na abertura do chamado** — o chamado nasce com o responsável marcado, então ele não fica sem dono esperando alguém distribuir.
- ⚙️ **Mais de um motivo no mesmo chamado** — quando o pedido envolve mais de um assunto, dá para marcar todos os motivos de uma vez, em vez de abrir um chamado para cada um ou escolher só o principal e explicar o resto por escrito.
- 🟢 **Ícones novos no lugar das figurinhas** — os desenhinhos que apareciam pelo Mural foram trocados por ícones desenhados no mesmo traço, então as telas ficaram com um visual mais limpo e mais nosso.

### Corrigido

- 🟢 **Botão de enviar o comunicado diz o que falta** — o botão ficava apagado quando faltava alguma coisa e o clique não fazia nada, então parecia travado. Agora o clique avisa o que está pendente e leva direto ao ponto: abre a escolha dos prédios ou pula para a aba que ficou vazia. Havia 120 comunicados parados assim.
- 🟢 **Reaproveitar comunicado de modelo pronto** — ao reaproveitar em "Minhas criações" um comunicado feito com modelo da Focus Media, a arte voltava a aceitar mudança, o que não era a proposta do modelo. Agora continua fixa, como no primeiro uso.
- ⚙️ **O arquivo publicado com modelo pronto agora é conferido** — a conferência olhava só o desenho do comunicado e não o arquivo que ia junto, então quem tivesse conta de gestor e conhecimento técnico conseguia passar pela conferência e publicar um arquivo de fora, sem revisão. Agora o Mural recusa qualquer arquivo que não tenha sido gerado por ele e qualquer tamanho de tela que não esteja previsto — e, na dúvida, recusa em vez de aceitar. Nenhum caso aconteceu.
- ⚙️ **Fila de contas duplicadas do Brato** — prédio que já tinha dono definido continuava aparecendo como possível duplicata, porque o nome cortado casava com o prédio errado. A fila caiu de 23 para 5 prédios, e os 5 que sobraram estão prontos para resolver na mão.

### Interno

- ⚙️ **Conferência dos modelos prontos rodando contra produção** — uma verificação nova passa pelos comunicados publicados com modelo e confirma que todos batem com o modelo aprovado: os 96 comunicados existentes foram aceitos, e os casos adulterados de teste foram recusados.
- ⚙️ **Guia interno do Mural reorganizado** — o guia principal passou de 1.446 para 129 linhas, com só o que não pode ser esquecido; o detalhe foi para arquivos separados por assunto (banco e produção, enquadramento de arte, performance das listagens, revisão e publicação, email e gestores, pendências). Nenhuma regra foi descartada, e saiu uma imagem de 609 kB que ninguém usava.
- ⚙️ **Hipótese descartada: comunicado que perderia a arte ao escolher o condomínio depois do modelo** — não acontece: nenhuma ocorrência em 3.166 comunicados desde 1º de agosto. O "fica travado e não avança" relatado pelo síndico do Marajoara Sol era o botão de enviar, já corrigido.
