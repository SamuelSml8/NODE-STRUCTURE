const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.get("/api/v1/users", userController.getAllUsers);

router.get("/api/v1/users/id/:id", userController.getUserById);

router.get("/api/v1/users/name/:name", userController.getUserByName);

router.post("/api/v1/users", userController.createUser);

router.patch("/api/v1/users/update/:name", userController.updateUser);

router.delete("/api/v1/users/delete/:name", userController.deleteUser)

module.exports = router;