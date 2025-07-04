const Task = require('../models/TaskModel');

const taskController = {
  getAllTasks: async (req, res, next) => {
    try {
      const tasks = await Task.getAll();
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  },

  createTask: async (req, res, next) => {
    try {
      const newTask = await Task.create(req.body);
      res.status(201).json(newTask);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = taskController;