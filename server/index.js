const express = require('express');
const cors = require('cors');

const app = express();
const connection = require('./config/Db');
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/tasks', taskRoutes);

// Error handling
app.use(errorHandler);




// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
