const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

// Route to get all available rooms
router.get("/rooms/available", roomController.getAvailableRooms);

// Route to allocate a room to a resident
router.post("/rooms/allocate", roomController.allocateRoom);

module.exports = router;
