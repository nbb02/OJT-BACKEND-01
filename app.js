import express from "express"
import sequelize from "./connection/database.js"

const app = express()

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use(express.static("public"))

app.listen(3000, async () => {
  await sequelize.authenticate()
  console.log("Server is running on port 3000")
})
