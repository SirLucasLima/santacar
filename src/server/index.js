import http from 'node:http'
import { json } from '../middlewares/json'

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    return res
    .setHeader('Content-Type', 'application/json')
    .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@gmail.com'
    })

    return res.writeHead(201).end('Successfully created a new user')
  }
  
  return res.writeHead(404).end('Not Found')
})

server.listen(3333)