const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Routes for tasks
router.get("/", taskController.getAllTasks);
router.post("/", taskController.createTask);
router.put("/:taskId", taskController.updateTask);
router.get("/:taskId", taskController.updateTask);
router.delete("/:taskId", taskController.deleteTask);

module.exports = router;
