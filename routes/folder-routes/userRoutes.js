const express = require("express")
const userController = require("../../controllers/userController.js")
const authCheck = require("../../middlewares/authCheck.js")

const router = express.Router()

router.use(authCheck)
router.get("/", userController.getUsers)
router.put("/", userController.updateUser)
router.delete("/", userController.deleteUser)
router.get("/:id", userController.getUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)

module.exports = router
