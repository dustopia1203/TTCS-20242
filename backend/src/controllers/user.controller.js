const User = require("../models/User.js");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const isEmailTaken = await User.findOne({ email });
    if (isEmailTaken) {
      return res.status(400).json({ message: "Email existed!" });
    }
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
};
