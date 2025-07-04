import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/tasks?_page=${page}&_limit=${limit}`)
      .then((res) => {
        const newTasks = res.data;
        setTasks((prev) => [...prev, ...newTasks]);
        setHasMore(newTasks.length === limit);
      })
      .catch((err) => console.error(err));
  }, [page]);

  const handleToggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (taskId) => {
    axios
      .delete(`http://localhost:3000/api/tasks/${taskId}`)
      .then(() => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
      })
      .catch((err) => console.error(err));
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <TaskList
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
      />
    </div>
  );
};

export default TaskPage;
