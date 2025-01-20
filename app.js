import express from "express"
import sequelize from "./connection/database.js"
import userRoutes from "./routes/folder-routes/userRoutes.js"
import authRoutes from "./routes/folder-routes/authRoutes.js"

const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/users", userRoutes)
app.use("/auth", authRoutes)

app.listen(3000, async () => {
  await sequelize.authenticate()
  // await sequelize.sync({ alter: true })
  console.log("Server is running on port 3000")
})
