
import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import ThemeToggle from '../components/ThemeToggle';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tasksToShow] = useState(5);

  // Initialize with some sample tasks
  useEffect(() => {
    const sampleTasks = [
      {
        id: 1,
        title: "Review project proposal",
        description: "Go through the quarterly project proposal and provide feedback to the team",
        completed: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      },
      {
        id: 2,
        title: "Update website content",
        description: "Refresh the homepage content and update the about section",
        completed: false,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      },
      {
        id: 3,
        title: "Schedule team meeting",
        description: "Organize weekly sync meeting with the development team",
        completed: false,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      }
    ];
    
    setTasks(sampleTasks);
    updateDisplayedTasks(sampleTasks);
  }, []);

  const updateDisplayedTasks = (allTasks) => {
    const activeTasks = allTasks.filter(task => !task.completed);
    const sortedTasks = activeTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    setDisplayedTasks(sortedTasks.slice(0, tasksToShow));
    setHasMore(sortedTasks.length > tasksToShow);
  };

  const handleAddTask = (newTask) => {
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    updateDisplayedTasks(updatedTasks);
    
    // Show success animation
    const event = new CustomEvent('taskAdded');
    window.dispatchEvent(event);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    updateDisplayedTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    updateDisplayedTasks(updatedTasks);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    const activeTasks = tasks.filter(task => !task.completed);
    const sortedTasks = activeTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const newDisplayCount = displayedTasks.length + tasksToShow;
    
    setDisplayedTasks(sortedTasks.slice(0, newDisplayCount));
    setHasMore(sortedTasks.length > newDisplayCount);
    setIsLoading(false);
  };

  return (
    
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Background decoration */}
       
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-primary/5 blur-3xl"></div>
        <div className="absolute rounded-full -bottom-40 -left-40 w-80 h-80 bg-accent/5 blur-3xl"></div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-secondary/5 blur-3xl"></div>
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Header */}
      <header className="relative z-10 py-12 text-center">
        <h1 className="mb-4 text-5xl font-bold md:text-6xl text-foreground animate-fade-in">
          Task Manager
        </h1>
        <p className="text-xl text-muted-foreground animate-fade-in" style={{animationDelay: '200ms'}}>
          Stay organized and productive with your personal task manager
        </p>
      </header>

      {/* Main Content */}
      <main className="container relative z-10 px-6 pb-20 mx-auto">
        <div className="flex flex-col items-start justify-center gap-12 lg:flex-row">
          {/* Task Form - Left Side */}
          <div className="flex justify-center w-full lg:w-auto">
            <TaskForm onAddTask={handleAddTask} />
          </div>

          {/* Task List - Right Side */}
          <div className="flex justify-center w-full lg:w-auto">
            <TaskList
              tasks={displayedTasks}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-muted-foreground">
        <p className="text-sm">
          Built with ❤️ using React & Tailwind CSS
        </p>
      </footer>
    </div>
  );
};

export default Index;
