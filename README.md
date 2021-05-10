# Česko.Digital Glue Scripts™

Sbírka serverových skriptů pro různé menší úkoly.

## Instalace a vývoj

- Nasazuje se jako [serverless funkce ve Vercel](https://vercel.com/docs/v2/serverless-functions/introduction). K vývoji se hodí mít [Vercel CLI](https://vercel.com/cli).
- Projekt je v [Node.js](https://nodejs.org/). Potřebná verze Node.js se odvíjí od toho, [jakou zrovna používá Vercel](https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-version).
- Je potřeba mít [yarn](https://yarnpkg.com/getting-started/install) a [TypeScript](https://www.typescriptlang.org/).
- Závislosti se instalují `yarn`
- Vývojový server se spouští `vercel dev`

## Ukázková serverless funkce

Jednoduchá prezentace serverless funkcí ve Vercelu, viz https://tools.cesko.dev/api/hello.

## Seznam uživatelů ve Slacku

Občas se nám hodí uložit seznam uživatelů v nějakém slackovém kanálu. Je na to funkce přímo ve Slacku (`/who` nebo Details → Members), ale výstupy z ní nejdou snadno uložit. Skript [list-users](https://tools.cesko.dev/list-users) tedy zobrazí seznam uživatelů ve vybraném kanálu ve formátu CSV, který lze pak snadno importovat třeba do Google Sheets nebo Excelu.

## Api.store proxy

Proxy pro https://www.api.store/, využito z www.nedluzimstatu.cz pro překlad adres na kontaktní údaje orgánů veřejné moci. Povolené dotazy jsou pro API `/spadovost` vč. povinného query string `kod_obce=123456` nebo `kod_momc=123456` a `/ovm/{id}` pro získání detailu úřadu.
