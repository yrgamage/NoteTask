const db = require('../config/Db');

// GET all tasks
const getAllTasks = (callback) => {
  db.query('SELECT * FROM task ORDER BY date ASC', callback);
};

// CREATE a new task
const createTask = (task, callback) => {
  const sql = 'INSERT INTO task (title, description, status, date) VALUES (?, ?, ?, ?)';
  db.query(sql, [task.title, task.description, task.status, task.date], callback);
};

// DELETE task by ID
const deleteTask = (id, callback) => {
  db.query('DELETE FROM task WHERE id = ?', [id], callback);
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask
};
