const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Maintenance Schema
const MaintenanceSchema = new Schema(
  {
    description: {
      type: String,
      required: true, 
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rooms", 
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"], 
      default: "Pending", 
    },
    createdAt: {
      type: Date,
      default: Date.now, 
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } 
);

// Create and export the model
module.exports = mongoose.model("Maintenances", MaintenanceSchema);
