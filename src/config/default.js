module.exports = {
  hostName: '127.0.0.1',
  port: 3000,
  root: process.cwd(),
  compress: /\.(html|css|js|md)/,
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    eTag: true
  }
}
