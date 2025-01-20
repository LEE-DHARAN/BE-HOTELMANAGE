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
      unique: true, // Ensure email is unique
      required: true,
    },
   roomId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Room", // Reference to the Room model
      required: true,
   },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the model
module.exports = mongoose.model("Resident", ResidentSchema);
