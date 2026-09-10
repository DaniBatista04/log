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

## Prod

<https://log-delta-rouge.vercel.app> — a Vercel publica a partir do `main`, então o que está
commitado é o que está no ar.

Se o link não abrir na rede do escritório, o problema não é o deploy: o **UDM bloqueia a zona
`vercel.app`**. O tráfego para os IPs da Vercel passa normalmente — batendo direto no IP com o
Host certo, o site responde 200. É só o nome que é barrado, e vale para qualquer projeto em
`vercel.app` (o `pages.dev` também está na lista; `netlify.app` e `workers.dev` não).

O bloqueio é local do UDM, não do provedor. O que prova isso é a flag `AA` da resposta: para um
domínio que realmente não existe, o UDM devolve `NXDOMAIN` com o SOA da zona na seção de
autoridade e **sem** `AA`, como todo resolver que encaminha; para `vercel.app` ele devolve
`NXDOMAIN` autoritativo (`AA` marcado), sem SOA e sem nenhum registro. Resolver que só encaminha
não marca `AA` — essa negativa é fabricada na caixa.

Como confirmar em vez de adivinhar:

```bash
# o site está de pé?
curl -s -o /dev/null -w '%{http_code}\n' \
  --resolve log-delta-rouge.vercel.app:443:64.29.17.2 \
  https://log-delta-rouge.vercel.app/

# quem está barrando o nome?
python3 -c "
import socket,struct
def q(srv,n):
    p=struct.pack('>HHHHHH',1,0x0100,1,0,0,0)
    for x in n.split('.'): p+=bytes([len(x)])+x.encode()
    p+=b'\x00'+struct.pack('>HH',1,1)
    s=socket.socket(socket.AF_INET,socket.SOCK_DGRAM); s.settimeout(5)
    s.sendto(p,(srv,53)); d,_=s.recvfrom(4096); s.close()
    fl=struct.unpack('>H',d[2:4])[0]
    return f\"{srv:<16} rcode={fl&0xF} AA={bool(fl&0x0400)} an={struct.unpack('>H',d[6:8])[0]}\"
for srv in ('192.168.2.1','8.8.8.8','1.1.1.1'):
    print(q(srv,'log-delta-rouge.vercel.app'))
"
```

Se o `curl` devolve 200 e o navegador não abre, é DNS. Se o UDM responde `rcode=3 AA=True`
enquanto os públicos respondem `rcode=0`, o bloqueio está no UniFi: liberar o domínio lá resolve
para todo mundo na rede de uma vez, e é melhor que trocar o DNS máquina por máquina — quem
aponta para `1.1.1.1` na mão perde o EDNS Client Subnet e passa a ter problema com CDN que faz
GeoDNS.

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
