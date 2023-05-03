import { randomUUID } from 'node:crypto'
import { Database } from '../database/database.js'
import { buildRoutePath } from '../utils/build-route-path.js'

const database = new Database()

export const routes = [

  { //create user
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body
      const user = {
        id: randomUUID(),
        name,
        email,
      }

      database.insert('users', user)
      return res.writeHead(201).end()
    }
  },
  { //list all users
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const users = database.select('users')
      return res.end(JSON.stringify(users))
    }
  },
  { //delete user
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      
    }
  }
]