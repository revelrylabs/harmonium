require('source-map-support').install()

const path = require('path')
const http = require('http')
const express = require('express')
const Revelry = require('../lib/revelry').default

require('./static/homeIndex')

const app = express()
const server = new http.Server(app)

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(function(_req, res, _next) {
  const reactString = Revelry.viewToString('home/index', JSON.stringify({}))
  const head = `<head>\n<script type="text/javascript" src=""></script>\n</head>`
  const body = `<body>\n${reactString}\n</body>`
  res.send(`<!DOCTYPE html>\n<html>\n${head}\n${body}\n</html>`)
})

server.listen(8000, function(err) {
  if(err) {
    console.error(err)
    console.error(err.stack)
  }
})
