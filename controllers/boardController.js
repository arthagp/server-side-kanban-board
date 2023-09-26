const { Board, Task } = require('../models');

class BoardController {
    static async createBoard(req, res) {
        try {
            const { id } = req.userLogged;
            const { boardName } = req.body;
            const response = await Board.create({ user_id: id, board_name: boardName });
            if (response) {
                res.status(201).json({ message: 'Success Creating Board', data: response });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getAllBoard(req, res) {
        try {
            const { id } = req.userLogged;
            const boards = await Board.findAll({
                where: { user_id: id },
                // Ini akan menggabungkan tugas-tugas yang terkait dengan setiap papan
                include: Task,
                order: [['id', 'ASC']]
            });

            if (boards) {
                res.status(200).json({ message: 'Success Fetching Boards', data: boards });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async editBoard(req, res) {
        try {
            const { boardId } = req.params;
            const { boardName } = req.body;

            const [updatedRowCount] = await Board.update(
                { board_name: boardName },
                { where: { id: boardId } }
            );

            if (updatedRowCount > 0) {
                res.status(200).json({ message: 'Success Updating Board' });
            } else {
                res.status(404).json({ error: 'Board not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async deleteBoard(req, res) {
        try {
            const { boardId } = req.params;

            const deletedRowCount = await Board.destroy({ where: { id: boardId } });

            if (deletedRowCount > 0) {
                res.status(200).json({ message: 'Success Deleting Board' });
            } else {
                res.status(404).json({ error: 'Board not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

module.exports = BoardController;
