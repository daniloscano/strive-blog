const mongoose = require('mongoose')
require('dotenv').config()

const initDatabase = async () => {
    try {
    await mongoose.connect(process.env.DB_CONNECTION)
    console.log('Database connected successfully')
    } catch (e) {
        console.error(`Database connection error: ${e}`)
        throw e
    }
}

module.exports = initDatabase