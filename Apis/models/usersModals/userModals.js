const { boolean } = require("joi");
const mongoose = require("mongoose");
const users = require("../../controllers/users/users");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    contact: Number,
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  }
);
module.exports = mongoose.model("users", userSchema);
