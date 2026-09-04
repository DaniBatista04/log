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

---

## [Semana 4] — 31 de agosto a 4 de setembro de 2026

### Adicionado

- ⚙️ **Limpar de uma vez as solicitações de remoção de comunicado** — dá para apagar todas as solicitações de remoção pendentes de uma só vez, em vez de ir uma por uma até a lista esvaziar.
- ⚙️ **Áudio anexado ao chamado** — dá para anexar áudios ao chamado, então quem abre pode mandar o barulho da tela ou a explicação falada em vez de tentar descrever por escrito.
- 🟢 **O menu mostra quanto está esperando por você** — o menu do síndico passou a trazer, ao lado de cada item, quantos comunicados estão em revisão e quantos rascunhos ficaram pela metade, então dá para ver de relance o que ainda pede atenção sem abrir as telas uma por uma.
- ⚙️ **Remover anexo do chamado** — anexo entrava por três telas diferentes e depois não saía mais. Agora dá para tirar o que entrou por engano: o Mural pede que se digite o nome do arquivo para confirmar e apaga o arquivo de verdade, não só o link para ele. Só quem tem conta de administrador pode fazer isso, porque não tem como desfazer.

### Melhorado

- ⚙️ **Tela de chamados mais limpa** — a tela de chamados foi repaginada e ficou com um visual mais organizado, mais fácil de ler de relance. O que dá para fazer nela continua o mesmo: mudou só o jeito como as informações aparecem.
- 🟢 **Mural mais confortável de usar no celular** — as telas do Mural foram ajustadas para o tamanho do aparelho, então publicar e acompanhar os comunicados pelo celular ficou mais fácil do que antes.
- 🟢 **Condomínio já vem marcado para quem cuida de um só** — quem responde por um único condomínio agora o encontra já selecionado ao montar o comunicado, em vez de ter que escolhê-lo na lista toda vez. Quem cuida de mais de um continua escolhendo, como antes.
- ⚙️ **Tipo de imóvel e tipo de acordo preenchidos sozinhos** — o cadastro do prédio passa a receber também o tipo de imóvel e o tipo de acordo do sistema do comercial, junto com endereço e CEP. Só completa o que está em branco, nunca troca o que alguém já preencheu, e quando o dado vem em um formato que não reconhecemos fica vazio em vez de chutar. As diferenças entre o que foi preenchido na mão e o que veio do comercial ficam listadas para conferência, sem alterar nada.
- 🟢 **Área de montagem do comunicado: visual novo e zoom que funciona** — ampliar recortava a arte e reduzir deixava sobra em volta, e o enquadramento que iria para a tela saía errado por causa disso. Agora aproximar e afastar mexe na arte inteira, em passos suaves, e dá para usar a roda do mouse com Ctrl, a pinça de dois dedos no celular, os atalhos Ctrl +, Ctrl − e Ctrl 0, e rolar para os lados além de para cima e para baixo. Junto, a área de montagem ficou mais larga em monitor grande e o visual em volta, mais limpo.

### Corrigido

