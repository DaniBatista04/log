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

---

## Semana 2 — 17 a 21 de agosto de 2026

- [ambiente] ✅ Máquina nova configurada e pronta para trabalhar: acessos, programas e projetos
  todos no lugar. Fecha a troca de computador — não fica mais nada dependendo da máquina antiga.
- [whatsapp] ⏳ Colocando agentes de IA para atender no nosso número de WhatsApp. Hoje a pessoa
  espera alguém livre para responder; a ideia é que o atendimento comece na hora e só chegue em
  alguém quando realmente precisar.
- [telas] ✅ Continua da semana 1, agora pronto: notícias e clima seguem sozinhos todo dia para o
  sistema que alimenta as telas (KUMA). Ninguém mais precisa lembrar de pedir a atualização. De
  dentro da KUMA para frente o processo segue manual, mas a parte que precisava de alguém todos os
  dias saiu do caminho.
- [comercial] ✅ Simulador de tela em tamanho real pelo celular: dá para ver a tela no lugar onde
  ela seria instalada, do tamanho de verdade, apontando a câmera para a parede. Antes a conversa
  dependia de a pessoa imaginar o tamanho ou de medir no local.

---

## Semana 3 — 24 a 28 de agosto de 2026

- [financeiro] ✅ Automação feita para o Vitor, do financeiro. *(falta descrever o que ela faz e o
  que era feito na mão antes — completar antes de montar o email de segunda.)*

- [telas] ✅ As notícias do dia agora entram como um plano só na mídia vertical, em vez de um plano
  separado para cada notícia. *(falta dizer o que isso destravou — completar antes do email.)*

- [smb-ooh] ⏳ Começou a parte que as pessoas vão ver e usar do projeto de SMB OOH. *(falta dizer
  para quem é e o que vai dar para fazer ali — completar antes do email.)*

- [whatsapp] ✅ Primeira versão pronta dos agentes de IA atendendo no nosso número de WhatsApp
  (continua da semana 2): quem chama já é atendido na hora, sem esperar alguém ficar livre.
  *(falta dizer o que o agente resolve sozinho, quando ele passa para uma pessoa e se já está
  atendendo de verdade ou ainda em teste — completar antes do email.)*

- [comercial] ✅ O simulador de tela em tamanho real (continua da semana 2) agora funciona também
  no iPhone. Antes só rodava em parte dos aparelhos, então o vendedor dependia de estar com o
  celular certo na mão para mostrar a tela no lugar da instalação; agora a demonstração acontece
  no aparelho de quem estiver na visita.

---

## Semana 4 — 31 de agosto a 4 de setembro de 2026

- [assinaturas] ✅ O site que monta a assinatura de email da empresa voltou a funcionar, refeito
  do zero. Ele estava fora do ar, então quem entrava na empresa ou trocava de cargo ficava sem
  assinatura padrão ou copiava a de um colega e ajustava na mão. Agora a pessoa preenche os dados
  dela e leva a assinatura pronta, no padrão certo. *(falta dizer onde ele fica e o que mudou em
  relação ao antigo — completar antes do email de segunda.)*

---

## Semana 5 — 7 a 11 de setembro de 2026

*(7 de setembro foi feriado; a semana começou no dia 8.)*

- [crm] ✅ O app de prospecção, que era um sistema separado, virou uma parte do CRM. Quem
  prospecta trabalha agora no mesmo lugar onde o lead vira negócio, em telas feitas para o
  celular: a fila do dia, a carteira de cada um, o monte de contatos parados e o resumo de
  esforço (quantas tentativas, quantas responderam, quantos leads saíram de cada 100 contatos).
  Os 439 contatos que existiam no app antigo foram trazidos junto, sem duplicar. Antes esse
  número de esforço não existia em lugar nenhum — sumia junto com o app.
- [crm] ✅ O monte de contatos parados ("congelados") virou uma lista que dá para decidir. Eram
  48 cartões iguais dizendo a mesma coisa, sem como escolher qual valia a pena resgatar; agora
  cabe o triplo na tela do celular, com cor por motivo (declinou, sem dono, parado há 30 dias),
  filtro com a contagem de cada monte, de quem era o contato antes e — o que mais importa —
  quem já respondeu alguma vez aparece primeiro.
- [crm] ✅ O aviso de aditivos pendentes agora chega para quem pode resolver. A faixa "X
  aditivos aguardando" somava tudo e aparecia igual para Jurídico, Operações e admin: o
  Jurídico via o que já não dependia dele, Operações recebia um aviso sem ação, e quem marca
  "assinado" não via nada. Agora cada um vê só a sua parte, e a lista bate com o número da
  faixa.
- [crm] ✅ A tela de Logística voltou a abrir para quem é de Operações e para os fornecedores.
  Ela tinha ficado em branco — tabela vazia, busca sem resultado e nada para editar — e sem
  nenhuma mensagem explicando, então chegou como "não consigo ver nada". Junto, falha de
  carregamento passou a aparecer como aviso na tela em vez de silêncio.
- [crm] ✅ A planilha de exportação dos negócios estava desatualizada: campos criados depois
  (andares, classe, compartilhamento, telas especiais, canaletas, logística, fornecedor) nunca
  tinham entrado e não havia nada de pagamento. Agora ela traz tudo, com os dados bancários e
  pessoais no bloco restrito — Operações não vê essa parte no sistema e também não vê na
  planilha.
- [crm] ✅ Um monte de ajustes menores pedidos no uso do dia a dia: troca de dono dos cards,
  visibilidade limitada por time, prédio arquivado exige registrar a desinstalação e some das
  listas, filtro de gestores corrigido, colunas de previsão em destaque e a logística paginada
  para abrir rápido com a base inteira.
- [crm] ⏳ Importação de leads por planilha ficou pronta (quarta porta de entrada de lead,
  restrita a admin, com conferência do arquivo antes de subir e sem duplicar quem já existe),
  mas foi para a gaveta e não está no ar — decisão de não liberar por enquanto. O código está
  guardado e volta com um comando.
- [crm] ✅ Na Prospecção, cada gestor passou a ver só a sua equipe. "Ser gestor" e "ver tudo"
  eram a mesma coisa, então quem era gestor de um time enxergava os números e a base de
  qualquer outro. Agora o alcance vem do mesmo organograma do Pipeline BD — gestor vê os BDs
  dele, gerente sênior vê os gestores e os BDs deles, admin vê tudo — e vale também para o que
  cada um pode mexer, não só para o que enxerga. A base de contatos frios e o monte de
  congelados continuam sendo de todos de propósito: são a fila de resgate compartilhada.
- [crm] ✅ Ainda na Prospecção, um pacote de coisas do uso diário: a base completa ganhou
  filtro por dono, status, período, próxima ação e presença de contato, com colunas
  ordenáveis; o filtro de pessoas deixou de ser liga/desliga e passou a alternar entre o time
  inteiro, só a pessoa e ninguém, porque os dois recortes são usados o tempo todo; e as listas
  grandes ganharam paginação de verdade no lugar de um corte silencioso em 500 linhas. A aba
  aberta passou a ficar no endereço da página, então voltar no navegador e atualizar deixaram
  de perder o lugar.
- [crm] ✅ Contato que já é negócio de outra pessoa parou de virar card repetido. Registrar
  alguém que já está em fase avançada com outro BD não grava mais nada — quem tentou vê que o
  lead já está adiantado, e o dono do card recebe um aviso discreto, no máximo um por card por
  dia. No começo do funil o registro apenas completa os campos em branco do card que já
  existe, em vez de criar um segundo. Junto, o dono do contato passou a corrigir o status na
  mão, sem precisar inventar uma tentativa nova só para arrumar a classificação.
