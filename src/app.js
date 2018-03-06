const fs = require('fs')
const path = require('path')
const http = require('http')
const promisify = require('util').promisify
const chalk = require('chalk')
const conf = require('./config/default')
const route = require('./helper/route')
const open = require('./helper/open')

class Server {
  constructor (config) {
    this.conf = Object.assign({}, conf, config)
  }

  start () {
    const server = http.createServer((req, res) => {
      const filePath = path.join(this.conf.root, req.url)
      route(req, res, filePath, this.conf)
    })
    server.listen(this.conf.port, this.conf.hostName, () => {
      const addr = `http://${this.conf.hostName}:${this.conf.port}`
      console.log(chalk.green(`Server is running at ${addr}`))
      open(addr)
    })
  }
}

module.exports = Server
