const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validationMiddleware");
const maintenanceController = require("../controllers/maintenanceController");

// Create a new maintenance request
router.post("/maintenance", maintenanceController.createMaintenanceRequest);


router.get("/maintenance", maintenanceController.getMaintenanceRequests);


router.get("/maintenance/:id",validateObjectId, maintenanceController.getMaintenanceRequestById);


router.put(
  "/maintenance/:id/status",validateObjectId,
  maintenanceController.updateMaintenanceRequestStatus
);


router.delete(
  "/maintenance/:id",validateObjectId,
  maintenanceController.deleteMaintenanceRequest
);

module.exports = router;
