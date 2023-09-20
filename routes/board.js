const express = require("express");
const router = express.Router();
const BoardController = require("../controllers/boardController");
const authentication = require('../middlewares/authentication')

router.get('/boards', authentication, BoardController.getAllBoard)
router.post('/board', authentication, BoardController.createBoard)
router.put('/board/:boardId', authentication, BoardController.editBoard)
router.delete('/board/:boardId', authentication, BoardController.deleteBoard)

module.exports = router;
