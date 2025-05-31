const express = require('express')
require('dotenv').config()
const cors = require('cors')
const initDatabase = require('./config/database')
const PORT = 9099

const authorsRoute = require('./routes/authors.route')

const server = express()
server.use(express.json())
server.use(cors())

server.use("/authors", authorsRoute)

initDatabase()

server.listen(PORT, () => {
    console.log(`Server up and running on port: ${PORT}`)
})