import fs from 'node:fs/promises'

//path to create db directory 
const databasePath = new URL('../../db.json', import.meta.url)

export class Database {
  #database = {}

  //if db wasnt created this method will create an empty db directory 
  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  //first argument is the name and the path to the database and the second argument is the create to persist the database
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }
}