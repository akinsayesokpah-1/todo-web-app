import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then(setTasks)
      .catch(console.error);
  }, []);

  // Add a new task
  const addTask = (title) => {
    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((task) => setTasks((prev) => [...prev, task]));
  };

  // Toggle task completion
  const toggleTask = (id, completed) => {
    fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setTasks((prev) =>
          prev.map((t) => (t._id === updated._id ? updated : t))
        );
      });
  };

  // Delete a task
  const deleteTask = (id) => {
    fetch(`/api/tasks/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => setTasks((prev) => prev.filter((t) => t._id !== id)));
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
