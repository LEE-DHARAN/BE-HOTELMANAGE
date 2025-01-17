const express = require("express");
const router = express.Router();
const {
  createRequest,
  getRequests,
} = require("../controllers/maintenanceController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, createRequest);
router.get('/', authMiddleware, roleMiddleware(['admin']), getRequests);

module.exports = router;
