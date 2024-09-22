const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    // select: false,
  },
  profilePicture: {
    type: String,
  },
  oauth: {
    provider: {
      type: String,
    },
    providerId: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
