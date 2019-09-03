const fs = require('fs')

const koaVault = ({ directory = './vault', offline = false } = {}) => async (
  ctx,
  next
) => {
  // only allow GET requests
  if (ctx.request.method !== 'GET') return next()
  // create filename
  const file = `${directory}/${sanitizeFileName(ctx.request.url)}.json`
  // if offline, serve from vault directory
  if (offline) {
    let response = getFile(file)
    if (response) ctx.body = response
    else ctx.throw(404, `Vault file not found for ${ctx.request.url}`)
  } else {
    // make default request and save response
    await next()
    saveResponse({ ctx, file, directory })
  }
}

const getFile = file => fs.existsSync(file) && JSON.parse(fs.readFileSync(file))

const sanitizeFileName = name =>
  name
    // replace forward slashes with forward arrows.(→)
    .replace(/\//g, '→')
    // replace question marks with question blocks (░)
    .replace(/\?/g, '░')

const saveResponse = ({ ctx, file, directory }) => {
  // ensure 200 status
  if (ctx.response.status !== 200) return false
  // ensure JSON response
  const header = ctx.response.header['content-type']
  if (!header || header.indexOf('application/json') === -1) return false
  // if directory doesn't exist, create it
  if (!fs.existsSync(directory)) fs.mkdirSync(directory)
  // save file
  fs.writeFile(file, JSON.stringify(ctx.body), error => {
    if (error) console.warn(`Error saving ${ctx.request.url} to vault`)
  })
}

module.exports = koaVault
