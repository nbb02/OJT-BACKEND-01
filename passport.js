const passport = require("passport")
const { Strategy } = require("passport-local")
const User = require("./models/User")
const bcryptjs = require("bcryptjs")
const { hashPassword } = require("./utils/utils")

passport.use(
  new Strategy(
    {
      session: false,
    },
    async (username, password, done) => {
      try {
        if (!username || !password) {
          done(null, false, { message: "Missing credentials" })
        }

        const user = await User.findOne({ where: { username } })

        if (!user) {
          return done(null, false, { message: "User not found" })
        }

        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
          return done(null, false, { message: "Invalid password" })
        }

        return done(null, user)
      } catch (error) {
        console.error(error)
        done(error)
      }
    }
  )
)

passport.use(
  "signup",
  new Strategy(
    {
      passReqToCallback: true,
      session: false,
    },
    async function (req, username, password, done) {
      try {
        const { first_name, last_name, birthday, username, password } = req.body

        if (!first_name || !last_name || !birthday || !username || !password) {
          done(null, false, { message: "Missing required information" })
        }

        const birthdayDate = new Date(birthday)
        if (isNaN(birthdayDate.getTime()) || birthdayDate > new Date()) {
          done(null, false, { message: "Invalid birthday date" })
        }

        if (password.length < 8) {
          done(null, false, {
            message: "Password must have at least 8 characters",
          })
        }

        const exists = await User.findOne({ where: { username } })

        if (exists) {
          done(null, false, { message: "Username already exists" })
        }

        const hashedPassword = hashPassword(password)

        const newUser = await User.create({
          first_name,
          last_name,
          birthday,
          username,
          password: hashedPassword,
        })

        done(null, newUser)

        // const token = jwt.sign(
        //   { id: newUser.id, username },
        //   process.env.JWT_SECRET,
        //   {
        //     expiresIn: process.env.JWT_EXPIRES_IN,
        //   }
        // )

        // return res.status(200).json({
        //   message: `User ${newUser.first_name} ${newUser.last_name} created successfully`,
        //   token,
        // })
      } catch (error) {
        console.error(error)
        done(error)
      }
    }
  )
)
