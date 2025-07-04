
import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import ThemeToggle from '../components/ThemeToggle';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState('light');
  const [visibleTasks, setVisibleTasks] = useState(5);

  useEffect(() => {
    const savedTheme = localStorage.getItem('taskManagerTheme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const addTask = (newTask) => {
    const task = {
      id: Date.now(),
      ...newTask,
      createdAt: new Date(),
      completed: false
    };
    setTasks(prev => [task, ...prev]);
  };

  const toggleComplete = (id) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    
    // Remove completed tasks after animation
    setTimeout(() => {
      setTasks(prev => prev.filter(task => !(task.id === id && task.completed)));
    }, 500);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('taskManagerTheme', newTheme);
  };

  const loadMoreTasks = () => {
    setVisibleTasks(prev => prev + 5);
  };

  return (
    <div className="task-manager">
      <header className="task-header">
        <h1 className="task-title">Task Palette</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>
      
      <main className="task-main">
        <div className="task-form-section">
          <TaskForm onAddTask={addTask} />
        </div>
        
        <div className="task-list-section">
          <TaskList 
            tasks={tasks}
            visibleTasks={visibleTasks}
            onToggleComplete={toggleComplete}
            onDeleteTask={deleteTask}
            onLoadMore={loadMoreTasks}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
