const express = require('express')
require('dotenv').config()
const cors = require('cors')
const databaseConnection = require('./config/database')
const PORT = 9099

const authorsRoute = require('./routes/author.route')
const postsRoute = require('./routes/post.route')
const errorHandler = require('./middlewares/errorHandler')

const server = express()
server.use(express.json())
server.use(cors())

server.use("/authors", authorsRoute)
server.use("/posts", postsRoute)
server.use(errorHandler)

databaseConnection()

server.listen(PORT, () => {
    console.log(`Server up and running on port: ${PORT}`)
})