- [crm] ✅ Destravado o aditivo que não avançava para a assinatura. Uma BD relatou, pelo
  Jurídico, que o botão ficava cinza sem dizer por quê — e era defeito mesmo: o gestor nunca
  conseguia marcar "Assinado" num registro da equipe dele, apesar de a regra permitir. Junto,
  cada etapa do aditivo passou a dizer de quem ela é ("Responsável: Jurídico", "Responsável:
  Você" ou o nome do dono), e quem vai confirmar a assinatura é avisado de que marcar
  "Assinado" já aplica as telas e os valores novos ao edifício.
- [crm] ✅ O CRM passou a entregar ao Mural quem é o fornecedor que instala e atende cada
  edifício — empresa, contato, telefone e CNPJ. O dado só existe aqui, escolhido na ficha do
  edifício, e é o que faz o Mural mostrar o fornecedor no chamado e na planilha da operação
  sem precisar de um segundo cadastro do outro lado.

- [telas] ✅ Clima e notícias das telas passaram a atender duas praças: São Paulo e Rio de
  Janeiro. A notícia é nacional e vai num pedido só; o clima tem arte por cidade, então é um
  pedido por praça, com nome próprio para cada uma. Antes o sistema só sabia de São Paulo.
- [telas] ✅ Fechado o diagnóstico do "clima desatualizado" que dois condomínios reportaram. O
  material estava certo e chegava a quase todas as telas da cidade (8.096 de 8.098 — as duas de
  fora são de um prédio nosso); o problema era a hora. Medindo quatro dias: o material fica
  pronto às 23h10, a aprovação manual no portal sai entre 8h e 9h35 do dia seguinte, e a partir
  daí a automação leva menos de um minuto. As dez horas e meia de espera são humanas. Até essa
  aprovação acontecer, cada tela continua exibindo o card da véspera, com o dia da semana
  errado impresso.
- [telas] ✅ Com isso, o clima do dia seguinte já pode ser preparado antes da meia-noite: quem
  aprovar à noite dá às telas a noite inteira para sincronizar. Antes não adiantava aprovar
  cedo, porque o pedido só podia nascer depois da virada do dia.
- [telas] ✅ Feita uma consulta que responde **quais** telas receberam o card do dia, e não só
  quantas. Antes só existia o número agregado, então qualquer reclamação de prédio específico
  terminava em palpite. É ela que mostrou que a divergência entre prédios não nasce no pedido:
  nasce depois dele, na liberação do portal e na sincronização de cada aparelho.
- [telas] ✅ O alarme que avisa se o clima das 23h não foi preparado parou de depender de uma
  cota emprestada. Ele perguntava ao GitHub sem se identificar, e quem não se identifica
  divide um limite por endereço de internet com todos os vizinhos de servidor — em 11/09 foi
  recusado tendo feito duas perguntas na noite inteira, porque o limite já tinha sido gasto
  por terceiros. É o pior tipo de falha: não aparece em teste, aparece às 0h10, e o que quebra
  é justamente o alarme, não o clima. Agora a pergunta passa pelo nosso próprio sistema, que
  já se identifica para disparar o robô do clima — sem guardar uma segunda senha no n8n, que é
  onde a credencial errada já foi amarrada uma vez.

- [nfc] ✅ Serviço novo, do zero: as telas de elevador ganham etiqueta NFC e QR, e quem
  encosta o celular é levado ao destino do anúncio que está passando — com o clique contado
  para o anunciante. Já funcionando: o redirecionamento responde na hora e não depende de banco
  para funcionar, o clique é gravado depois sem guardar o IP de ninguém, exportação em planilha,
  e um painel ao vivo que mostra quais leitores biparam em qual comunicado.
- [nfc] ✅ Resolvida a questão que decidia o projeto: como um cartão fixo pode levar ao anúncio
  que está no ar naquele segundo. A etiqueta passa a apontar para a **tela**, não para o
  anúncio, e o serviço resolve a grade no momento do toque — a atribuição acontece no próprio
  clique em vez de ser remendada depois cruzando horário com relatório de exibição. Isso muda o
  que precisa ser perguntado ao fornecedor das etiquetas.
- [nfc] ✅ Montada a bancada de teste com leitor NFC de mesa, para testar sem subir em
  elevador, e um simulador de bipe. Bipe de teste nasce marcado como simulado e fica fora do
  relatório do cliente — senão cada demonstração inflaria o número que esse mesmo cliente
  recebe.

- [comercial] ✅ O simulador de tela em tamanho real ganhou o Totem 55", o modelo que fica
  apoiado no chão em vez de preso na parede. Foi mais trabalhoso do que parece: o arquivo que
  veio do design media 722 metros por causa de um erro de leitura da nossa ferramenta, o totem
  não abria em celular nenhum, e no iPhone a arte da tela saía errada. Tudo corrigido e
  conferido em aparelho. Falta só testar o totem na realidade aumentada de verdade, apontando
  para o chão.
- [comercial] ⏳ O modo foto do simulador (tirar a foto da parede com a tela no lugar) ficou
  para a versão 2.0 — registrado onde parou, para não se perder.

- [contratos] ✅ Revisada, antes de entregar, a auditoria das 700 linhas do controle de
  repasse: os valores dos contratos foram lidos de novo do zero, por um caminho independente,
  e conferidos com o controle campo a campo. Cinco valores estavam lidos errado e três
  condomínios apontados como "CNPJ divergente" não tinham divergência nenhuma. Os números do
  resumo foram refeitos com as correções.
- [contratos] ✅ Lido o lote novo de contratos — 2.702 documentos, todos legíveis — e cada um
  ligado à sua linha do controle pelo CNPJ do condomínio, já que os arquivos não têm nome que
  identifique. O lote serve como segunda fonte, independente das pastas do disco, e fechou 10
  das 22 pendências que tinham ficado da rodada anterior.
- [contratos] ✅ Entregue a revisão completa, separada pelo que precisa de decisão: 87
  condomínios recebendo menos do que o contrato manda (R$ 33.776,28 por mês), 103 recebendo
  mais (R$ 31.989,61 por mês), 19 linhas pagando sem contrato legível em nenhuma das fontes e
  951 condomínios com contrato assinado e repasse previsto que não têm linha nenhuma no
  controle — R$ 208.603,33 por mês, quase todos assinados em julho e agosto, que é exatamente
  onde o controle para. Das 699 linhas conferidas, 473 batem com o contrato e 190 divergem;
  175 dessas divergências foram confirmadas pelas duas fontes, e são as mais seguras para
  agir.
- [contratos] ✅ O achado mais direto: quatro aditivos assinados que o controle nunca aplicou —
  Chácara das Flores (paga R$ 50, devidos R$ 500), Edifício Dacon (R$ 800 / R$ 1.200), Plano &
  Vila Guilherme (R$ 100 / R$ 300) e Empresarial Cantareira (R$ 600 / R$ 700). São R$ 1.150
  por mês deixando de ser pagos, com o documento na mão.
- [contratos] ⏳ Em andamento: a conferência dos 710 pontos em que a primeira leitura e a
  releitura discordaram, cada um decidido com o trecho do contrato que sustenta a resposta. É
  o que separa erro de leitura de divergência real antes de qualquer cobrança.

**Pendências que atravessam pra semana 6:**

- Levar ao financeiro e ao comercial as decisões que saíram da revisão dos contratos: o que
  fazer com quem recebe a menos, com quem recebe a mais, e se os 951 condomínios com contrato
  assinado e sem linha no controle já estão ativos.
- Testar o Totem 55" em aparelho, na realidade aumentada, apontando para o chão (Android e
  iPhone) — é o único passo que não dá para conferir daqui.
- Decidir, com a operação, como encurtar as dez horas e meia entre o clima ficar pronto e
  alguém aprovar no portal. As saídas possíveis já estão levantadas, com o custo de cada uma; a
  escolha é da operação, não do código.
- Definir se a importação de leads por planilha sai da gaveta.

**Aprendizados / contexto que não pode se perder:**

- **O clima não pode ser gerado mais cedo que 22h.** A previsão que usamos entrega exatamente
  24 horas para frente, e o card precisa das 22h do dia seguinte — então o desenho não pode
  rodar antes disso. Não é escolha nossa, é limite de quem fornece o dado.
- **Só existem telas de 25" e 32" na conta de clima em São Paulo.** Três dos cinco materiais
  que o robô prepara toda noite não tocam em lugar nenhum.
- **Quando uma exibição termina, o sistema das telas zera a lista de telas que ela alcançou.**
  Comparar um dia no ar com um dia encerrado sem saber disso é comparar duas medidas
  diferentes — na primeira leitura pareceu que nenhum condomínio tinha recebido o card da
  véspera.

---

## Semana 6 — 14 a 18 de setembro de 2026

- [scan] ✅ Serviço novo, do zero, no ar em `focusmedia.com.br/scan`: quem está em campo aponta a
  câmera do celular para o código atrás da tela e recebe a ficha daquele equipamento — número de
  série, modelo e tamanho, em que situação ele está e desde quando, o percurso até a instalação
  (configuração, entrega, motorista, empresa que instalou), o chip, as manutenções e a
  movimentação. É uma página, não um aplicativo de loja: não se instala nada. Só consulta —
  cadastrar, dar manutenção e vincular continua no CRM. Antes, descobrir de quem era uma tela no
  hall de um prédio dependia de perguntar no grupo.
- [scan] ✅ A ficha tem dois níveis, e quem decide é o banco de dados, não a página: sem entrar,
  ela identifica o equipamento e diz que ele é nosso, com o contato de suporte, e não diz onde ele
  está. Onde a tela está, quanto custou e por onde passou é informação interna, para quem já vê o
  inventário no CRM.
- [scan] ✅ A entrada virou um código de acesso, um campo só. Em campo ninguém digita e-mail e
  senha de pé num hall, com uma mão no celular; o código é digitado uma vez por aparelho e a
  sessão fica. Quem tem conta própria no CRM continua entrando por ela, num link discreto embaixo.
- [scan] ✅ A página fala português, inglês e chinês, com a troca pelo globo no cabeçalho, e a
  escolha fica guardada no aparelho.
- [scan] ✅ A ficha sai do aparelho: um botão abre o compartilhamento do celular com a mesma ficha
  que está na tela, no idioma em que ela está sendo lida — para mandar ao executivo do prédio, ao
  grupo da operação ou ao laudo do fornecedor. No fim vai um link de volta ao app, para quem
  recebe consultar a ficha viva. Sem o compartilhamento (computador, navegador antigo) ela cai
  para a área de transferência e, por último, para um arquivo de texto.
- [scan] ✅ O visual foi refeito em torno da etiqueta que o CRM já imprime para cada prédio: a
  resposta da leitura é o gêmeo digital dela. Tela escura para a câmera não refletir na cara de
  quem está no hall, o número de série grande — é o que se confere caractere a caractere contra a
  etiqueta colada no equipamento — e a ação principal no rodapé, onde o polegar alcança.
- [scan] ✅ Do lado do CRM, a ficha exigiu seis campos que não existiam em lugar nenhum (código
  contábil, valor e moeda de importação, data da importação, data de configuração e motorista) e
  um ciclo de vida próprio, em oito estados, que separa "onde a tela está" do status que a aba
  Inventário já escrevia. Os quatro estados que o sistema não tem como deduzir — armazém de
  terceiro, devolução ao fornecedor, sucateamento e sucata — continuam sendo decisão registrada
  por uma pessoa, e nada os sobrescreve.

- [crm] ✅ O jurídico passou a poder editar o contrato em Word antes de mandar assinar. O contrato
  sempre saiu pronto do modelo, então contrato fora do padrão — uma cláusula negociada, uma
  exigência daquele condomínio — não tinha caminho: ou ia como o modelo mandava, ou o jurídico
  refazia por fora e o CRM perdia o rastro. Agora um botão gera o Word já preenchido com os dados
  do negócio, sem avisar ninguém e sem abrir processo de assinatura; o arquivo editado volta para
  o CRM, que guarda as versões e manda para assinatura a que for escolhida.
