\_archive - contains unused or should be deleted files to serve as back up

connection - contains the database.js, uses process.env.[name] with can be used with --env-file=.env when running locally

controllers - contains the controllers for the routes

middlewares - authCheck.js for route validation for protected routes. used in userRoutes.js with app.use(authCheck)

models - sequelize models

public - blank index.html

routes -
authRoutes - has /auth/login and /auth/signup with passport/passport-local
userRoutes -GET /users/ = all users
GET /users/:id = one user
POST /users/:id = update current user
POST /users/:id = update another user
DELETE /users/:id = delete current user
DELETE /users/:id = delete another user

utils - utils.js contains password hashing function

app.js - main
passport.js - login and signup handlers
