
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        description: description.trim()
      });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="task-form-container">
      <div className="form-header">
        <h2>Create New Task</h2>
        <p>Add your tasks to stay organized</p>
      </div>
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="input-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className="task-input"
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add task description..."
            className="task-textarea"
            rows="4"
          />
        </div>
        
        <button type="submit" className="add-button">
          <Plus size={20} />
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
