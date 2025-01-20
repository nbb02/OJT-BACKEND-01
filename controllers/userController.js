const User = require("../models/User.js")
const { hashPassword } = require("../utils/utils.js")

async function getUsers(req, res) {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  })
  return res.json(users)
}
async function updateUser(req, res) {
  try {
    const { id } = req.user

    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const userUpdate = {}

    const userFields = [
      "first_name",
      "last_name",
      "birthday",
      "username",
      "password",
    ]

    for (const field of userFields) {
      if (!req.body[field]) continue

      if (field === "birthday") {
        const birthdayDate = new Date(birthday)
        if (isNaN(birthdayDate.getTime()) || birthdayDate > new Date()) {
          return res.status(400).json({ error: "Invalid birthday date" })
        }
      }

      if (req.body[field] === "password") {
        if (req.body[field].length < 8) {
          return res
            .status(400)
            .json({ error: "Password must have at least 8 characters" })
        }
        userUpdate[field] = hashPassword(req.body[field])
      }

      userUpdate[field] = req.body[field]
      user[field] = req.body[field]
    }

    await user.save()

    return res.status(200).json({
      updateUser,
      message: `User ${user.username} - ${user.first_name} ${user.last_name} updated successfully`,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
async function deleteUser(req, res) {
  try {
    const { id } = req.user

    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    await user.destroy()

    return res.status(200).json({
      message: `User ${user.username} - ${user.first_name} ${user.last_name} deleted successfull`,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

const userController = {
  getUsers,
  updateUser,
  deleteUser,
}
module.exports = userController
