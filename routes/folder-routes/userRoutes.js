import express from "express"
import userController from "../../controllers/userController.js"
import authCheck from "../../middlewares/authCheck.js"

const router = express.Router()

router.use(authCheck)
router.get("/", userController.getUsers)
router.put("/", userController.updateUser)
router.delete("/", userController.deleteUser)

export default router
