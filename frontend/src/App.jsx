import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const getTasks = async () => {
    const response = await fetch(`${API_URL}/tasks`);
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });

    setTitle("");
    getTasks();
  };

  const completeTask = async (id, completed) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !completed,
      }),
    });

    getTasks();
  };

const handleDelete = async (id) => {
    console.log("Deleting ID:", id);

    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
    });

    console.log("Delete status:", response.status);

    if (response.ok) {
        getTasks();
    }
};
  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="add-btn" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li className="task-item" key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask(task.id, task.completed)}
            />

            <span
              className={`task-title ${
                task.completed ? "completed" : ""
              }`}
            >
              {task.title}
            </span>

            <button
              className="delete-btn"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;