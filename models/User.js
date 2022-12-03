const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
    max: 225,
  },
  email: {
    type: String,
    required: true,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);
