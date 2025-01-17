const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ["single", "shared"], required: true },
  floor: { type: Number, required: true },
  status: {
    type: String,
    enum: ["available", "occupied", "maintenance"],
    default: "available",
  },
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident" },
});

module.exports = mongoose.model("Room", roomSchema);
