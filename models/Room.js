const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Room Schema
const RoomSchema = new Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true, // Ensure room number is unique
    },
    type: {
      type: String,
      enum: ["Single", "Double", "Suite"], // Room types
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available", // Default status is 'available'
    },
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident", // Reference to the Resident model
      default: null, // Initially no resident assigned
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the model
module.exports = mongoose.model("Room", RoomSchema);