- [crm] ✅ O CRM parou de anexar o contrato antes de ele estar assinado. O sistema de assinatura
  avisa no instante em que a última assinatura fecha, e nesse instante ele ainda não montou o
  documento assinado: o que vinha era a versão anterior — PDF legítimo, mesmo nome, tamanho
  plausível e sem assinatura nenhuma. É o pior tipo de erro, porque ninguém confere um arquivo que
  já está no lugar certo com o nome certo. Agora o CRM só anexa depois de confirmar que o
  documento traz mesmo a assinatura; enquanto não trouxer, ele volta a buscar sozinho e substitui
  o arquivo errado no mesmo lugar — o que conserta também os que já tinham sido anexados errados.
- [crm] ✅ O contrato assinado deixou de ser anexado duas vezes. Quando dois avisos de assinatura
  chegavam quase juntos — e eles chegam, com décimos de segundo de diferença —, os dois anexavam:
  16 negócios estavam com o contrato em duplicidade. E contrato concluído sem link de download
  fazia o negócio avançar de etapa com a etiqueta "Assinado" e nenhum arquivo, sem registrar o
  motivo em lugar nenhum; agora todo desfecho que não seja "anexou" fica escrito no próprio
  negócio, e não num registro técnico onde o time do contrato nunca vai procurar.
- [crm] ✅ A lista de anexos passou a se atualizar sozinha. O contrato assinado não entra por
  alguém clicar em "Enviar" — ele chega pelo aviso do sistema de assinatura, ou é trocado depois
  pela varredura —, então quem estava com o negócio aberto continuava olhando o arquivo errado até
  apertar F5. Junto, a varredura passou a dizer **por que** falhou na frente de quem apertou o
  botão: "o sistema de assinatura recusou o download" e "falta a credencial" são providências
  completamente diferentes, e antes as duas apareciam como uma falha sem motivo.
- [crm] ✅ Os leads que já estavam no Pipeline BD passaram a aparecer na Prospecção. O módulo de
  prospecção nasceu depois do pipeline, então o BD abria a carteira dele e não via justamente os
  leads que mais trabalha. O espelhamento usa a mesma chave que evita contato repetido, guarda a
  data do card (e não a de hoje, senão seriam centenas de prospecções cadastradas no mesmo dia) e
  não conta duas vezes o esforço de quem já tinha registrado na mão.
- [crm] ✅ O espelhamento ficou restrito a quem ainda não fechou. O primeiro recorte pegava os
  7.464 cards vivos, dos quais 3.488 já eram negócio ganho — 5.880 contatos novos numa base que
  tem 770, entupindo de cliente uma aba que existe para trabalhar quem ainda não é. Agora entram
  só Contato Realizado e Proposta & Negociação: 3.975 cards, dos quais apenas 13 estão sem
  telefone, e-mail ou CNPJ. Card já espelhado que depois avança não perde o contato — ele foi
  prospectado de verdade, e o histórico tem que continuar contando.
- [crm] ✅ Card de quem já saiu da empresa vai para a base de frios. Eram 94 cards com responsável
  inativo, 63 de uma pessoa só; espelhados como estavam, nasceriam na carteira de quem não abre o
  CRM e, pior, numa situação que o resgate automático ignora de propósito — ficariam invisíveis
  para sempre. Agora nascem sem dono, aparecem na fila de resgate na hora e qualquer BD pega para
  si. Distribuir no sorteio foi descartado: metade desses cards é o mesmo interlocutor (94 cards
  para 44 telefones), e sorteá-los colocaria vários BDs ligando para a mesma pessoa, que é o
  problema que esse módulo existe para evitar.
- [crm] ✅ A tela do vínculo, que vazava para fora da janela e abria mostrando o fim da lista,
  ficou legível: os números apareciam cortados (243 virava "2") e o cartão da direita sumia.
- [crm] ✅ **O CRM mudou de casa na quinta, 17/09.** Ele rodava na plataforma onde foi criado, que
  era ao mesmo tempo o endereço, o banco de dados e o painel de publicação. Foram duas viradas na
  mesma janela, cada uma com volta atrás própria, fatiadas em etapas que se conferem uma a uma e
  com um ponto claro até onde ainda dava para desistir sem perder nada. O banco saiu de Oregon para
  São Paulo, e o e-mail e o Teams passaram a falar direto com os fornecedores, com credencial
  nossa: a do Teams era uma conexão guardada lá dentro, que morreria junto com a assinatura e não
  teria como ser recuperada. Terminada a virada, a plataforma antiga saiu também das instruções que
  o sistema dá ao time, dos apontamentos de publicação — que ainda mandariam qualquer publicação
  distraída para o projeto que não é mais a produção — e da descrição do site, que ainda se
  apresentava como "Lovable Generated Project".
- [crm] ✅ Anexos pararam de abrir logo depois da virada, e a causa vale como regra: a cópia do
  banco não trouxe as permissões dos arquivos. O arquivo estava lá e o registro apontava para ele,
  mas ninguém conseguia baixar. A ferramenta de cópia omite **em silêncio** as regras de acesso das
  tabelas que não pertencem a quem faz a cópia, e termina como se tivesse dado tudo certo: as 156
  regras da área principal vieram, as 4 dos arquivos não. Foi encontrado conferindo com uma sessão
  de usuário de verdade — a chave de administrador ignora as regras, então respondia bem o tempo
  todo e escondia o problema.
- [crm] ✅ A consulta de Números da Sorte, que dava erro em toda busca por CPF depois da virada,
  voltou: o banco de São Paulo tem uma trava contra apagar tabela inteira sem filtro que o de
  Oregon não tinha. Junto, foi reposta a proteção da função, que a cópia também perdeu — com a
  chave pública dava para emitir número da sorte para qualquer CPF, fora da auditoria. A
  documentação entregue a quem integra foi reapontada para o endereço novo.
- [crm] ✅ A tela de Comissões entrou em laço de recarga para um usuário na manhã de sexta — quatro
  recargas em quatro segundos, e sair e entrar de novo não resolvia. A página pedia um pedaço de
  código que não existe mais desde a publicação nova e recebia de volta a página inteira em vez de
  um "não encontrei", então ela se recarregava para tentar de novo, para sempre. Junto entrou uma
  limpeza, que roda uma vez por navegador, do que ficou guardado da época anterior em quem não
  abriu o sistema depois da virada — sem deslogar ninguém.
- [crm] ✅ O Pipeline não abria para os gestores: a tela ficava no esqueleto, e só para eles — 21
  pessoas. A consulta demorava de 4 a 17 segundos e o banco corta em 8, então era intermitente.
  A causa não era volume de dados: a regra de quem enxerga o quê era calculada uma vez por
  negócio — 8.445 vezes para devolver 191 —, quando o conjunto de pessoas que um gestor enxerga
  não muda de linha para linha. Calculado uma vez só, a consulta caiu de 3.887 para 14
  milissegundos. Conferido antes de aplicar, com a regra nova e a antiga devolvendo exatamente o
  mesmo conjunto para os 22 gestores.
- [crm] ✅ Os fluxos que recebem os leads foram reapontados para o banco novo. Eles rodam fora do
  repositório, e o que está guardado aqui é o que alguém importa quando precisa recriar um deles —
  deixá-los apontando para o banco antigo significava que a próxima importação desfaria a correção
  feita à mão, e o sintoma seria lead entrando num banco que ninguém lê, sem erro em lugar nenhum.

- [crm] ✅ Comunicado interno por mensagem direta no Teams, com aba própria em Configurações. Até
  agora o disparo só existia por dentro, chamado na mão. O envio tem duas etapas obrigatórias: a
  prévia resolve a lista no servidor e mostra quem receberia, e só então o botão de enviar libera —
  qualquer mexida na mensagem ou nos destinatários invalida a prévia. É proposital: comunicado
  disparado não tem como ser recolhido, e escolher por cargo só revelaria o alcance depois do
  envio. Só conta @focusmedia.com.br recebe, inclusive na escolha manual — quem cai fora aparece na
  prévia como excluído, para a ausência não passar por engano de seleção —, e a permissão nasce
  fora do perfil de administrador, concedida caso a caso pelo Super Admin.
- [crm] ✅ O executivo deixou de aprovar a própria comissão. A comissão de agosto de um executivo
  apareceu para a diretoria já com o selo "Aprovado" e o botão desabilitado: quem carimbou a
  assinatura da diretoria foi o próprio dono dela, com dois cliques seguidos, e a etapa da
  diretoria sumiu sem aviso. O caminho era curto demais para ser notado — a permissão vinha por
  padrão no perfil de administrador e o botão aparecia mesmo quando o período em foco era o da
  própria pessoa. Agora o sistema recusa o próprio período, a aprovação em lote pula o dono em vez
  de travar o time inteiro por causa de uma linha, e o que já tinha passado voltou para a fila.
- [crm] ✅ Aditivo assinado fora da janela de 30 dias passou a contar para a meta do BD sem ser
  comissionado — regra de negócio definida em 18/09. A janela já existia, mas como filtro de
  exclusão: o aditivo fora dela sumia da prévia inteira, não pagava e também não contava. Pior, o
  prédio "pai" já desconta do próprio total as telas dos aditivos, então essas telas não apareciam
  em lugar nenhum e o BD via o prédio encolher sem explicação. Como ninguém pode estranhar o zero,
  o aviso aparece em três alturas: o resumo no topo da aba, a marca "Só meta" na linha, dizendo
  quantos dias depois da instalação o aditivo foi assinado, e o mesmo aviso no PDF e no Excel que
  vão assinados para a diretoria. O painel de meta foi refeito, com a barra separando as telas que
  pagam das que só contam.
