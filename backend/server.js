const express = require('express')
require('dotenv').config()
const cors = require('cors')
const initDatabase = require('./config/database')
const PORT = 9099

const server = express()
server.use(express.json())
server.use(cors())

initDatabase()

server.listen(PORT, () => {
    console.log(`Server up and running on port: ${PORT}`)
})