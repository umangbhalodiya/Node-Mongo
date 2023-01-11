const { boolean } = require("joi");
const mongoose = require("mongoose");
const users = require("../../controllers/users/users");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    userName: String,
    password: String,
    contact: Number,
    isActive: { type: Boolean, default: true },
    locations: [
      {
        place: String,
        coordinates: [],
        area: Number,
        width: Number,
        lgth: Number,
        // type: { type: String, default: [] },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  }
);
module.exports = mongoose.model("users", userSchema);
