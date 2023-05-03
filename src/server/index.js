import http from 'node:http'
import { middleware } from '../middlewares/index.js'
import { routes } from '../routes/index.js'

const server = http.createServer(async (req, res) => {
  const { method, url: path } = req

  await middleware(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path === path
  })

  if (route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
