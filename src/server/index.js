import http from 'node:http'
import { middleware } from '../middlewares/index.js'
import { routes } from '../routes/index.js'
import { extractQueryParams } from '../utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await middleware(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups
    req.params = params
    req.query = query ? extractQueryParams(routeParams.groups.query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
