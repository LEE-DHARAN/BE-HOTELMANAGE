const express = require("express");
const router = express.Router();
const residentController = require("../controllers/residentController");
const validateObjectId = require("../middleware/validationMiddleware");

// Create a new resident
router.post("/resident", residentController.createResident);

// Get a specific resident by ID
router.get("/resident/:id",validateObjectId, residentController.getResidents);

// Update a resident's information
router.put("/resident/:id",validateObjectId, residentController.updateResident);

// Delete a resident and free up the room
router.delete("/resident/:id",validateObjectId, residentController.deleteResident);

module.exports = router;
