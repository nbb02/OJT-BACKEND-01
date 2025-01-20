const express = require("express")
const sequelize = require("./connection/database.js")
const userRoutes = require("./routes/folder-routes/userRoutes.js")
const authRoutes = require("./routes/folder-routes/authRoutes.js")
const passport = require("passport")

const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/users", userRoutes)
app.use("/auth", authRoutes)

require("./passport.js")
app.use(passport.initialize())

app.listen(3000, async () => {
  await sequelize.authenticate()
  // await sequelize.sync({ alter: true })
  console.log("Server is running on port 3000")
})
