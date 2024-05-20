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

const getAllUsersService = async (res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    users,
  });
};

const updateUserRoleService = async (id, role, res) => {
  const user = await User.findByIdAndUpdate(id, { role }, { new: true });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    success: true,
    user,
  });
};

module.exports = { getUserById, getAllUsersService, updateUserRoleService };
