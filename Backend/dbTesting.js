// const sqlite3 = require('sqlite3').verbose();
// let sql;

// connect to db
// const db = new sqlite3.Database('test.db', sqlite3.OPEN_READWRITE, (err) => {
//   if (err) return console.error(err.message);
// });

// create table
// sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY, username, password, email)';
// db.run(sql);

// drop table
// db.run("DROP TABLE users");
// THIS IS JUST AN EXAMPLE OF HOW TO GO ABOUT DROPPING A TABLE

// Insert data into table
// sql = 'INSERT INTO user(f_name,l_name,username,password,email) VALUES (?,?,?,?,?)';

// example user 1

// db.run(sql, ["John", "Doe", "jdoe1", "password123", "jdoe@uncw.edu"], (err) => {
//    if (err) return console.error(err.message);
// });

// example user 2
// db.run(sql, ["Mary", "Jane", "mjay1", "pw12", "mjane@uncw.edu"], (err) => {
//    if (err) return console.error(err.message);
// });

// Query the database

// sql = 'SELECT * FROM users'; //Just grabbing everything from the user table
// db.all(sql, [], (err, rows) => {
//   if (err) return console.error(err.message);
//  rows.forEach(row => {
//      console.log(row); //just shows the results of the query in the console
//   });
// });
