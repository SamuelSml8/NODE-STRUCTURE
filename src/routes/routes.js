const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const auth = require("../middleware/auth.js");

router.get("/api/v1/users", auth.authenticate(), userController.getAllUsers);

router.get("/api/v1/users/id/:id", userController.getUserById);

router.get("/api/v1/users/name/:name", userController.getUserByName);

router.post("/api/v1/users", userController.createUser);

router.post("/register", userController.register);

router.post("/login", userController.login);

module.exports = router;
