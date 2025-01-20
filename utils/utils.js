const bcryptjs = require("bcryptjs")

function hashPassword(password) {
  const salt = bcryptjs.genSaltSync(10)
  const hashedPassword = bcryptjs.hashSync(password, salt)
  return hashedPassword
}

module.exports = {
  hashPassword,
}
