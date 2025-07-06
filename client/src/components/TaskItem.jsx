import { useState, useEffect } from "react";

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    console.log("Task received by TaskItem:", task);
    console.log("createdAt field:", task.createdAt);
  }, [task]);

  const handleToggleComplete = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    onToggleComplete(task.id);
  };
  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    onDelete(task.id);
  };

  return (
    <div
      className={`glass-effect rounded-xl p-6 animate-slide-up hover-lift 
                  transition-all duration-300 group
                  ${task.completed ? "opacity-75 scale-95" : ""}
                  ${isDeleting ? "animate-pulse scale-95" : ""}`}
    >
      <div className="flex items-start justify-between space-x-4">
        <div className="flex items-start flex-1 min-w-0 space-x-4">
          {/* Checkbox */}
          <button
            onClick={handleToggleComplete}
            disabled={isDeleting}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 
             transition-all duration-300 hover:scale-110
             ${
               task.completed
                 ? "bg-success border-success text-white"
                 : "border-primary hover:border-success hover:bg-success/10"
             }
             ${isDeleting ? "animate-pulse" : ""}`}
          >
            {task.completed && (
              <svg
                className="w-4 h-4 mx-auto mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-lg leading-tight mb-2 
                           ${
                             task.completed
                               ? "line-through text-muted-foreground"
                               : "text-foreground"
                           }`}
            >
              {task.title}
            </h3>

            {task.description && (
              <p
                className={`text-sm mb-3 leading-relaxed
                            ${
                              task.completed
                                ? "line-through text-muted-foreground"
                                : "text-foreground/70"
                            }`}
              >
                {task.description}
              </p>
            )}

            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              {task.completed && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-success/20 text-success">
                  Completed
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200
                     opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive
                     ${
                       isDeleting
                         ? "opacity-100 animate-pulse"
                         : "text-muted-foreground"
                     }`}
          aria-label="Delete task"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
