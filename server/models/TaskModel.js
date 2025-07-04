const pool = require('../config/Db');

const Task = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM tasks');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
  },

  async create({ title, description, status, date }) {
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, status, date) VALUES (?, ?, ?, ?)',
      [title, description, status, date]
    );
    return { id: result.insertId, title, description, status, date };
  }
};

module.exports = Task;