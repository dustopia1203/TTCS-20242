const userRouter = require("./user.router");
const courseRouter = require("./course.router");

function route(app) {
  app.use("/api/user", userRouter);
  app.use("/api/course", courseRouter);
}

module.exports = route;
