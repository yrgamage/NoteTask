import React, { useState } from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onDelete, onLoadMore, hasMore, isLoading }) => {
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
    <div className="flex flex-col h-full p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-white">
          <Calendar className="text-blue-500" size={24} />
          Recent Tasks
          <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
            ({tasks.length})
          </span>
        </h2>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2 dark:text-gray-500" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks..."
            className="w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-500 transition-all duration-300 border-2 border-blue-200 rounded-xl dark:border-blue-600 focus:border-blue-400 dark:focus:border-blue-400 bg-blue-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 dark:text-gray-500" size={18} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 text-gray-800 transition-all duration-300 border-2 border-gray-200 rounded-lg dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-400 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Tasks List - scrollable */}
      <div
        className="flex-1 space-y-4 overflow-y-auto"
        style={{ maxHeight: '700px' }} // Adjust height as needed
      >
        {sortedTasks.length === 0 ? (
          <div className="py-12 text-center">
            {searchTerm ? (
              <>
                <div className="mb-2 text-lg text-gray-400 dark:text-gray-500">🔍</div>
                <p className="text-gray-500 dark:text-gray-400">No tasks found matching "{searchTerm}"</p>
              </>
            ) : (
              <>
                <div className="mb-2 text-lg text-gray-400 dark:text-gray-500">📝</div>
                <p className="text-gray-500 dark:text-gray-400">No tasks yet. Create your first task!</p>
              </>
            )}
          </div>
        ) : (
          sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      {/* Load More Button */}
      {hasMore && !searchTerm && (
        <button
          onClick={onLoadMore}
          disabled={isLoading}
          className="flex items-center justify-center w-full gap-2 px-6 py-3 mt-4 font-semibold text-white transition-all duration-300 transform bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 rounded-xl hover:scale-105 hover:shadow-lg"
        >
          {isLoading ? (
            <svg
              className="w-5 h-5 mr-2 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            <>
              <Calendar size={18} />
              Load More Tasks
            </>
          )}
        </button>
      )}

      {/* Statistics */}
      {tasks.length > 0 && (
        <div className="flex justify-between pt-4 mt-6 text-sm text-gray-500 border-t border-gray-200 dark:border-gray-600 dark:text-gray-400">
          <span>Total Tasks: {tasks.length}</span>
          <span>Showing: {sortedTasks.length}</span>
        </div>
      )}
    </div>
  );
};

export default TaskList;
