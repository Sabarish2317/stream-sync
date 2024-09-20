const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: [true, "Please add a password"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
