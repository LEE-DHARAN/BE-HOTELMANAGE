const express = require("express");
const router = express.Router();
const maintenanceController = require("../controllers/maintenanceController");

// Create a new maintenance request
router.post("/maintenance", maintenanceController.createMaintenanceRequest);

// Get all maintenance requests (can filter by status)
router.get("/maintenance", maintenanceController.getMaintenanceRequests);

// Get a specific maintenance request by ID
router.get("/maintenance/:id", maintenanceController.getMaintenanceRequestById);

// Update the status of a maintenance request
router.put(
  "/maintenance/:id/status",
  maintenanceController.updateMaintenanceRequestStatus
);

// Delete a maintenance request
router.delete(
  "/maintenance/:id",
  maintenanceController.deleteMaintenanceRequest
);

module.exports = router;
