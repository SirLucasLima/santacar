import http from 'node:http'
import { middleware } from '../middlewares/index.js'
import { routes } from '../routes/index.js'
import { extractQueryParams } from '../utils/extract-query-params.js'

// Create an HTTP server with an async request listener
const server = http.createServer(async (req, res) => {
  // Extract the request method and URL from the incoming request object
  const { method, url } = req

  // Call a middleware function with the request and response objects
  await middleware(req, res)

  // Find a matching route based on the request method and URL
  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  // If a matching route was found, extract any route parameters and query parameters and call the handler function
  if (route) {
    const routeParams = req.url.match(route.path)
    const { query, ...params } = routeParams.groups
    req.params = params
    req.query = query ? extractQueryParams(routeParams.groups.query) : {}

    return route.handler(req, res)
  }

  // If no matching route was found, return a 404 response
  return res.writeHead(404).end()
})

// Start the server listening on port 3333
server.listen(3333)



//////////////////////////////// EXPLAINTING THE SERVER

// The server uses a middleware, which is an asynchronous function defined elsewhere in the code and receives two parameters: req and res. This middleware is executed whenever an HTTP request is made and is responsible for processing the request before passing it on to the rest of the code.
// The server also defines a set of routes, which are defined elsewhere in the code in a variable called routes. Each route contains an HTTP method, a URL pattern (regular expression), and a handler function that will be executed when a request that matches that route is received by the server.
// When a request is received by the server, it checks which route corresponds to that request by comparing the HTTP method and URL with each defined route. If a matching route is found, the server extracts the URL parameters and query parameters (if any) and stores them in params and query objects, respectively, which are added to the req object. Then, the handler function corresponding to that route is executed and receives req and res as arguments.
// If no matching route is found, the server sends an HTTP response with the status code 404 (Not Found).