- 🟢 **Vídeo escondido atrás do fundo desfocado** — quando o comunicado era um vídeo, o fundo desfocado ficava por cima e o vídeo sumia atrás dele. Agora o vídeo aparece na frente, como deveria.
- 🟢 **O botão "Duplicar" agora duplica de verdade** — o botão existia, mas o clique nunca gerava cópia nenhuma: a tela recarregava como se nada tivesse acontecido. Agora a cópia abre no editor já com período novo, começando hoje e com a mesma duração do original — porque o comunicado que se costuma reaproveitar é justamente um que já terminou, e repetir as datas antigas não deixaria publicar.
- 🟢 **Comunicado exibindo o material de outro condomínio** — ao montar a arte para as telas, o Mural podia reaproveitar por engano o material de outro comunicado, e a tarja com o nome do condomínio saía trocada. Encontramos 6 comunicados no ar assim, 4 deles mostrando a tarja de outro condomínio. A causa foi corrigida e não acontece mais. O que já estava publicado com a arte errada também se conserta sozinho agora: de hora em hora o Mural passa pelos comunicados no ar, refaz a arte quando consegue e tira do ar quando não há arte boa para pôr no lugar. Na varredura de hoje eram 17 comunicados atingidos, 9 deles no ar e 4 exibindo a arte de outro condomínio.
- 🟢 **Condomínios que ficaram sem nenhum comunicado nas telas** — ao renovar a exibição de um condomínio, o Mural podia incluir no pedido uma tela que não faz parte do plano contratado; o pedido inteiro era recusado e, como a renovação tira o que estava no ar antes de subir o novo, o condomínio ficava sem nada. Aconteceu com 10 condomínios. Agora só entram no pedido as telas previstas no plano.
- 🟢 **Comunicado dizia "publicado" sem nada ter ido para a tela** — quando o condomínio estava cadastrado sem nenhuma tela, o Mural marcava o comunicado como publicado e mandava o email de aprovado, mas nada aparecia em lugar nenhum. Três comunicados de um condomínio estavam assim desde 31 de agosto. Agora a publicação sem tela falha e avisa, em vez de dizer que deu certo. A origem também foi corrigida: a atualização diária dos prédios não dava conta de percorrer a lista inteira e parava nos primeiros, deixando prédios sem tela cadastrada.
- 🟢 **Nome do condomínio no topo do comunicado saindo trocado** — o Mural escrevia o nome do primeiro condomínio escolhido e não voltava a olhar para isso; quando o comunicado ia para mais de um condomínio, todos recebiam a arte com o nome de um só. Eram 19 comunicados assim, 5 deles no ar. Agora o nome só é preenchido quando há um único condomínio escolhido, acompanha a troca, avisa quando um segundo entra, e a publicação recusa comunicado que leve o nome de outro condomínio. ⚠️ Os que já estão no ar precisam ser abertos e publicados de novo.
- 🟢 **Botão "Voltar" que não voltava** — quem abria o editor direto por um link (mandado no WhatsApp ou salvo como atalho) clicava em "Voltar" e nada acontecia, e ficava sem caminho para "Minhas criações", que é onde se apaga um comunicado. Agora o "Voltar" sempre leva para o painel, e a aba "Minhas criações" ganhou o botão "Ver todos e excluir".
- 🟢 **Comunicado com data marcada valendo por cima dos outros** — a exibição de um condomínio pode ser programada de dois jeitos, um sem data e um com data marcada; quando os dois se misturavam no mesmo condomínio, o trecho com data passava a valer por cima do resto. A escolha de qual usar estava repetida em cinco caminhos e faltava em dois deles (tirar um comunicado do ar e recolocá-lo na fila); agora é uma regra só, e uma conferência automática de hora em hora acerta o que estiver fora. A varredura achou 51 exibições e 139 comunicados no ar nessa condição, e um ajuste no mesmo dia corrigiu o próprio reparo, que estava encerrando o período um dia antes.
- ⚙️ **Acesso do síndico que não chegava** — quando o email com a senha falhava no envio, a conta ficava criada sem ninguém receber nada, e o prédio saía da fila como se já tivesse gestor. Agora, todo dia às 9h, o Mural confere os acessos criados e reenvia o que não foi entregue, com senha nova. Junto: endereço vindo do sistema do comercial com dois emails colados no mesmo campo ou terminando em ".com.b" é acertado antes do envio, e o cadastro passou a recusar endereço inválido na criação e na edição — duas das três falhas eram endereço colado em dobro. A conferência contra o Mural no ar pegou os 3 casos pendentes e não mexeu nos 288 acessos já entregues.
- ⚙️ **Síndico não entrava em prédio que já tinha outro responsável** — o Mural perguntava se o prédio tinha alguém vinculado, e não se aquele síndico era um deles; com administradora, zelador ou síndico anterior no cadastro, o prédio saía da fila como se já estivesse resolvido e o síndico ficava sem acesso. Eram 80 condomínios. Agora o vínculo é somado, sem desligar ninguém que já estava lá; email escrito com maiúscula, espaço sobrando ou acento deixou de criar conta repetida (havia 12 pares assim); e a procura pelo prédio passa a olhar todos os prédios, não só os sem responsável — 481 prédios que faltam na lista do comercial já tinham gestor. Dos 80, 79 entraram na hora, e o que sobrou era um síndico de dois condomínios que só entrava no primeiro; corrigido no mesmo dia.
- ⚙️ **Números do menu mostrando quantidade velha** — os avisos de quantidade no menu eram buscados uma vez e depois congelavam, então o número só acertava recarregando a página, e em doze telas a contagem certa era descartada logo depois de chegar. Agora ele se atualiza a cada 20 segundos enquanto a aba está à vista, na hora em que se volta para ela, e imediatamente depois de aprovar, recusar ou negar uma remoção. Entrou também o aviso de usuários inativos.
- ⚙️ **Fila de revisão vazia esperando um F5** — quem chegava ao fim da fila ficava numa tela parada: continuava contando como disponível, mas comunicado novo não lhe era passado até recarregar a página. Agora a tela pede o próximo sozinha a cada 10 segundos, só enquanto a aba está à vista, e tenta na hora quando se volta para ela — assim nenhum comunicado fica reservado numa aba esquecida.
- 🟢 **Vídeo com texto que ficava sem o texto** — em comunicado de vídeo, o Mural juntava o texto ao vídeo dentro do navegador de quem publica, e essa junção levava de 5 a 25 segundos: se a pessoa saísse antes, fechasse a aba ou tivesse internet fraca, o arquivo ficava pela metade e a publicação era barrada. Desde 1º de julho isso aconteceu com 1.027 versões de comunicado, e em 99% delas o texto já estava pronto e guardado — só a junção não tinha terminado. Agora o texto é guardado assim que é desenhado e o próprio Mural refaz a junção antes de barrar, então a publicação não depende mais de a pessoa ficar esperando na tela.
- 🟢 **Modelo pronto voltando a esperar revisão** — no mesmo dia, a mudança acima fez o comunicado feito com modelo da Focus Media ser recusado na conferência que o libera sem revisão, e ele caía na fila em vez de seguir direto. Foram três casos nas primeiras horas, e o problema foi corrigido no mesmo dia. Um comunicado recusado também deixou de perder a junção de texto e vídeo que acabara de ser feita.
- ⚙️ **Rolagem da tela de chamados** — depois do ajuste para celular, a tela travava no meio e não descia até o fim. Voltou a rolar de cima a baixo.

### Interno

- ⚙️ **Verificações que voltaram a rodar sozinhas** — a conferência dos comunicados publicados com modelo pronto havia parado de acontecer e voltou a rodar por conta própria, junto com um reparo novo que limpa os comunicados marcados como no ar em prédio sem tela cadastrada. Antes eles ficavam assim até alguém ir olhar.
- ⚙️ **Conferência das telas que ficaram de fora** — uma verificação nova aponta telas que existem no condomínio mas não entraram no que está no ar, separando as que foram cortadas na hora da contratação das que foram cadastradas depois. Achou 18 prédios e 27 telas nessa situação. Ela só aponta: corrigir continua sendo decisão de quem cuida da conta.
- ⚙️ **Conferência dos prédios sem nenhuma tela** — outra verificação lista os prédios cadastrados sem tela alguma e os comunicados que estão marcados como no ar sem ter onde aparecer: 39 prédios e 11 comunicados nessa situação.
- ⚙️ **Consulta direta ao sistema das telas** — dá para perguntar ao sistema das telas se a exibição de um condomínio continua ativa lá e comparar com o que o Mural acredita. Antes, um cancelamento que não valeu passava despercebido e a exibição seguia no ar sem ninguém saber.
