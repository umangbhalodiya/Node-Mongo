const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  { skill: String, skillType: String },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  }
);
module.exports = mongoose.model("skills", skillSchema);
