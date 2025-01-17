const mongoose = require("mongoose");

const maintenanceRequestSchema = new mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resident",
    required: true,
  },
  issue: { type: String, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
  status: {
    type: String,
    enum: ["pending", "in-progress", "resolved"],
    default: "pending",
  },
});

module.exports = mongoose.model("MaintenanceRequest", maintenanceRequestSchema);
