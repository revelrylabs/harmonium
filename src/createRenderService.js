import http from 'http'
import bodyParser from 'body-parser'
import express from 'express'
import ServerRenderer from './ServerRenderer'

export default function createRenderService(application) {
  const renderer = new ServerRenderer(application)
  const app = express()

  app.use(bodyParser.json())

  app.get('/*', function(req, res, next) {
    const path = req.params[0]

    try {
      res.status(renderer.hasView(path) ? 200 : 404).end()
    } catch(err) {
      next(err)
    }
  })

  app.post('/*', function(req, res, next) {
    try {
      const path = req.params[0]
      const props = req.body

      if(!renderer.hasView(path)) {
        return res.status(404).end()
      }

      const output = renderer.renderView(path, props)

      if(output === null) {
        return res.status(404).end()
      }

      res.status(200).end(output)

    } catch(err) {
      next(err)
    }
  })

  app.use(function(err, req, res, next) {
    console.error(err.stack)
    next(err)
  })

  app.use(function(err, req, res, next) {
    res.status(500).end(err.stack)
  })

  return http.createServer(app)
}
