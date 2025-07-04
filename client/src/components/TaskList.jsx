import React, { useState } from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onDelete, onLoadMore, hasMore }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Calendar className="text-blue-500" size={24} />
          Recent Tasks
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
            ({tasks.length})
          </span>
        </h2>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-blue-200 dark:border-blue-600 focus:border-blue-400 dark:focus:border-blue-400 bg-blue-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-600"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 dark:text-gray-500" size={18} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-400 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300 focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {sortedTasks.length === 0 ? (
          <div className="text-center py-12">
            {searchTerm ? (
              <>
                <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">🔍</div>
                <p className="text-gray-500 dark:text-gray-400">No tasks found matching "{searchTerm}"</p>
              </>
            ) : (
              <>
                <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">📝</div>
                <p className="text-gray-500 dark:text-gray-400">No tasks yet. Create your first task!</p>
              </>
            )}
          </div>
        ) : (
          <>
            {sortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
              />
            ))}
            
            {hasMore && !searchTerm && (
              <button
                onClick={onLoadMore}
                className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar size={18} />
                Load More Tasks
              </button>
            )}
          </>
        )}
      </div>

      {/* Statistics */}
      {tasks.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Total Tasks: {tasks.length}</span>
            <span>Showing: {sortedTasks.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;