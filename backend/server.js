const express = require('express')
require('dotenv').config()
const cors = require('cors')
const databaseConnection = require('./config/database')
const PORT = process.env.PORT || 9099

const authorsRoute = require('./routes/author.route')
const postsRoute = require('./routes/post.route')
const commentsRoute = require('./routes/comment.route')
const authRoute = require('./routes/auth.route')
const googleAuthRoute = require('./routes/oauth.route')
const errorHandler = require('./middlewares/errorHandler')
const tokenVerifier = require('./middlewares/auth/verifyToken')

const server = express()
server.use(express.json())
server.use(cors(
    {
        origin: [
            'https://strive-blog-gamma.vercel.app'
        ],
        credentials: true
    }
))

// server.use(tokenVerifier)

server.use("/", googleAuthRoute)
server.use("/auth", authRoute)
server.use("/authors", authorsRoute)
server.use("/posts", postsRoute)
server.use("/comments", commentsRoute)
server.use(errorHandler)

databaseConnection()

server.listen(PORT, () => {
    console.log(`Server up and running on port: ${PORT}`)
})