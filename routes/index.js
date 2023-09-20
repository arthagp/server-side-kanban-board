const express = require('express')
const router = express.Router()

const routerUser = require('./user')
const routerBoard = require('./board')
const routerTask = require('./task')

router.use(routerUser)
router.use(routerBoard)
router.use(routerTask)


module.exports = router