
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, visibleTasks, onToggleComplete, onDeleteTask, onLoadMore }) => {
  const displayedTasks = tasks.slice(0, visibleTasks);
  const hasMoreTasks = tasks.filter(task => !task.completed).length > visibleTasks;

  return (
    <div className="task-list-container">
      <div className="list-header">
        <h2>Recent Tasks</h2>
        <span className="task-count">{tasks.filter(t => !t.completed).length} active</span>
      </div>
      
      <div className="task-list">
        {displayedTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No tasks yet</h3>
            <p>Create your first task to get started!</p>
          </div>
        ) : (
          displayedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
      
      {hasMoreTasks && (
        <button onClick={onLoadMore} className="load-more-button">
          Load More Tasks
        </button>
      )}
    </div>
  );
};

export default TaskList;
