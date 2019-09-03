# 🗝 Koa Vault

Archive Koa responses, for historical purposes.

This project will save JSON responses to a local directory, which can be later used when the API is decommissioned. Read about why this project was created [here](https://teacups.io/memento-mori).

Could be used with [koa-proxy](https://www.npmjs.com/package/koa-proxy) to scrape arbitrary API's.

## Installation

```
yarn add koa-vault
```

## Usage

```js
// ecmascript module
import vault from 'koa-vault'

// commonjs
const vault = require('koa-vault')

app.use(
  vault({
    directory: './vault', // default
    offline: false //default
  })
)
```

## Saved files

> _**→** program **→** mulatu-astatke.json_  
> _**→** program **→** nakhane.json_  
> _**→** program **→** neneh-cherry.json_  
> _**→** program **→** oneohtrix-point-never.json_

JSON files will be saved to the `vault` directory. Due to file naming conventions, forward slashes are replaced with forward arrows (→), and question marks with question blocks (░).

Only `GET` requests with `application/json` content-type header responses will be saved. If this does not suit your needs, please open a pull request.

## Offline/archive

When turning the `offline` option on, `GET` requests will be served from the `vault` directory. If the file does not exist, a `404` error will be thrown.
