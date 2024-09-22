const express = require("express");
const router = express.Router();
const signInController = require("../Controllers/signInController");
const signUpController = require("../Controllers/signUpController");
const homeController = require("./../Controllers/homeController.js");

// User Authentication routes
router.post("/signup", signUpController.signup);
router.post("/login", signInController.login);
// home route
router.get("/home", homeController.home);

module.exports = router;
