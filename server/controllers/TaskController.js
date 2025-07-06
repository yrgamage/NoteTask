const Task = require('../models/TaskModel');

// GET /tasks
const getTasks = (req, res) => {
  Task.getAllTasks((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// POST /tasks
const addTask = (req, res) => {
  const { title, description } = req.body;

  // Automatically set status and date on the backend
  const status = 'pending';             
  const date = new Date();            

  const newTask = { title, description, status, date };

  Task.createTask(newTask, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Task created', taskId: result.insertId });
  });
};

// DELETE /tasks/:id
const deleteTask = (req, res) => {
  const id = req.params.id;

  Task.deleteTask(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  });
};

module.exports = {
  getTasks,
  addTask,
  deleteTask
};
