const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Room Schema
const RoomSchema = new Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true, 
    },
    type: {
      type: String,
      enum: ["Single", "Double", "Suite"], 
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available", 
    },
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Residents", 
      default: null, 
    },
  },
  { timestamps: true } 
);


module.exports = mongoose.model("Rooms", RoomSchema);
