/* eslint-disable */
// const http = require('http')
// const fs = require('fs')
// const url = require('url')
// const sqlite3 = require('sqlite3').verbose()

// // Create SQLite database and users table if not exists
// const db = new sqlite3.Database('../Backend/test.db', err => {
//   if (err) {
//     console.error(err.message)
//   } else {
//     console.log('Connected to the SQLite database.')

//     db.run(`CREATE TABLE IF NOT EXISTS users (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             email TEXT NOT NULL,
//             username TEXT NOT NULL,
//             password TEXT NOT NULL
//         )`, err => {
//       if (err) {
//         console.error('Error creating users table:', err.message)
//       } else {
//         console.log('Users table created successfully.')
//       }
//     })
//   }
// })

// const server = http.createServer((req, res) => {
//   const { pathname } = URL(req.url)
//   // was const { pathname } = url.parse(req.url)

//   if (req.method === 'POST' && pathname === '/signup') {
//     let body = ''
//     req.on('data', chunk => {
//       body += chunk.toString() // convert Buffer to string
//     })

//     req.on('end', () => {
//       const formData = new URLSearchParams(body)
//       const email = formData.get('email')
//       const username = formData.get('username')
//       const password = formData.get('password')

//       if (email && username && password) {
//         // Insert data into users table
//         db.run('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, password], function (err) {
//           if (err) {
//             console.error(err.message)
//             res.writeHead(500, { 'Content-Type': 'text/plain' })
//             res.end('Internal Server Error')
//           } else {
//             console.log(`A new user has been added with rowid ${this.lastID}`)
//             res.writeHead(200, { 'Content-Type': 'text/plain' })
//             res.end('User signed up successfully!')
//           }
//         })
//       } else {
//         res.writeHead(400, { 'Content-Type': 'text/plain' })
//         res.end('Bad Request: Missing form data')
//       }
//     })
//   } else {
//     // Serve the HTML file for other requests
//     fs.readFile('./SignUp.html', (err, data) => {
//       if (err) {
//         res.writeHead(404, { 'Content-Type': 'text/plain' })
//         res.end('404 Not Found')
//       } else {
//         res.writeHead(200, { 'Content-Type': 'text/html' })
//         res.end(data)
//       }
//     })
//   }
// })

// const PORT = process.env.PORT || 5173
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
