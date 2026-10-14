const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

app.use(express.json());

let tasks = [];

// Test route
app.get("/", (req, res) => {
    res.send("Task Manager Backend is running!");
});

// Get all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Add a task
app.post("/tasks", (req, res) => {
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };

    tasks.push(task);
    res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    task.completed = req.body.completed;

    res.json(task);
});
// Delete a task
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const taskExists = tasks.some(task => task.id === id);

    if (!taskExists) {
        return res.status(404).json({ message: "Task not found" });
    }

    tasks = tasks.filter(task => task.id !== id);

    res.json({ message: "Task deleted successfully" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})