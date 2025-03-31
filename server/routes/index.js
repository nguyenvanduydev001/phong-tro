const user = require("./user")
const common = require("./app")
const insert = require("./insert")
const post = require("./post")
const comment = require("./comment")
const { notFound, errorHandler } = require("../middleware/errhandler")

const initWebRoutes = (app) => {
  app.use("/api/comment", comment)
  app.use("/api/post", post)
  app.use("/api/insert", insert)
  app.use("/api/common", common)
  app.use("/api/user", user)

  app.use(notFound)
  app.use(errorHandler)
}

module.exports = initWebRoutes
