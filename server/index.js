const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/TaskRoute');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', taskRoutes);





// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
