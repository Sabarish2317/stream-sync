const User = require("../Models/userModel");
require("dotenv").config();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// User signup logic
exports.signUp = async (req, res) => {
  try {
    const { email, password, oAuthProfileurl } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists, try signing in." });
    }
    if (!password && !oAuthProfileurl) {
      return res.status(401).json({ message: "Enter the password" });
    }

    // Create a new user
    const name = email.split("@" || "_" || ".")[0];
    let passwordHash = null;
    if (password) {
      passwordHash = await bcrypt.hash(password, saltRounds);
    }

    // Fetch profile picture
    const imageUrl = oAuthProfileurl
      ? oAuthProfileurl
      : `https://api.multiavatar.com/${email}.com.svg`;

    // Fetch the image
    const response = await axios({
      method: "get",
      url: imageUrl,
      responseType: "arraybuffer",
    });

    const base64Image = Buffer.from(response.data).toString("base64");
    // Create the new user
    const newUser = new User({
      email,
      passwordHash: oAuthProfileurl ? null : passwordHash,
      name,
      profilePicture: {
        img: {
          data: base64Image, // Convert response data to Buffer
          contentType: oAuthProfileurl ? "base64" : "image/svg+xml", // Get MIME type from response headers
        },
      },
    });

    // Save the new user to MongoDB
    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "48h" }
    );

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating user, try again later", error });
  }
};
