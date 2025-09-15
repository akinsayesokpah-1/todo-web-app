import React from "react";

export default function TaskList({ tasks, toggleTask, deleteTask }) {
  if (tasks.length === 0) return <p>No tasks yet!</p>;
  return (
    <ul style={{ padding: 0 }}>
      {tasks.map((task) => (
        <li
          key={task._id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "1px solid #ddd",
          }}
        >
          <span
            onClick={() => toggleTask(task._id, !task.completed)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
              flex: 1,
            }}
          >
            {task.title}
          </span>
          <button
            onClick={() => deleteTask(task._id)}
            style={{
              marginLeft: "10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              padding: "4px 8px",
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
