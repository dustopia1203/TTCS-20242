const User = require("../models/User.js");

const getUserById = async (id, res) => {
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    sucess: true,
    user,
  });
};

module.exports = { getUserById };
