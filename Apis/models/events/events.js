const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  { name: String, desc: String, startDate: String, endDate: String },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  }
);
module.exports = mongoose.model("events", eventSchema);
