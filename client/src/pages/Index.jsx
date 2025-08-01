import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import ThemeToggle from "../components/ThemeToggle";
import axios from "axios";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tasksToShow] = useState(5);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageType, setMessageType] = useState("success");

  const fetchTasks = () => {
    axios
      .get(`http://localhost:3000/api/tasks`) 
      .then((res) => {
        console.log("Fetched tasks:", res.data);
        const allTasks = res.data.map((task) => ({
          ...task,
          createdAt: task.createdAt || task.created_at || "",
        }));
        setTasks(allTasks);
        updateDisplayedTasks(allTasks);
        setHasMore(allTasks.filter((t) => !t.completed).length > tasksToShow);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateDisplayedTasks = (allTasks) => {
    const activeTasks = allTasks.filter((task) => !task.completed);
    const sortedTasks = activeTasks.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Only set the first 5 initially
    const firstFive = sortedTasks.slice(0, 5);
    setDisplayedTasks(firstFive);

    // Indicate if there are more than 5 remaining for "Load More" button
    setHasMore(sortedTasks.length > firstFive.length);
  };

  const handleAddTask = (newTask) => {
    axios
      .post("http://localhost:3000/api/tasks", newTask)
      .then((res) => {
        const addedTask = { ...newTask, id: res.data.taskId };
        const updatedTasks = [addedTask, ...tasks];
        setTasks(updatedTasks);
        updateDisplayedTasks(updatedTasks);

        const event = new CustomEvent("taskAdded");
        window.dispatchEvent(event);

        setMessageText("Task added successfully");
        setMessageType("added");
        setShowMessage(true);

        setTimeout(() => setShowMessage(false), 2000);
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  const handleDeleteTask = (taskId, purpose = "default") => {
    axios
      .delete(`http://localhost:3000/api/tasks/${taskId}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        updateDisplayedTasks(updatedTasks);

        let message = "Task deleted";
        let type = "success";

        if (purpose === "userDeleted") {
          message = "Task Deleted";
          type = "deleted";
        } else if (purpose === "userCompleted") {
          message = "Task Completed";
          type = "success";
        }

        setMessageText(message);
        setMessageType(type);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
        setMessageText("Failed to delete task");
        setMessageType("error");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
      });
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // optional delay for UX
    const activeTasks = tasks.filter((task) => !task.completed);
    const sortedTasks = activeTasks.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setDisplayedTasks(sortedTasks); // show ALL active tasks
    setHasMore(false); //  nothing more to load now
    setIsLoading(false);
  };

  return (
    <div className="relative w-full min-h-screen text-gray-900 transition-all duration-300 dark:text-white bg-gradient-to-br from-pink-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-pink-300 rounded-full w-80 h-80 -top-40 -right-40 dark:bg-pink-900 blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bg-blue-300 rounded-full w-80 h-80 -bottom-40 -left-40 dark:bg-blue-900 blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-purple-300 rounded-full w-96 h-96 top-1/2 left-1/2 dark:bg-purple-900 blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <ThemeToggle />
      <header className="relative z-10 w-full px-8 py-6 text-left">
        <h1
          className="text-5xl font-extrabold md:text-6xl drop-shadow-md animate-fade-in text-[#0A1D56] dark:text-white"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          NoteTask
        </h1>
        <p
          className="mt-1 text-lg text-gray-600 dark:text-gray-300 animate-fade-in"
          style={{ animationDelay: "200ms", fontFamily: "Poppins, sans-serif" }}
        >
          Your Personal Task Manager
        </p>
      </header>

      <main className="relative z-10 w-full px-6 pb-20">
        <div className="flex flex-col w-full gap-6 px-2 lg:flex-row">
          <div className="w-full lg:w-1/2 lg:ml-6">
            <TaskForm onAddTask={handleAddTask} />
          </div>
          <div className="w-full lg:w-1/2">
            {showMessage && (
              <div
                className={`fixed z-50 px-4 py-2 text-white rounded shadow-md bottom-6 right-6 animate-fade-in-out
                  ${
                    messageType === "success"
                      ? "bg-green-500"
                      : messageType === "deleted"
                      ? "bg-red-500"
                      : messageType === "added"
                      ? "bg-yellow-400"
                      : ""
                  }`}
              >
                {messageText}
              </div>
            )}
            <TaskList
              tasks={displayedTasks}
              onToggleComplete={(taskId) =>
                handleDeleteTask(taskId, "userCompleted")
              }
              onDelete={(taskId) => handleDeleteTask(taskId, "userDeleted")}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full py-8 text-sm text-center text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Yoshani Gamage. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
