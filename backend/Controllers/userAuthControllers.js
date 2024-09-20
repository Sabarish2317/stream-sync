const User = require("../Models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const saltRounds = 10;
// User signup logic
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists try signing in  " });
    } else {
      // Create a new user
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({ email, hashedPassword });
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
    console.log(error);
    res.status(500).json({ message: "Error creating user try later", error });
  }
};

// User login logic
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and password matches
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User does not exist try signing up" });
    }
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    //password and username doesnt match
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
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
