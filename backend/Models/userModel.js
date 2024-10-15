const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    // select: false,
  },
  profilePicture: {
    img: {
      data: String,
      contentType: String,
    },
  },
  roomsCreated: {
    type: Number,
    default: 0,
  },
  friends: {},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
