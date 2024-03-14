const User = require("../models/userModel.js");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json({
        ok: true,
        message: "All users",
        data: users,
      });
    } catch (error) {
      console.error("Error al crear usuario: ", error);
      res.status(500).json({
        ok: false,
        message: "Internal Server error",
        data: null,
      });
    }
  },

  createUser: async (req, res) => {
    const userData = req.body;
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      res.status(201).json({
        ok: true,
        message: "User created",
        data: savedUser,
      });
    } catch (error) {
      console.error("Error al crear usuario: ", error);
      res.status(500).json({
        ok: false,
        message: "Internal Server error",
        data: null,
      });
    }
  },
};

module.exports = userController;
