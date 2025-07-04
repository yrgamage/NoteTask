const express = require('express');
const cors = require('cors');

const app = express();
const connection = require('./Db');
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Sample route
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM task';  // Replace 'notes' with your actual table
  connection.query(sql, (err, results) => {
    if(err) return res.json({Message: err.message});
    return res.json(results);
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
