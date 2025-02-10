const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Resident Schema
const ResidentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rooms",
      required: false,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Residents", ResidentSchema);
