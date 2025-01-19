const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Maintenance Schema
const MaintenanceSchema = new Schema(
  {
    description: {
      type: String,
      required: true, // Description of the issue
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room", // Reference to the Room model
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"], // Valid statuses for maintenance requests
      default: "Pending", // Default status is 'Pending'
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation date
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically set the update date
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the model
module.exports = mongoose.model("Maintenance", MaintenanceSchema);
