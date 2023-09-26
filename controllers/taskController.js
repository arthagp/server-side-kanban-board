const { Task, Board } = require('../models');

class TaskController {
  static async createTask(req, res) {
    try {
      const { id } = req.userLogged;
      const { taskName, taskDescription, boardId, taskStatus, taskPriority } = req.body;

      // Pastikan board yang dimaksud ada dan dimiliki oleh pengguna yang saat ini masuk
      const board = await Board.findOne({
        where: { id: boardId, user_id: id },
      });

      if (!board) {
        return res.status(404).json({ error: 'Board not found' });
      }

      const response = await Task.create({
        task_name: taskName,
        task_description: taskDescription,
        board_id: boardId,
        task_status: taskStatus,
        task_priority: taskPriority,
      });

      if (response) {
        res.status(201).json({ message: 'Success Creating Task', data: response });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getTasks(req, res) {
    try {
      const { boardId } = req.params;
      const tasks = await Task.findAll({ where: { board_id: boardId } });

      if (tasks) {
        res.status(200).json({ message: 'Success Fetching Tasks', data: tasks });
      } else {
        res.status(404).json({ error: 'Tasks not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateTask(req, res) {
    try {
      const { taskId } = req.params;
      const { taskName, taskDescription, taskStatus, taskPriority } = req.body;

      const [updatedRowCount] = await Task.update(
        {
          task_name: taskName,
          task_description: taskDescription,
          task_status: taskStatus,
          task_priority: taskPriority,
        },
        { where: { id: taskId } }
      );

      if (updatedRowCount > 0) {
        res.status(200).json({ message: 'Success Updating Task' });
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async moveTask(req, res) {
    try {
      const { taskId, targetBoardId } = req.body;
      
      // Cari tugas berdasarkan taskId
      const task = await Task.findByPk(taskId);
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      // Lakukan perpindahan tugas ke target board
      task.board_id = targetBoardId;
      await task.save();
  
      res.status(200).json({ message: 'Task moved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteTask(req, res) {
    try {
      const { taskId } = req.params;

      const deletedRowCount = await Task.destroy({ where: { id: taskId } });

      if (deletedRowCount > 0) {
        res.status(200).json({ message: 'Success Deleting Task' });
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = TaskController;
