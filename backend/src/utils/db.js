const mongoose = require("mongoose");
require("dotenv").config();

const db_url = process.env.DB_URL;

async function connect() {
  try {
    await mongoose.connect(db_url);
    console.log("Database connected sucessfully!");
  } catch (e) {
    console.log("Connect failed\n" + e);
  }
}

module.exports = { connect };
