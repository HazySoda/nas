const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const Handlebars = require('handlebars')
const mime = require('../helper/mime')
const compress = require('../helper/compress')
const range = require('../helper/range')
const isFresh = require('../helper/cache')

const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath, 'utf8')
const template = Handlebars.compile(source)

module.exports = async function (req, res, filePath, conf) {
  try {
    const stats = await stat(filePath)
    const contentType = `${mime(filePath)}; charset=utf-8`
    if (stats.isFile()) {
      res.setHeader('Content-Type', contentType)
      if (isFresh(stats, req, res)) {
        res.statusCode = 304
        res.end()
        return
      }
      let rs
      const { code, start, end } = range(stats.size, req, res)
      if (code === 200) {
        res.statusCode = 200
        rs = fs.createReadStream(filePath, 'utf8')
      } else {
        res.statusCode = 206
        rs = fs.createReadStream(filePath, {
          start,
          end,
          encoding: 'utf8'
        })
      }
      if (filePath.match(conf.compress)) {
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      const dir = path.relative(conf.root, filePath)
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files: files.map(file => {
          return {
            file,
            icon: mime(file)
          }
        })
      }
      res.end(template(data))
    }
  } catch (e) {
    res.statusCode = 500
    console.log(e)
  }
}
