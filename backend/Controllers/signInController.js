const User = require("../Models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
// User login logic
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    4;
    console.log(email, password);

    // Check if user exists and password matches
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User does not exist try signing up" });
    }
    const hashedPassword = await bcrypt.compare(password, user.passwordHash);
    //password and username doesnt match
    if (!hashedPassword) {
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
