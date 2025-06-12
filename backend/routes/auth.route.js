const express = require('express')
const authController = require('../controllers/auth.controller')

const auth = express.Router()

auth.get("/me", authController.findAuthor)
auth.post("/login", authController.login)

module.exports = auth