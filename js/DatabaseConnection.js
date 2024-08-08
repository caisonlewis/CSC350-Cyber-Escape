const sqlite3 = require('sqlite3').verbose()

// Open a connection to the SQLite database file
const db = new sqlite3.Database('path/to/your/database.sqlite')

// Define your functions to interact with the database
export const getPointsByUsername = (username) => {
  const getPointsQuery = 'SELECT points FROM users WHERE username = ?'
  return db.prepare(getPointsQuery).get(username)
}

// Close the database connection when done
db.close()
