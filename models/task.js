'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Board, {
        foreignKey: 'board_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Task.init({
    task_name: DataTypes.TEXT,
    board_id: DataTypes.INTEGER,
    task_description: DataTypes.TEXT,
    task_status: {
      type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
      allowNull: false
    },
    task_priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'), 
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};