const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.get("/api/v1/users", userController.getAllUsers);

router.get("/api/v1/users/id/:id", userController.getUserById);

router.get("/api/v1/users/name/:name", userController.getUserByName);

router.post("/api/v1/users", userController.createUser);

module.exports = router;
