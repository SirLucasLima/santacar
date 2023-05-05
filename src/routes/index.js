import { randomUUID } from 'node:crypto'
import { Database } from '../database/database.js'
import { buildRoutePath } from '../utils/build-route-path.js'

// Creating a new instance of a Database class and stores it in a constant called database.
const database = new Database()

// This line exports an array of routes using the export keyword. The array is stored in a constant called routes. The routes in this array define the different endpoints that can be accessed by clients using HTTP methods like GET, POST, PUT, and DELETE.
export const routes = [

  { // code to create a new user...

    // This is an example of a route object that defines the endpoint for creating a new user. It specifies that this endpoint should use the POST method and have a path of /users. The handler function is called when a client sends a request to this endpoint. It extracts the name and email fields from the request body, generates a unique ID for the new user, creates a new user object, and inserts it into the users table in the database using the insert method.
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
  { //code to list all users...

    // This route object defines the endpoint for listing all users. It specifies that this endpoint should use the GET method and have a path of /users. The handler function is called when a client sends a request to this endpoint. It extracts a search parameter from the request query, which can be used to filter the list of users by name or email. It selects all users from the users table in the database using the select method, either with or without a search filter, and sends a JSON array of user objects in the response body.
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query
      const users = database.select('users', search ? {
        name: search,
        email: search,
      } : null )
      return res.end(JSON.stringify(users))
    }
  },
  { // code to update a user...

    // This route object defines the endpoint for updating an existing user. It specifies that this endpoint should use the PUT method and have a path of /users/:id, where :id is a dynamic parameter that represents the user's unique ID. The handler function is called when a client sends a request to this endpoint. It extracts the user's ID, name, and email from the request parameters and body, updates the corresponding user object in the users table in the database using the update method, and sends a response with a 204 status code.
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { name, email } = req.body

      database.update('users', id, {
        name,
        email,
      })

      return res.writeHead(204).end()
    }
  },
  { // code to delete a user...

    // This route object defines the endpoint for deleting an existing user. It specifies that this endpoint should use the DELETE method and have a path of /users/:id, where :id is a dynamic parameter that represents the user's unique ID. The handler function is called when a client sends a request to this endpoint. It extracts the user's ID from the request parameters, deletes the corresponding user object from the users table in the database using the delete method, and sends a response
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('users', id)

      return res.writeHead(204).end()
    }
  }
]