- [crm] ✅ A lista de aditivos pendentes ganhou filtro por fase e por responsável, com contador:
  antes vinha tudo junto, e não dava para saber quantos estão parados com o Jurídico e quantos
  esperam o executivo. Os filtros saem do que cada pessoa realmente enxerga, então um BD, que só
  recebe aditivo aguardando assinatura, não vê filtro nenhum.
- [crm] ✅ A geração do Word do contrato foi para a rota nova do fornecedor de assinatura, a mesma
  que o envio já usava, e parou de quebrar sozinha. Ela tinha começado a dar erro assim que o envio
  deixou de mandar as testemunhas: a rota antiga exige no corpo toda variável que o modelo declara,
  mesmo as que o documento não usa, então uma ponta quebrou e a outra seguiu funcionando. O que nos
  tinha levado para a rota antiga era uma medição certa e mal interpretada — a lista de signatários
  precisa existir vazia, não estar ausente. Agora as duas pontas mandam o mesmo conjunto de dados,
  e mudar o envio não pode mais derrubar a geração.
- [crm] ✅ Contrato com tela de projeto especial deixou de estourar erro cru ao gerar o Word e
  passou a dizer o que fazer. O modelo do fornecedor só aceita 25" e 32"; tamanho fora disso (55",
  70", totem) ele recusa. Não é regressão da virada: são 188 registros com tela especial e nenhum
  jamais teve contrato enviado. Mapear 55 para 32 seria pior que recusar, porque o número entra no
  corpo do contrato que o síndico assina — a mensagem aponta o caminho que existe hoje, que é subir
  a versão editada e mandar para assinatura.
- [crm] ✅ O CRM parou de gravar CPF que não é CPF. A tela mostrava os 11 primeiros dígitos bem
  formatados enquanto guardava o texto inteiro: um cadastro ficou com 29 dígitos no banco enquanto
  a tela mostrava um CPF certinho, e o número só apareceu na linha "Contato Oficial" de um
  contrato. Agora o cadastro recusa em vez de cortar — cortar grava um CPF errado com cara de
  certo, que é exatamente como isso passou despercebido — e a recusa mora também no servidor,
  porque a tela não é a única porta. No contrato, CPF incompleto sai em branco para o jurídico
  preencher à mão, em vez de um número inventado.
- [crm] ✅ Toda função de servidor passou a carimbar a própria versão na resposta, e existe agora um
  comando que compara o que está publicado com o que está no repositório. Um carimbo só não resolve
  — a metade que importa é a da tela, que avisa em amarelo quando a página e a função publicada
  discordam. A conferência já encontrou duas funções atrasadas em produção. Junto, a aprovação de
  comissão passou a dizer **por que** o e-mail não saiu: anexo grande demais e função sem
  republicar pedem providências opostas, e antes as duas apareciam como "Falha ao enviar o e-mail".

- [nfc] ✅ A leitura da etiqueta por aproximação passou a creditar o comunicado que estava na tela
  no instante da leitura, e não o que estiver no ar quando a pessoa tocar no aviso do celular. O
  iPhone lê a etiqueta, mostra um aviso e só abre o link quando a pessoa toca nele; com espaço de
  10 segundos por comunicado, essa espera atravessa a fronteira no caso comum — a pessoa vê o
  comunicado 1, demora 8 segundos para tocar, e o crédito ia para o comunicado 2. O teste de campo
  confirmou. Agora o instante da leitura viaja dentro do próprio endereço. Pelo QR o problema está
  resolvido sem depender de equipamento nenhum; por aproximação, depende de etiqueta regravável.
  Uma etiqueta que parasse de ser regravada creditaria o mesmo comunicado para sempre, então marca
  velha demais é ignorada e o serviço volta a usar o relógio.
- [crm] ✅ O ambiente de trabalho local virou um comando só. Quem clonava o repositório mexia no
  banco de produção sem saber, porque o atalho que aponta para o banco de teste não vinha junto.
- [crm] ✅ Corrigida a ordem das datas do percurso da tela, que saíam invertidas na ficha nova: a
  entrega no prédio aparecia antes de a tela existir no cadastro. A ordem certa é a que a operação
  segue — cadastra, entrega no prédio no dia seguinte, instala na data combinada com a empresa de
  elevadores.

- [comercial] ⏳ Prova de conceito da versão 2 do simulador de tela: em vez de entregar o modelo ao
  visualizador de realidade aumentada do Android e ao do iPhone, a cena passa a ser desenhada
  dentro da própria página. O motivo é a queixa de campo que nenhum dos dois deixa resolver —
  entortar o painel na parede. Desenhando aqui dentro, entortar deixa de ser possível, não só
  difícil: não existe caminho que aceite inclinação. Vêm junto os mesmos gestos nos dois aparelhos
  e o fim do arquivo separado para iPhone, que passa a receber o mesmo do Android.
- [comercial] ✅ Três rodadas de conserto em cima da prova de conceito, na semana: a câmera abria e
  o modelo nunca aparecia; os modelos ficaram sem brilho; o totem saía do tamanho de um dedo e
  depois absurdamente grande; e os painéis de parede se arrastavam junto com a câmera. A causa de
  fundo das duas últimas era a mesma e só apareceu na terceira rodada — a página rodava numa
  escala que não é em metros, então cada ajuste de mira trocava o sintoma sem corrigir nada. Ligada
  a escala real, ela exige que a pessoa mova o aparelho para frente e para trás nos primeiros
  segundos; por isso entrou um cartão que pede esse movimento, e nada é colocado na cena antes de
  a medida estar travada — colocar antes é colocar errado, por definição.
- [comercial] ⏳ A ressalva séria da versão 2 fica registrada: o motor não detecta parede. O chão é
  medido de verdade, então o totem sai exato; os painéis 25" e 32", que são o carro-chefe, dependem
  de uma parede deduzida — agora medida pelo pé dela, usando o chão. O diagnóstico na tela sempre
  diz de onde veio a medida, para estimativa não passar por medição. A licença do motor tem uma
  cláusula que precisa passar pelo jurídico antes de qualquer decisão de produto.

- [contratos] ✅ Fechada a releitura completa dos contratos, que atravessou da semana passada: os
  3.478 PDFs foram lidos do zero por um segundo caminho, independente do primeiro, e cada
  divergência foi julgada abrindo o contrato. Resultado: 414 células corrigidas uma a uma, 8.064
  corrigidas por regra (o mesmo erro repetido em muitos contratos) e 76 pontos que o documento não
  permite decidir sozinho, listados para decisão de gente. Os erros sistemáticos que a primeira
  leitura tinha deixado passar estão nomeados um a um — entre eles 2.150 linhas com o dia de
  operação da opção errada, 1.992 com o índice de reajuste cortado e 525 sem a multa que o
  contrato traz.
- [contratos] ✅ Cruzada a base dos contratos com o CRM: cada um dos 2.226 condomínios foi
  procurado pelo CNPJ e comparado em 20 campos. 770 batem, 780 batem mas faltam campos no CRM, 527
  têm divergência de cadastro, 143 têm divergência de dinheiro e 6 não têm negócio no CRM. Do
  outro lado, 370 negócios assinados ou instalados no CRM não têm contrato nenhum na base — são
  eles que precisam ser localizados.
- [contratos] ✅ Entregue a base v3, agora com o CRM como fonte da verdade: o valor do CRM
  prevalece onde ele existe e o contrato só preenche o que está em branco. Foram 1.479 valores
  substituídos e 2.371 campos vazios preenchidos, com uma aba listando cada troca e o porquê. A
  coluna "o que fazer" separa o trabalho: 987 para cadastrar, 539 sem repasse em dinheiro, 473 sem
  nada a fazer, 228 contratos a localizar, 115 a reduzir e o restante a aumentar ou conferir.

**Aprendizados / contexto que não pode se perder:**

- **Nenhum limite fixo de caracteres garante 10 segundos de fala.** O ritmo varia de 10,7 a 16,5
  caracteres por segundo conforme pontuação e pausas — um texto de 120 caracteres já estourou e um
  de 156 coube. Por isso o conserto foi acelerar levemente a fala, e não apertar o limite.
- **A plataforma onde o CRM roda hoje aplica mudança de banco de dados, mas não publica sozinha as
  funções de servidor.** Foi isso que deixou a consulta do /scan fora do ar mesmo com o código no
  lugar certo, e é a explicação de toda mensagem de "ação desconhecida" que aparece no CRM: a
  função publicada está mais velha que a página. Quando acontecer, é publicar as funções — não
  investigar o registro.
- **O motor de realidade aumentada da versão 2 não detecta parede.** Os dois interruptores de
  detecção de superfície são fixos e não há como ligá-los. Chão é medida; parede é dedução.
- **O aviso de "assinatura concluída" chega antes de o documento assinado existir.** Quem baixar
  no mesmo instante leva a versão sem assinatura, que é indistinguível da boa pelo nome e pelo
  tamanho. A diferença só aparece conferindo a assinatura dentro do arquivo.
- **A cópia de um banco omite em silêncio as regras de acesso que não pertencem a quem copia.** O
  processo termina limpo e o que falta só aparece quando alguém real tenta usar. Por isso a
  conferência de uma migração tem que ser feita com sessão de usuário comum: a chave de
  administrador ignora as regras e responde bem mesmo quando não há regra nenhuma.
- **O banco de São Paulo tem travas que o de Oregon não tinha.** A que apareceu proíbe apagar
  tabela inteira sem filtro. Código que funcionava há anos pode parar depois da mudança de casa
  sem ninguém ter mexido nele.

---

## Semana 7 — 21 a 25 de setembro de 2026

- [crm] ✅ **O Console de Agendamentos veio para dentro do CRM.** A operação agendava a instalação
  das telas num aplicativo à parte, que guardava tudo no navegador e não conversava com o CRM.
  Agora é uma área do próprio CRM, com seis telas — planilha, capacidade das equipes,
  acompanhamento do custo de elevador, insumos, relatório e configurações —, e o agendamento
  aparece também na ficha do prédio. A base foi trazida casando cada prédio do Console com o
  negócio do CRM: 1.906 de 1.972 (96,7%), 51 repetidos resolvidos e 15 sem par, quase todos
  torres que o Console separa e o CRM guarda como um prédio só. Onde as duas bases discordavam,
  valeu o Console, que é onde a equipe trabalha: 104 datas previstas e 127 agendadas corrigidas,
  cada troca anotada no histórico do prédio com o valor anterior. Prédio do Console sem par não
  virou negócio novo — encheria o Pipeline de prédio sem dono, que depois de contar em meta e
  relatório não tem como desfazer.
- [crm] ✅ Cada volta da equipe ao prédio passou a ter o próprio agendamento. Prédio instalado que
  volta a ter obra — aditivo, retirada, troca — não tinha onde guardar a data nova, e marcar a
  volta apagava a da instalação original: de 267 prédios de retorno, 264 mostravam como prevista
  a data da primeira instalação, a mais velha de 119 dias. A data da instalação original ficou
  intocada de propósito, porque ela é a data que conta em Comissões, dashboards e relatórios —
  cerca de 25 lugares do CRM. Na primeira versão, digitar a data do retorno ainda mexia nela em 56
  dos 57 prédios em Aditivo; isso foi fechado no mesmo dia, sem nenhuma data de card mudar.
- [crm] ✅ A data do agendamento e a do card passaram a ser a mesma, nos dois sentidos — pedido da
  operação ("se eu mudar em um lugar, tem que mudar no outro"). Junto vieram três defeitos que a
  investigação achou: a data agendada da planilha nunca chegava à grade de capacidade, a data
  prevista sumia da tela quando alguém preenchia outro campo primeiro, e o número de telas a
  instalar nascia zerado ou ficava velho (31 obras abertas discordavam do prédio, 20 mostrando
  zero).
- [crm] ✅ A capacidade das equipes passou a mostrar a carga de verdade. Ela olhava só a data
  agendada e escondia quase metade das obras — eram 292 agendadas e 268 só com data prevista —,
  então uma equipe com vinte obras previstas na terça aparecia com a terça livre. Agora a obra
  prevista ocupa o turno e barra quem tentar alocar em cima dela, com uma frase que diz qual obra
  está no caminho. A obra já concluída deixou de ocupar (os turnos "estourados" caíram de 104 para
  19, porque o resto era trabalho terminado); obra de 5 telas ou mais vira dia todo sozinha, com o
  número ajustável nas configurações; obra de vários dias ocupa a equipe em cada um deles, com a
  data de cada dia; e a grade passou a mostrar também os dias que já passaram, que apareciam
  vazios (em 21/09 houve 23 obras confirmadas e a tela mostrava zero).
- [crm] ✅ Um número certo que parecia errado: a capacidade mostrava 40 equipes ocupadas em 22/09
  e o Pipeline de Operações, 32 prédios agendados. Os dois estavam certos — a diferença eram 9
  equipes ocupadas só por data prevista, que o Pipeline ainda não conta como agendadas. O
  cabeçalho passou a dizer isso ("40 de 58 equipes ocupadas · 9 só por previsão"), e a obra
  agendada que ficou sem equipe ou sem turno, que sumia das contas, passou a ser listada à parte.
- [crm] ✅ Sugestões de encaixe: na linha de uma obra sem data, um botão responde "onde esta obra
  cabe?". A lista põe primeiro a equipe que já vai estar na mesma região naquele dia, depois a que
  já sai para outra região, e por último a que está livre o dia inteiro — encaixar uma obra
  pequena na tarde de quem já está no bairro custa uma parada, e num dia vazio custa a viagem.
  Cada sugestão diz quantos dias adianta ou atrasa em relação ao prazo, com a cor da faixa, e há
  um atalho "dentro do prazo". O cartão de cada dia passou a listar as equipes livres por nome e
  turno. Prédio sem fornecedor vê a agenda de todos.
- [crm] ✅ A planilha do agendamento ganhou os recortes que a operação pediu na semana: filtros com
  várias marcas e busca dentro do menu (são centenas de bairros), o modo "esconder marcados" para
  "todos menos Atlas, Otis e TKE", UF, período, equipes em ordem numérica (VTX-2 antes de VTX-10),
  a coluna "Na fila desde" com selo de novo nos primeiros 7 dias, o tempo previsto de
  acompanhamento na visão Agenda e a empresa de elevador em coluna própria. O recorte fica
  guardado ao trocar de tela e vai junto no link mandado por mensagem, e marcar um filtro parou de
  sacudir a tela.
- [crm] ✅ A fila passou a ter só o que é fila, dividida em instalações novas e retornos (636 e 214
  na terça). Saíram 321 prédios ainda pendentes que não chegaram ao agendamento. E 331 prédios,
  com 1.219 telas, voltavam como retorno sem ter nada para fazer: estavam marcados como
  instalados, mas ninguém tinha preenchido quantas telas foram confirmadas, e a conta tratava o
  contrato inteiro como pendente. Eles saíram da fila para um recorte "Falta confirmar telas", sem
  que nada afirme que estão completos. O rótulo "Aditivo" virou "Telas pendentes", porque de 535
  linhas com esse rótulo só 30 tinham o aditivo registrado.
- [crm] ✅ Custo e datas pararam de enganar. O custo digitado com ponto de milhar ("R$ 2.105,26")
  não era gravado, e a tela continuava mostrando o valor, então o aviso de "falta o custo" parecia
  o único errado quando era o único certo. Os custos passaram a aparecer com centavos, sem abreviar
  em "k". A data aceita ano de até seis dígitos (30/10/20006 chegava ao banco) e agendamento no
  passado passaram a ser recusados, e agendar leva a data prevista junto. A regra de não confirmar
  sem custo entrou na segunda e saiu na quinta: há empresa de elevador que só manda o custo depois
  da obra, e a trava deixava a obra sem confirmar por um dado que ainda não existe.
- [crm] ✅ Marcar a ordem de serviço como solicitada ou aprovada passou a assinar com quem está
  logado. O nome ficava em branco: das 1.972 linhas do Console, 1.231 tinham a marca e muitas sem
  autor. Desmarcar só apaga o nome se ele for o seu — muitas vezes é a única pista de quem tratou.
- [crm] ✅ Insumos cobrava o material oito vezes mais caro: R$ 1.200 por tela contra R$ 138 no
  Console, porque cobrava cada metro de fita como um rolo inteiro. Com a embalagem de cada item, a
  conta bate centavo por centavo com a do Console, e entraram quatro itens de limpeza e preparo que
  faltavam. Insumos e o acompanhamento de elevador ganharam período — a pergunta de compra é "o que
  vai ser usado este mês", e as abas só respondiam o total da fila — e passaram a contar as telas
  instaladas obra por obra: 230 instalações com custo aprovado (R$ 434 mil, 1.230 telas) estavam
  fora do acompanhamento de elevador. A aba de elevador ganhou também a lista de quem está sem
  custo, separada por situação.
- [crm] ✅ **O síndico recebe por e-mail a data da obra, e de novo quando ela muda.** Até aqui o
  aviso era feito à mão. Agora, ao agendar, sai um e-mail para o contato principal, o gerente
  predial e o zelador, com a lista da equipe autorizada do fornecedor anexada, cópia para a
  implantação, e o aviso de que as telas chegam antes para a portaria receber. Mudou a data ou a
  hora, vai um e-mail novo com a anterior; desmarcou, vai o de desmarcação; trocou a lista da
  equipe, quem já foi avisado recebe a nova. Depois do primeiro teste de verdade, o e-mail passou a
  dizer a hora combinada com a empresa de elevador em vez do horário padrão do turno — um quarto
  das obras tem hora própria. E, a pedido da operação, dá para avisar pela data prevista com
  "horário a confirmar", para as empresas que só marcam a hora na véspera. Tudo pode ser disparado
  também da própria planilha.
- [crm] ✅ A ficha do prédio separou o que o card andou do que a operação combinou. A importação
  do Console sozinha era mais da metade de todo o histórico, e a movimentação do card ficava
  enterrada debaixo de "data prevista" repetida dezenas de vezes. Agora são três listas: a
  movimentação do card em Atividades, o histórico da operação em Dados de Operações e as edições
  de cadastro onde sempre estiveram.
- [crm] ✅ A empresa de elevador virou uma lista fechada: os cards tinham 453 grafias diferentes
  para ela, e os 4.268 preenchidos foram convertidos para 283 nomes. Operações cadastra empresa
  nova nas configurações do agendamento. As regiões também saíram do código e passaram a ser
  editadas lá — abrir região nova virou rotina e não pode depender de pedido de ajuste.

- [crm] ✅ **O endereço do prédio passou a vir do CEP.** No cadastro de prédio novo, o executivo
  digita CEP, número e complemento, e rua, bairro, cidade e estado vêm dos Correios, sem
  digitação — é assim que endereço errado para de entrar. Com saídas para não travar ninguém: se
  a consulta estiver fora do ar, tudo volta a ser preenchível; CEP de cidade inteira libera rua e
  bairro. Na ficha já salva, digitar o CEP ou tocar na lupa traz o endereço de novo, para corrigir
  o que estava errado. E o card só passa para Confecção de Contrato com o CEP conferido.
- [crm] ✅ Conferência da base inteira pelo CEP, em Configurações: cada endereço gravado é comparado
  com o que os Correios dizem para aquele CEP, ignorando abreviação, acento e caixa ("AV DR
  ARNALDO" não é divergência). A correção é linha a linha, nunca em lote cego — quando CEP e
  endereço discordam, muitas vezes o errado é o CEP —, com filtro por etapa e por campo, e a
  prévia mostra exatamente o que vai ser gravado. Na quinta a base foi limpa: 5.356 prédios com
  espaço sobrando, grafias diferentes do mesmo bairro, acento e telefone padronizados, com cópia de
  segurança antes.
- [crm] ✅ O prédio assinado passou a ganhar coordenada sozinho, e aparece no mapa do Planejador. O
  serviço que faz isso existia desde junho, mas ninguém o chamava: 1.829 prédios esperavam e
  nenhum tinha sequer falhado. Uma aba nova lista os que ficaram sem coordenada e por quê — entre
  eles os que têm pino plausível e errado, 24 unidades de um cliente cadastradas sem rua, que caem
  no meio do bairro.

- [crm] ✅ O contrato parou de sair com o prazo e as telas errados. O gerador arredondava o prazo
  para a opção mais próxima que o modelo aceita — um contrato de 60 meses saiu dizendo 48, e são
  110 negócios de 60 meses — e cortava a lista de pontos de instalação em seis, porque o quadro do
  modelo tinha seis linhas: 15 contratos saíram assim, um deles com 6 pontos listados e o total de
  21 telas logo abaixo. Agora o que o modelo não comporta é recusado com o motivo e o caminho, em
  vez de aproximado.
- [crm] ✅ O fornecedor de assinatura ampliou o modelo a nosso pedido: o quadro de monitores foi
  para 70 linhas, entraram telas de 44", 55" e 70", e a multa por exclusividade virou campo
  preenchido por contrato, por tela, já sugerindo os R$ 10.000,00 de hoje. O modelo novo foi
  publicado entre 23 e 24/09 sem aviso, e a partir daí todo contrato novo voltava recusado; o CRM
  foi ajustado no mesmo dia, com 55" liberada (44" e 70" esperam a conferência da linha de total).
- [crm] ✅ Medido nos documentos reais: a linha "Total de Monitores Instalados" do contrato sai
  corrompida pelo próprio modelo do fornecedor, de formas diferentes conforme a data — entre 1º e
  22/09 foram 48 contratos para assinatura, 25 já assinados. O defeito se repete fora do CRM, com
  dados montados à mão.
- [crm] ✅ Uma quebra de linha nas observações fazia o modelo do fornecedor jogar fora a linha
  "Observações" inteira, sem erro. Foi assim que dois condomínios foram para assinatura sem a
  cláusula do repasse antecipado. Agora os parágrafos vão juntos numa linha só, e a tela avisa.
- [crm] ✅ As testemunhas do contrato passaram a ser achadas pelo nome que todo mundo usa. A lista
  só casava com o nome completo, que em 74 de 114 cadastros nem contém o nome de tela: digitando o
  nome conhecido, a pessoa aparecia em 40 casos, agora nos 114. Junto saiu um risco calado: trocar
  a testemunha mandava o pedido de assinatura para o e-mail da anterior. A lista também passou a
  dizer quem ela esconde por falta de CPF, e o campo de CPF parou de aceitar dígito além do 11º.
- [crm] ✅ A troca automática do contrato sem assinatura pelo assinado voltou a rodar: o
  agendamento dela não veio na mudança de casa de 17/09, e 21 contratos assinados esperavam.

- [crm] ✅ **Fechada uma leva de brechas de acesso que a mudança de casa tinha reaberto.** A cópia
  do banco repôs as permissões em bloco, por cima das restrições feitas ao longo do tempo: 168
  das 184 funções internas podiam ser chamadas sem login, inclusive as que guardam a credencial
  do Teams e o segredo das rotinas automáticas. Fechado e conferido em produção. Na mesma rodada:
  um aditivo em rascunho podia ser aplicado ao contrato por qualquer usuário logado; um admin
  conseguia se promover a super admin; um BD que abria pela busca o prédio de outro BD lia os
  anexos e o histórico dele; Operações conseguia alterar repasse, prazo, multa e dados bancários;
  o link público do formulário de cadastro valia para sempre (agora 30 dias); e trocar a senha não
  pedia a senha atual.
- [crm] ✅ A grade de permissões passou a valer também para TI e Financeiro no Pipeline BD: uma
  pessoa de TI com a edição liberada salvava a ficha e nada acontecia, sem erro.
- [crm] ✅ Exame de saúde diário, às 8h, que avisa por e-mail quando uma rotina automática falhou
  ou parou, quando a entrada de leads do WhatsApp fica muda por 24 horas em dia útil, quando uma
  função do banco fica aberta sem login, ou quando o que está publicado ficou atrás do
  repositório. Junto, a conferência a cada envio de código e o aviso de que o banco de produção
  ficou atrás. A primeira rodada do exame já achou um prédio sendo reenviado ao Google a cada 10
  minutos por causa de um caractere invisível no bairro.
- [crm] ✅ A sincronização diária com o Mural não rodava desde a mudança de casa, e o painel dizia
  "sucesso" todo dia — sucesso ali só quer dizer que o pedido foi feito. Quem sincronizava era o
  botão da tela. Voltou, e na primeira rodada criou 4 vínculos novos.

- [crm] ✅ A busca do topo ficou rápida e parou de trazer prédio sem relação: cada tecla varria a
  base inteira e o resultado vinha sem ordem nenhuma, então o prédio de nome exato ficava fora
  enquanto oito casamentos fracos de endereço ocupavam a lista. O CNPJ digitado com pontuação
  também passou a ser achado.
- [crm] ✅ Sete listas voltaram a vir completas: o banco devolve no máximo 1.000 linhas por pedido e
  não avisa. Contratos Ativos mostrava 1.000 dos 2.016 ativados, com os totais errados; a base da
  Prospecção, 1.000 de 6.298 contatos. A exportação do Pipeline saía com a coluna "Último
  comentário" em branco sem aviso, pelo mesmo tipo de limite, e o erro das exportações passou a
  dizer o motivo em vez de "Erro desconhecido".
- [crm] ✅ Um pacote de velocidade: a tela de Relatórios baixava 30 MB a cada abertura e agora
  baixa 5; os selos dos cards de um BD caíram de 6,4 s para 0,2 s; o histórico do prédio mais
  movimentado deixou de ler as 77 mil linhas da tabela; e o mapa do Planejador parou de recriar
  todos os pinos a cada tecla. O mapa ganhou duas formas de desenhar os 2.880 prédios, em pontos
  ou agrupados, para comparar e ficar com uma.
- [crm] ✅ Uma faixa avisa quando a aba ficou aberta na versão anterior do CRM. A operação deixa o
  sistema aberto o dia inteiro, e na terça uma aba da véspera tentava gravar o agendamento do jeito
  antigo e recebia um erro técnico que ninguém liga a "recarregue a página".

- [crm] ✅ **O Financeiro ganhou o módulo Repasse**: para cada contrato assinado ou instalado, o
  que ainda falta para conseguir pagar — valor, forma de pagamento, conta ou PIX, titular,
  documento do titular, contrato assinado no CRM e CNPJ do condomínio —, com o motivo de cada
  pendência e exportação em planilha. O módulo cruza cada contrato com o acervo da Eliex pelo
  CNPJ e lê do texto da cláusula de pagamento o valor, o vencimento e o índice de reajuste: o
  valor bate com o do CRM em 1.407 de 1.433 contratos (98%), e onde diverge a tela avisa.
- [crm] ✅ A comissão do gerente sênior repetia os meses já fechados: setembro somava julho e agosto
  e dava 3.518 telas e R$ 28.637,00, quando eram 896 telas e R$ 7.476,00. De setembro em diante
  ela também separa o que o sênior assina do que o time assina, cada um com o seu valor por tela, e
  a meta dele passa a ser a soma das metas dos BDs da estrutura. Os meses anteriores não mudam.
- [crm] ✅ A proposta comercial em Excel passou a sair no formato do "Resumo Proposta" — uma linha
  por praça e tipo de prédio, com os totais — e abre sem o aviso de arquivo corrompido. O mapa do
  PDF mostrava só 250 dos prédios (numa proposta de 1.908, um oitavo); agora mostra todos, e a
  última página ganhou o bloco de assinaturas "De acordo" para o cliente e para a Focus.
- [crm] ✅ Um prédio pode ser marcado como não comercializável: instalado e no ar, mas fora da
  venda. Ele sai do Planejador e das substituições, e as propostas já autorizadas passam a
  oferecer a troca. Só admin mexe, e fica registrado quem tirou e quando.
- [crm] ✅ Menores, pedidos no uso: a planilha da Logística diz quem é o fornecedor e o executivo de
  cada prédio; a tela bipada no leitor de código de barras entra na hora, e o prédio ganhou a linha
  do tempo das telas que passaram por ele; a lista de Restrição ganhou ação em lote para
  adicionar e remover; telefone, CNPJ, agência e conta ganharam máscara na digitação; as
  Notificações filtram por tipo; o pedido de desinstalação avisa só Operações; e o cancelamento do
  aditivo, que abria abaixo da borda da tela em notebook, voltou a aparecer.
- [crm] ✅ A ficha do edifício ganhou o bloco "Acesso ao MURAL", onde se incluem outras pessoas
  além do síndico; o Mural cria a conta e manda o acesso a cada uma.
- [crm] ⏳ Escritos 44 avisos das novidades de 19 a 25/09 para o pop-up de atualizações do CRM,
  todos desligados: falta escolher quais vão ao ar. Daqui em diante, toda entrega visível já nasce
  com o seu aviso, desligado.

- [whatsapp] ✅ O atendimento do WhatsApp que a triagem transfere para Suporte ou Marketing passou a
  avisar o time no Teams, por mensagem direta, com o contato, o resumo que a IA escreveu e o link
  da conversa. Antes a conversa mudava de fila e ninguém ficava sabendo. Quem recebe é escolhido
  no próprio fluxo, para trocar gente do time sem mexer no CRM.

- [telas] ✅ As notícias do dia passaram a ser divididas em packs, um por faixa de horário, em vez
  de quatro notícias revezando do começo ao fim do dia. A direção quer notícia nova de duas em duas
  horas: um botão monta a grade assim, o dia comporta até doze packs, e cada troca pode ser
  ajustada no minuto. A programação tem linha do tempo com o "agora", arrastar notícia entre packs,
  agenda até seis dias à frente, tamanho de 1 a 4 notícias por pack e gravação sozinha, sem botão
  de salvar. Pack sem notícia aprovada não deixa a tela vazia: fica o anterior.
- [telas] ✅ Notícia já enviada pode ser tirada do pack, para abrir vaga a uma notícia urgente. E
  cada notícia passou a dizer em que pé está — subindo, esperando aprovação no portal, aprovada e
  entra às 16h, no ar —, com o resumo de quantas esperam aprovação em destaque. Antes o status era
  texto corrido no rodapé.
- [telas] ⏳ Montado um teste, em produção, para saber se a notícia consegue ir à tela sem o ciclo
  manual de liberação e publicação no portal, que é o que hoje segura a troca. O teste é isolado,
  num prédio escolhido, para não trocar as notícias da cidade inteira. Falta o resultado.
- [telas] ✅ O vídeo do clima passou a sair com 10 segundos exatos; saía com 10,08.

- [contratos] ✅ Comparado o que a Eliex entrega com a base de contratos: 2.421 documentos baixados
  em 23/09 e ligados à base pelo CNPJ. Os dados de identificação vêm quase perfeitos (CNPJ, razão
  social, endereço), e valor, vencimento, multas e prazo só vêm dentro do texto da cláusula — e,
  quando vêm, batem. Não vêm de jeito nenhum: representante legal e CPF, dados bancários (só em 25
  documentos), e-mail e telefone, e o PDF. E de 192 aditivos, só 1 está ligado ao contrato que ele
  altera, então o "contrato consolidado com aditivos" não funciona na prática.
- [contratos] ✅ Montado o pacote de casos para a Eliex corrigir: 18 condomínios em quatro grupos —
  contrato sem nenhuma cláusula lida, Quadro Resumo não lido, aditivo solto e, para comparação,
  casos lidos corretamente —, com cada campo, o valor que está no PDF, a página em que ele está e o
  que a Eliex devolveu. Numa amostra de 150 contratos, 9 (6%) vieram sem nenhuma cláusula.

- [smb-ooh] ✅ O protótipo ganhou "Minhas campanhas": o que o anunciante vê depois de comprar. O
  pedido anda por pagamento, criativo, aprovação, no ar e concluída, e a campanha no ar mostra as
  exibições entregues dia a dia contra o contratado, por prédio. Ainda é demonstração, rodando só
  no navegador: os passos que no produto acontecem fora da tela (o banco confirmando o Pix, a
  operação aprovando a arte, os dias passando) são botões de simulação, separados da interface
  para não serem confundidos com ela.

**Pendências que atravessam pra semana 8:**

- Escolher quais dos 44 avisos de novidade do CRM vão para o pop-up.
- Decidir entre pontos e agrupado no mapa do Planejador — fica um dos dois.
- Levar ao fornecedor de assinatura a linha "Total de Monitores Instalados" corrompida, e decidir
  o que fazer com os 25 contratos já assinados assim. Confirmar com ele o nome do campo da multa
  de exclusividade e liberar 44" e 70" depois de conferir a linha de total.
- Tratar os dois contratos que foram para assinatura sem a cláusula do repasse antecipado.
- Colher o resultado do teste de notícia sem o ciclo manual do portal.
- Mandar à Eliex o pacote de casos e acompanhar a correção.

**Aprendizados / contexto que não pode se perder:**

- **Varredura que corta no meio e anda sempre na mesma ordem deixa de fora sempre os mesmos.**
  Apareceu duas vezes na semana, em lugares diferentes: a conferência dos prédios de acordo do
  Mural (um terço nunca olhado) e a leitura do CRM pelo Mural (460 prédios nunca lidos, os mais
  novos entre eles). Nos dois casos o conserto foi o mesmo: quem foi visto há mais tempo vai
  primeiro.
- **O banco devolve no máximo 1.000 linhas por pedido, e não avisa.** A lista simplesmente para
  ali, com cara de completa. Foi a causa de sete listas incompletas e de parte da exportação em
  branco. Toda lista que pode passar de mil precisa buscar em páginas.
- **"Sucesso" numa rotina agendada quer dizer que o pedido saiu, não que deu certo.** A
  sincronização com o Mural ficou oito dias recusada com o painel dizendo "sucesso" todo dia.
- **A mudança de casa do banco repôs as permissões por cima das restrições.** Depois da lição da
  semana 6 (a cópia perdeu as permissões dos arquivos), veio o contrário: aqui ela devolveu acesso
  que tinha sido tirado. Migração de banco pede conferência de permissão nos dois sentidos — o que
  faltou e o que sobrou.
- **A data de instalação original é a data da comissão.** Ela aparece em cerca de 25 lugares do
  CRM; nenhum agendamento de retorno pode encostar nela.
- **O modelo do fornecedor de assinatura muda sem aviso, e erra sem erro.** O modelo novo foi
  publicado sem comunicar, e uma quebra de linha nas observações some com a linha inteira
  respondendo "tudo certo". Existe agora uma conferência que mede o modelo publicado e compara com
  o que o CRM espera.
- **A troca das notícias só chega à tela depois da publicação no portal.** A troca de pack não vai
  sozinha para as telas; é por isso que existe o teste de ir à tela sem o ciclo manual.

---

## Semana 8 — 28 de setembro a 2 de outubro de 2026

- [crm] ✅ **O Repasse substituiu a planilha de controle do Financeiro.** Os pagamentos aos
  condomínios eram controlados numa planilha com a célula pintada de verde à mão. Agora o módulo
  tem três abas sobre a mesma base: "Pagar no mês" (as parcelas do mês e as vencidas sem baixa,
  com os dados bancários prontos para copiar, baixa de várias de uma vez e planilha), "Mapa de
  parcelas" (a grade condomínio × mês, pintada sozinha, mostrando quem deu cada baixa) e
  "Cadastro" (o que falta para pagar, agora editável). O calendário segue as regras da planilha.
- [crm] ✅ Ajustes do calendário pedidos pelo Financeiro: cada período passou a ser pago no mês
  seguinte a ele, e não adiantado; pagamento parcial fica em aberto pelo que falta; parcela
  avulsa, fora do calendário, pode ser lançada; parcela que não vai ser cobrada pode ser
  dispensada, com o motivo; e dois filtros novos acham quem está sem dados bancários e sem forma
  de pagamento.
- [crm] ✅ **Os comprovantes do banco dão baixa sozinhos.** O Financeiro recebe do banco um PDF por
  lote, uma página por comprovante, com repasse misturado a fornecedor, conta de consumo e
  salário. Agora ele sobe os PDFs no Repasse e o sistema lê página por página, acha o condomínio
  pelo CNPJ ou pela conta e dá a baixa quando não há dúvida — um registro, parcela em aberto com o
  mesmo valor. O resto vai para "Precisam de você", com o motivo. Comprovante repetido é barrado,
  cada baixa guarda o comprovante, e a leitura acontece no servidor, sem depender de alguém
  deixar a tela aberta. Lê os modelos do HSBC e do Itaú (PIX e transferência). Testado com dois
  lotes reais, 44 páginas.
- [crm] ✅ **O Repasse lê o próprio contrato.** Do PDF anexado ao prédio e do texto que a Eliex
  guarda, ele tira valor, titular, banco, conta, PIX, periodicidade, dia e forma de pagamento — e
  o aditivo mais novo vale por cima do contrato. Preenche sozinho só o que está vazio. A aba nova
  "Contrato × CRM" lista, campo a campo, onde o cadastro não bate com o contrato, com o PDF a um
  clique, e o Financeiro escolhe "usar o do contrato" ou "o CRM está certo". O valor mensal passou
  a ser editável pelo Financeiro.
- [crm] ✅ A base de contratos foi conferida contra o Repasse: 188 campos vazios preenchidos em 78
  registros, e 166 divergências numa planilha para o Financeiro decidir, sem mexer em nada. Nove
  linhas da base que não eram confirmadas pelo CNPJ foram desfeitas (uma juntava dois Edifícios
  Madrid diferentes e tinha gravado o valor e a conta de um no outro).
- [crm] ✅ Lidos na Eliex os contratos dos registros que estavam sem valor de repasse: 242 eram
  contrato sem repasse em dinheiro — a contrapartida ao condomínio é a exibição dos comunicados
  dele nas telas — e foram marcados assim. O "valor não lido" do modelo novo de contrato era,
  quase sempre, isso.
- [crm] ✅ A conferência com o Console de Agendamentos tinha empurrado a data de instalação de 69
  prédios para frente em 21/09 (um deles de 18/06 para 11/08), e o repasse, que conta a partir da
  instalação, perdeu as primeiras parcelas. As datas de 39 prédios com repasse foram devolvidas,
  e a conferência não mexe mais em prédio já instalado.

- [crm] ✅ **Corrigidos 20 prédios ligados ao condomínio errado no Mural.** O CRM ligava o prédio
  das telas ao condomínio pelo nome e pelo endereço, e as duas provas falhavam juntas: o nome
  perde as palavras genéricas ("Condomínio do Edifício Marambaia" e "Residencial Marambaia" viram
  a mesma coisa) e o endereço do Mural é cópia do próprio CRM, então um vínculo errado se
  confirmava sozinho no dia seguinte. O Mural puxou o endereço e o síndico do condomínio errado,
  e três síndicos chegaram a publicar nas telas de outro prédio. Cada vínculo voltou ao dono, e
  agora só se liga sozinho o que o sistema das telas confirma — cidade, número de telas e dia da
  instalação. Testado contra a base inteira: mantém os 1.727 vínculos certos, não repete nenhum
  dos 22 errados e liga 15 prédios que antes ficavam sem.
- [crm] ✅ O aditivo passou a partir do contrato e a guardar onde cada tela vai. Ele abria a partir
  da lista de locais do prédio, que em 110 de 255 prédios com aditivo estava atrás do contrato —
  num deles o aditivo saiu com duas telas a mais. Os 99 prédios com lista incompleta foram
  completados sem mudar nenhum contrato.

- [crm] ✅ **O BD pede cartão de visita ao Marketing pelo CRM.** Tela nova com o formulário já
  preenchido com os dados da pessoa e a prévia do cartão. O pedido vira uma aprovação no Teams
  para o Marketing e um e-mail com o cartão montado; quando o Marketing aprova ou recusa, quem
  pediu é avisado no sininho e no Teams, com o comentário. Ajustado no mesmo dia com o Marketing:
  a quantidade saiu do formulário (é decisão deles), ficou claro o que vai impresso e o que é só
  recado, e a tela diz o prazo — pedido até o dia 20 chega no mês seguinte.

- [crm] ✅ Com os prédios residenciais passando a receber só telas de 25" (o estoque de 32" está
  baixo — 434 prédios trocados, com volta possível pelas Configurações), o tamanho deixou de dizer
  se a tela vai no elevador ou no hall. Tudo que usava o tamanho como pista passou a usar o local
  de cada tela: a Logística ganhou as colunas Elevador e Área comum, o Inventário e a etiqueta do
  kit dizem onde cada tela vai, o tempo previsto da obra conta 20 minutos no elevador e 30 no hall
  (367 de 706 obras abertas estavam com o tempo errado), e o material separado por tela também
  (7.619 telas de 25" no hall estavam recebendo material de elevador). A Logística ganhou a aba
  Insumos, com a mesma calculadora do Agendamento.
- [crm] ✅ O custo do elevador já vem calculado pela tabela de cada empresa (ATLAS, TKE e OTIS),
  editável nas Configurações, e a ficha do prédio mostra a conta.
- [crm] ✅ Aviso ao síndico, três ajustes pedidos pela operação: trocar a empresa instaladora de
  uma obra já avisada manda o aviso de "nova empresa responsável", com a lista de quem vai; a hora
  agendada passa a mandar no e-mail (um prédio reagendado para as 19h recebeu "a partir das 9h"
  porque o turno dizia "dia todo"); e preencher a data prevista pode avisar o síndico sozinho,
  com um interruptor nas Configurações, desligado. O histórico de quem mexeu no agendamento
  também passou a levar o nome certo (75 linhas antigas corrigidas).
- [crm] ✅ Menores: o perfil de cada pessoa virou um selo colorido e legível, também no menu
  lateral; a busca do topo mostra o nome inteiro do condomínio e destaca o que foi digitado; o
  Relacionamento passou a ver o código das telas de cada prédio; e gerente, zelador,
  administradora e taxa de condomínio deixaram de ser obrigatórios no cadastro do prédio.
- [crm] ✅ Do time, na mesma semana: o CRM ganhou um padrão visual único em todas as telas; o
  cadastro de cliente e agência se preenche sozinho pelo CNPJ, e só aceita empresa ativa na
  Receita; usuário novo voltou a aparecer na Gestão de Usuários; a conferência de CEP passou a
  rodar sozinha; o registro do prédio mostra as telas e os chips que estão nele; e a comissão
  parou de perder tela em aditivo de troca de tamanho e de contar prédio arquivado depois de
  assinado.

- [smb-ooh] ✅ **O marketplace de mídia OOH virou projeto próprio.** Vitrine montada com os
  prédios e as telas de verdade, preço que muda conforme a escolha, assistente que monta o plano
  de mídia e o caminho da compra até o fim, ainda em modo demonstração. Do lado do CRM, saiu o
  canal que entrega ao marketplace os prédios e as regras de preço, com chave de acesso.

- [telas] ✅ Três falhas das notícias, achadas no uso e corrigidas no mesmo dia. Em 01/10, a
  rotina que leva as notícias para análise deixou de enxergar os envios do dia (só olhava os 200
  primeiros da pasta, os mais velhos) e respondeu "tudo certo" a manhã inteira; agora ela
  dispara erro quando um envio fica para trás, e o painel mostra a notícia como "Atrasada", em
  vermelho. No mesmo dia, dezesseis notícias aprovadas juntas fizeram duas execuções correrem ao
  mesmo tempo e uma apagar o trabalho da outra — o Pack 2 foi ao ar com uma notícia em vez de
  quatro; agora a programação se refaz a partir do que foi enviado. Em 02/10, três programações
  abriram no mesmo dia; agora a do dia é reservada antes, e o painel mostra quando o portal está
  travado esperando liberação.

- [whatsapp] ✅ Quem chama no WhatsApp querendo anunciar, perguntar preço ou falar com o comercial
  deixou de passar por perguntas: o bot responde na hora com o WhatsApp do time comercial. No ar
  desde 02/10.
- [whatsapp] ⏳ Pronta e desligada a opção "Acelera Síndico" no menu do bot: quem pergunta sobre o
  Acelera Síndico ou os números da sorte vai direto para a Fernanda Serra, no Marketing, avisada
  no Teams, e o contato ganha a etiqueta. Liga com um comando quando for decidido.

- [scan] ✅ O Focus Scan voltou a responder. Depois da mudança de casa do CRM, ele continuava
  consultando o endereço antigo, que saiu do ar.

**Pendências que atravessam pra semana 9:**

- Escolher quais avisos de novidade do CRM vão para o pop-up — os 44 de 19 a 25/09 e os que
  nasceram desligados nesta semana.
- Decidir entre pontos e agrupado no mapa do Planejador — fica um dos dois.
- Levar ao fornecedor de assinatura a linha "Total de Monitores Instalados" corrompida, e decidir
  o que fazer com os 25 contratos já assinados assim. Confirmar com ele o nome do campo da multa
  de exclusividade e liberar 44" e 70" depois de conferir a linha de total.
- Tratar os dois contratos que foram para assinatura sem a cláusula do repasse antecipado.
- Colher o resultado do teste de notícia sem o ciclo manual do portal.
- Mandar à Eliex o pacote de casos e acompanhar a correção.
- Financeiro decidir as 166 divergências da base de contratos e conferir no contrato as 9 linhas
  sem CNPJ confirmado.
- Trazer para o Repasse as baixas antigas da planilha de controle — falta a versão atual dela.
- Decidir quando ligar o "Acelera Síndico" no bot do WhatsApp.

**Aprendizados / contexto que não pode se perder:**

- **Prova que é cópia não prova nada.** O endereço do Mural vem do CRM, então usá-lo para
  confirmar um vínculo do CRM é perguntar a resposta para quem a escreveu. A confirmação tem que
  vir de uma fonte independente — no caso, o sistema das telas.
- **Fila que anda um por vez transforma falha passageira em atraso de horas.** Onze comunicados
  presos por quinze minutos viraram seis horas de espera porque a fila soltava um a cada meia
  hora.
- **Lista lida em ordem crescente com limite enxerga só os velhos.** É o mesmo problema das 1.000
  linhas da semana 7, com outra cara: quando a pasta passou de 200 itens, a rotina das notícias
  só via os envios já encerrados.
- **Quando uma regra muda, tudo que usava aquilo como pista quebra junto.** A troca das telas de
  32" por 25" mexeu no tempo de obra, no material separado e na Logística, que usavam o tamanho
  para saber o local.

---

## Semana 9 — 5 a 9 de outubro de 2026

- [crm] ✅ **A planilha de campanhas do Comercial veio para dentro do CRM** (Controle Comercial).
  Substitui a planilha de controle e o painel que dependia dela, com dashboard, comparativo
  mensal, clientes, financeiro e PIs, pendências e campanhas, seguindo as mesmas regras da
  planilha. Cada executivo vê só a própria carteira, e um botão importa a planilha para a
  transição.
- [crm] ✅ O PI passou a ficar anexado na própria campanha, em vez de num link do SharePoint, e o
  CRM lê do PDF quem é o cliente, quem é a agência e o número do pedido, ligando ao cadastro ou
  criando com os dados da Receita. Dá para mandar os PIs das campanhas antigas de uma vez.
- [crm] ✅ Com a campanha completa, o botão "Faturar" manda os dados e o PI ao Financeiro por
  e-mail, com cópia para o Comercial, e marca a campanha como enviada — a regra que era feita à
  mão na planilha.
- [crm] ✅ O comparativo mensal sai como apresentação pronta, no modelo do Comercial: os mesmos 14
  slides, com os números do mês contra o anterior e os títulos escritos a partir deles, para
  revisar antes de baixar. As tabelas do Controle Comercial também passaram a caber na tela, sem
  rolar para o lado.
- [crm] ✅ O formulário de cadastro do prédio passou a pedir os dados bancários, todos
  obrigatórios. Eles completam o Repasse só onde está vazio: como o link é público, quem o tem não
  consegue trocar uma conta que o Financeiro já paga.
- [crm] ✅ No Agendamento, preencher uma data agendada vazia abre data e hora juntas. Antes a hora
  ficava 9h e, para acertar depois, era preciso reagendar com motivo.

- [telas] ✅ A notícia da manhã voltou a sair. Em 05/10, como em 02/10, a publicação da manhã saiu
  sem notícia: o portal travou entre a aprovação e o pedido de exibição. Agora o pedido nasce
  antes da aprovação, dez minutos antes de a notícia ir para análise, e as aprovadas entram
  juntas segundos depois. No mesmo dia, uma notícia do pack 4 foi ao ar no horário do pack 1;
  agora só o pack da hora, ou um anterior, pode estar no ar.
