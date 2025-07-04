
import { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);
    setTitle('');
    setDescription('');
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-md">
      <div className="p-8 glass-effect rounded-2xl animate-fade-in">
        <h2 className="mb-6 text-2xl font-bold text-center text-foreground">
          ✨ Add New Task
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-foreground/80"
            >
              Task Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your task title..."
              className="w-full px-4 py-3 transition-all duration-200 border bg-input border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-primary/50 placeholder:text-muted-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="description" 
              className="block text-sm font-medium text-foreground/80"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add some details about your task..."
              rows={4}
              className="w-full px-4 py-3 transition-all duration-200 border resize-none bg-input border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-primary/50 placeholder:text-muted-foreground"
            />
          </div>

          <button
            type="submit"
            disabled={!title.trim() || isSubmitting}
            className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300
                       ${!title.trim() || isSubmitting
                         ? 'bg-muted text-muted-foreground cursor-not-allowed'
                         : 'bg-primary text-primary-foreground hover:bg-primary/90 hover-lift hover-glow'
                       }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-current rounded-full border-t-transparent animate-spin" />
                <span>Adding Task...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>Add Task</span>
                <span className="text-lg">+</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
