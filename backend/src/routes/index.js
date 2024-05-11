const userRouter = require("./user.router");
const courseRouter = require("./course.router");
const orderRouter = require("./order.router");

function route(app) {
  app.use("/api/user", userRouter);
  app.use("/api/course", courseRouter);
  app.use("/api/order", orderRouter);
}

module.exports = route;
