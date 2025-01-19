const express = require("express");
const router = express.Router();
const residentController = require("../controllers/residentController");

// Create a new resident
router.post("/resident", residentController.createResident);

// Get a specific resident by ID
router.get("/resident/:id", residentController.getResident);

// Update a resident's information
router.put("/resident/:id", residentController.updateResident);

// Delete a resident and free up the room
router.delete("/resident/:id", residentController.deleteResident);

module.exports = router;
