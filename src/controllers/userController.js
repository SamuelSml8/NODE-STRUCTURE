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
};

module.exports = userController;