const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/taskController");
const authentication = require('../middlewares/authentication')

router.get('/tasks/:boardId', authentication, TaskController.getTasks)
router.post('/task', authentication, TaskController.createTask)
router.put('/task/:taskId', authentication, TaskController.updateTask)
router.delete('/task/:taskId', authentication, TaskController.deleteTask)

module.exports = router;
