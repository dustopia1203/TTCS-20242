require("dotenv").config();
const app = require("./app");
const db = require("./utils/db");

const port = process.env.PORT || 8080;

db.connect();

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
