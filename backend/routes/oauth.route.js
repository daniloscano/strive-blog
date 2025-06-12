const express = require('express')
const googleAuth = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const oauthController = require('../controllers/oauth.controller')
const session = require('express-session')

googleAuth.use(session({
    secret: process.env.GOOGLE_SECRET,
    resave: false,
    saveUninitialized: false
}))

googleAuth.use(passport.initialize())
googleAuth.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
        //console.log('PROFILE', profile)
        return done(null, profile)
    })
)

googleAuth.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }))
googleAuth.get("/google/callback", passport.authenticate('google', { failureRedirect: '/' }), oauthController.googleLogin)

module.exports = googleAuth
