const express = require("express")
const authController = require("../../controllers/authController.js")
const passport = require("passport")
const jwt = require("jsonwebtoken")

const router = express.Router()

router.post("/signup", (req, res, next) => {
  passport.authenticate("signup", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "Login failed",
      })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    return res.status(200).json({ message: "Logged in", token: token })
  })(req, res, next)
})

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "Login failed",
      })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    return res.status(200).json({ message: "Logged in", token: token })
  })(req, res, next)
})

module.exports = router
