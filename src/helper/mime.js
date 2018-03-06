const path = require('path')

const mimeTypes = {
  js: 'text/javascript',
  txt: 'text/plain',
  html: 'text/html',
  css: 'text/css',
  json: 'application/json'
}

module.exports = filePath => {
  let ext = path.extname(filePath).split('.').pop().toLowerCase() || filePath
  return mimeTypes[ext] || mimeTypes['txt']
}
