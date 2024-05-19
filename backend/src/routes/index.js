const userRouter = require("./user.router");
const courseRouter = require("./course.router");
const orderRouter = require("./order.router");
const notificationRouter = require("./notification.router");
const layoutRouter = require("./layout.router");

function route(app) {
  app.use("/api/user", userRouter);
  app.use("/api/course", courseRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/notification", notificationRouter);
  app.use("/api/layout", layoutRouter);
}

module.exports = route;
