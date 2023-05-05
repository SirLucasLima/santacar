import fs from 'node:fs/promises'

// This line defines the path to the database file, using a relative path from the current module file.
const databasePath = new URL('../../db.json', import.meta.url)

export class Database {
  #database = {}

  // This is the class constructor. It reads the database file asynchronously, and sets the class's private #database property to an empty object. If the read is successful, the JSON data is parsed and stored in the #database property. If the read fails (e.g., the database file does not exist), the #persist() method is called.
  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  // This is a private method that writes the current #database object to the database file, in JSON format.
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  // This method is used to retrieve data from a specified table in the database. If a search parameter is provided, the method filters the results based on the keys and values of the search object. The method returns an array of matching rows.
  select(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some((key, value) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data
  }

  // This method is used to insert data into a specified table in the database. If the table already exists, the data is added to the end of the existing data. If the table does not exist, it is created and the data is added. The method returns the inserted data.
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }
    this.#persist()

    return data
  }

  // This method is used to update a row in a specified table in the database, based on its id property. If a row with the specified id exists, its data is replaced with the provided data. The method returns nothing.
  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {id, ...data}
      this.#persist()
    }
  }

  // This method is used to delete a row from a specified table in the database, based on its id property. If a row with the specified id exists, it is removed from the table. The method returns nothing.
  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}