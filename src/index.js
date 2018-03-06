const yargs = require('yargs')
const Server = require('./app')

const argv = yargs
  .usage('nas [options]')
  .option('p', {
    alias: 'port',
    describe: 'port',
    default: 8080
  })
  .option('h', {
    alias: 'hostName',
    describe: 'host',
    default: '127.0.0.1'
  })
  .option('d', {
    alias: 'root',
    describe: 'root path',
    default: process.cwd()
  })
  .version()
  .alias('v', 'version')
  .help()
  .argv

const server = new Server(argv)
server.start()
