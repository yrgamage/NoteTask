import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const express = require('express');
const app = express();
const connection = require('./Db');
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});
// // Example route to get all notes
// app.get('/notes', (req, res) => {
//   const sql = 'SELECT * FROM notes';  // Replace 'notes' with your actual table
//   connection.query(sql, (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(results);
//   });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
