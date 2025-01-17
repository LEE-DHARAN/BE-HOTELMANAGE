const express = require("express");
const router = express.Router();
const {
  getAvailableRooms,
  allocateRoom,
} = require("../controllers/roomController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/available", getAvailableRooms);

router.post(
  "/allocate",
  authMiddleware,
  roleMiddleware(["admin", "staff"]),
  allocateRoom
);



module.exports = router;
