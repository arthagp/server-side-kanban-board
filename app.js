require('dotenv').config()
const express = require('express')
const app = express()
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 8000
const cors = require('cors')
const router = require('./routes/index')
const morgan = require('morgan')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded)

app.use(morgan("tiny"));
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`)
})