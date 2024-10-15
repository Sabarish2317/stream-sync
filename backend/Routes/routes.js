const express = require("express");
const router = express.Router();

const homeController = require("./../Controllers/homeController");
const signInController = require("./../Controllers/signInController");
const signUpController = require("./../Controllers/signupController");

// User Authentication routes
// router.post("/signup", signUpController.signup);
// router.post("/login", signInController.login);
// home route
router.get("/home", homeController.home);
// google auth routes
router.post("/signin", signInController.signIn);
router.post("/signup", signUpController.signUp);

module.exports = router;
