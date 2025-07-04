
import React, { useState } from 'react';
import { Check, Trash2, Clock } from 'lucide-react';

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(task.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <div className="task-meta">
            <Clock size={14} />
            <span>{formatDate(task.createdAt)}</span>
          </div>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>
      
      <div className="task-actions">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`complete-button ${task.completed ? 'completed' : ''}`}
          title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <Check size={16} />
        </button>
        
        <button
          onClick={handleDelete}
          className={`delete-button ${showDeleteConfirm ? 'confirm' : ''}`}
          title={showDeleteConfirm ? 'Click again to confirm' : 'Delete task'}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
