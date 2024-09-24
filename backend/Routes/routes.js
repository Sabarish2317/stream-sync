const express = require("express");
const router = express.Router();
const signInController = require("../Controllers/signInController");
const signUpController = require("../Controllers/signUpController");
const homeController = require("./../Controllers/homeController.js");
const googleAuthController = require("./../Controllers/googleUserController");

// User Authentication routes
router.post("/signup", signUpController.signup);
router.post("/login", signInController.login);
// home route
router.get("/home", homeController.home);
// google auth routes
router.post("/oauth2/google/login", googleAuthController.googleLogin);
router.post("/oauth2/google/signup", googleAuthController.googleSignup);

module.exports = router;
