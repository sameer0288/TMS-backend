const Task = require("../models/Task");

// Controller for task-related operations
const taskController = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createTask: async (req, res) => {
    const { title, description, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({ error: "Incomplete task data" });
    }

    try {
      const newTask = await Task.create({ title, description, dueDate });
      res.json(newTask);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateTask: async (req, res) => {
    const taskId = req.params.taskId;
    const { title, description, dueDate } = req.body;

    try {
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { title, description, dueDate },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteTask: async (req, res) => {
    const taskId = req.params.taskId;

    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);

      if (!deletedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = taskController;
