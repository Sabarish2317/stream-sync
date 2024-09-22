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
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const newUser = new User({ email, passwordHash });
      await newUser.save();

      //Creating jwt token
      token = jwt.sign(
        {
          userId: newUser._id,
          email: newUser.email,
        },
        process.env.JWT_SECRET
        // { expiresIn: "48h" }
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
