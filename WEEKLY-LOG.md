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

**Pendências que atravessam pra semana 6:**

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
