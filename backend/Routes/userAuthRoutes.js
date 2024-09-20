const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userAuthControllers");

// User Authentication routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;
