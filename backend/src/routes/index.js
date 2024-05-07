const userRouter = require("./user.router");

function route(app) {
  app.use("/api/user", userRouter);
}

module.exports = route;
