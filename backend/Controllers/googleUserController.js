const User = require("../Models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
// User login logic
exports.googleLogin = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists and password matches
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User does not exist try signing up" });
    } else {
      //Creating jwt token
      token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "48h" }
      );
      res
        .status(200)
        .json({ message: "User logged in successfully", token: token });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
    console.log(error);
  }
};

exports.googleSignup = async (req, res) => {
  try {
    const { email, name, profilePicture } = req.body;

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists try signing in" });
    } else {
      const newUser = new User({ email, name, profilePicture });
      await newUser.save();
      //Creating jwt token
      token = jwt.sign(
        {
          userId: newUser._id,
          email: newUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "48h" }
      );
      res
        .status(201)
        .json({ message: "User created successfully", token: token });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
    console.log(error);
  }
};
