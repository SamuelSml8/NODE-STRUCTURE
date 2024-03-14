const express = require("express");
const router = express.router();
const userController = require("../controllers(userController");

router.get("/api/v1/users", userController.getAllUser);

module.exports = router;
