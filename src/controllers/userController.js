const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_Secret = ".*#/$=1sMl*!$%&/($DF";

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

  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const userFound = await User.findById(userId);

      if (!userFound) {
        return res.status(404).json({
          ok: false,
          message: "User not found",
          data: null,
        });
      }

      return res.status(200).json({
        ok: true,
        message: "User found",
        data: userFound,
      });
    } catch (error) {
      console.error("Error getting user by id: ", error);
      res.status(500).json({
        ok: false,
        message: "Internal Server error",
        data: null,
      });
    }
  },

  getUserByName: async (req, res) => {
    try {
      const userName = req.params.name;
      const userFound = await User.findOne({ name: userName });

      if (!userFound) {
        return res.status(404).json({
          ok: false,
          message: "User not found",
          data: null,
        });
      }

      return res.status(200).json({
        ok: true,
        message: "User found",
        data: userFound,
      });
    } catch (error) {
      console.log("Error getting user by name: ", error);
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
  register: async (req, res) => {
    try {
      const users = await User.find();

      const { name, email, password } = req.body;
      const userData = {
        userId: users.length + 1,
        name: name,
        email: email,
        password: await bcrypt.hash(password, 10),
      };

      const newUser = new User(userData);
      const savedUser = await newUser.save();

      res.status(201).json({
        ok: true,
        message: "User created",
        data: savedUser,
      });
    } catch (error) {
      console.log("Error registering user", error);
      res.status(500).json({
        ok: false,
        message: "Error Internal Server",
        data: null,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userFound = await User.find({ email: email });

      if (!userFound) {
        return res.status(400).json({
          ok: false,
          message: "email or password incorrect",
          data: null,
        });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        userFound[0].password
      );

      if (!isPasswordValid) {
        return res.status(500).json({
          ok: false,
          message: "email or password incorrect",
          data: null,
        });
      }

      const token = jwt.sign({ userId: userFound.id }, jwt_Secret, {
        expiresIn: "1h",
      });

      res.status(200).json({
        ok: true,
        message: "User login succesfully",
        token: token,
        data: userFound,
      });
    } catch (error) {
      console.log("Error login user ", error);
      res.status(500).json({
        ok: false,
        message: "Error Internal Server",
        data: null,
      });
    }
  },
};

module.exports = userController;
