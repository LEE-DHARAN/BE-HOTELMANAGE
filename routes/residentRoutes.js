const express = require("express");
const router = express.Router();
const residentController = require("../controllers/residentController");
const validateObjectId = require("../middleware/validationMiddleware");

// Create a new resident
router.get("/resident", residentController.getResidents);


router.post("/resident", residentController.createResident);


// router.put("/resident/:id",validateObjectId, residentController.updateResident);


// router.delete("/resident/:id",validateObjectId, residentController.deleteResident);

module.exports = router;
