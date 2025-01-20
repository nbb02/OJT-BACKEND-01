const jwt = require("jsonwebtoken")

module.exports = async function authCheck(req, res, next) {
  const { authorization } = req.headers

  const token = authorization && authorization.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" })
    }

    req.user = user

    return next()
  })
}
