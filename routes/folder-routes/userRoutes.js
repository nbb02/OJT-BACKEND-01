const express = require("express")
const userController = require("../../controllers/userController.js")
const authCheck = require("../../middlewares/authCheck.js")

const router = express.Router()

router.use(authCheck)
router.get("/", userController.getUsers)
router.put("/", userController.updateUser)
router.delete("/", userController.deleteUser)

module.exports = router
