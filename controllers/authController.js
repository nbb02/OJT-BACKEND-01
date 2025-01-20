import User from "../models/User.js"
import { hashPassword } from "../utils/utils.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

async function signup(req, res) {
  try {
    const { first_name, last_name, birthday, username, password } = req.body

    if (!first_name || !last_name || !birthday || !username || !password) {
      return res.status(400).json({ error: "Missing required information" })
    }

    const birthdayDate = new Date(birthday)
    if (isNaN(birthdayDate.getTime()) || birthdayDate > new Date()) {
      return res.status(400).json({ error: "Invalid birthday date" })
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must have at least 8 characters" })
    }

    const exists = await User.findOne({ where: { username } })

    if (exists) {
      return res.status(400).json({ error: "Username already exists" })
    }

    const hashedPassword = hashPassword(password)

    const newUser = await User.create({
      first_name,
      last_name,
      birthday,
      username,
      password: hashedPassword,
    })

    const token = jwt.sign(
      { id: newUser.id, username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    )

    return res.status(200).json({
      message: `User ${newUser.first_name} ${newUser.last_name} created successfully`,
      token,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: "Missing required information" })
    }

    const user = await User.findOne({ where: { username } })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" })
    }

    const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    return res.status(200).json({
      token,
      message: `User ${user.first_name} ${user.last_name} logged in successfully`,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

const authController = {
  signup,
  login,
}
export default authController
