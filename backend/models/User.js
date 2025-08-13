// const mongoose = require("mongoose");
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // basic email format check
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/ // validates 10-digit phone number
  },
  profilePhoto: {
    type: String, // store image URL or file path
    default: null
  }
}, {
  timestamps: true // automatically adds createdAt & updatedAt
});

// module.exports = mongoose.model("User", userSchema);
export default mongoose.model("User", userSchema);