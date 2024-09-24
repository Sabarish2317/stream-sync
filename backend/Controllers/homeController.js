const User = require("../Models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
// Middleware to verify token and extract user info
exports.home = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token expired or invalid , try loggin in again " });
  } else {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      } else {
        const email = decoded.email;
        const user = await User.findOne({ email });

        // sending the response back to the user for login with profile,email and id
        // Formatting the date
        const dateObj = new Date(user.createdAt);

        const formattedDate = dateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        res.status(200).json({
          userId: user._id,
          email: user.email,
          name: user.name,
          joinedAt: formattedDate,
          pfp: user.profilePicture,
          roomsCreated: user.roomsCreated,
          friends: user.friends,
          message: "User logged in successfully",
          //   token: token
        });
      }
    });
  }
};
