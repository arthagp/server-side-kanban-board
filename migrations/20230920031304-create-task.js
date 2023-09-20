'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      board_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Boards',
          key: 'id',
        },
        allowNull: false
      },
      task_name: {
        type: Sequelize.TEXT
      },
      task_description: {
        type: Sequelize.TEXT
      },
      task_status: {
        type: Sequelize.ENUM('To Do', 'In Progress', 'Done'),
        allowNull: false
      },
      task_priority: {
        type: Sequelize.ENUM('Low', 'Medium', 'High'),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};