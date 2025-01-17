const express = require("express");
const router = express.Router();
const {
  getAvailableRooms,
  allocateRoom,
} = require("../controllers/roomController");

router.get("/available", getAvailableRooms);
router.post("/allocate", allocateRoom);

module.exports = router;
