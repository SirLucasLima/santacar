import http from 'node:http'
import { middleware } from '../middlewares/index.js'
import { routes } from '../routes/index.js'
import { extractQueryParams } from '../utils/extract-query-params.js'

// Creates an HTTP server instance using the createServer() method of the http module. The server instance listens for incoming requests and executes the callback function passed as the second argument. The callback function takes two arguments, req and res, which represent the incoming request and the response that the server will send back to the client.
const server = http.createServer(async (req, res) => {
  // Extracts the HTTP method and URL from the incoming request using destructuring assignment.
  const { method, url } = req

  // Middleware function that is responsible for performing some tasks on the incoming request before it is handled by the server. Since this line uses await, we assume that the middleware() function returns a Promise.
  await middleware(req, res)

  // This code searches for a matching route using the find() method of the routes array. The routes array is assumed to contain objects that define the HTTP method, the URL path pattern, and a handler function for each route.
  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  // If a matching route is found, the code extracts the route parameters and query parameters from the URL and sets them on the req object. It then calls the handler function associated with the route, passing in the req and res objects as arguments.
  if (route) {
    const routeParams = req.url.match(route.path)
    const { query, ...params } = routeParams.groups
    req.params = params
    req.query = query ? extractQueryParams(routeParams.groups.query) : {}

    return route.handler(req, res)
  }

  // If no matching route is found, the code sends a 404 response to the client using the writeHead() and end() methods of the res object.
  return res.writeHead(404).end()
})

server.listen(3333)