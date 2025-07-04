// server/Db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // Change if you have a different MySQL username
  password: 'yoshani#28',           // Set your MySQL password here
  database: 'notetask'   // Change to 'Note Task' if you kept the space (not recommended)
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

module.exports = connection;
