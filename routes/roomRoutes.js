const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const auth = require("../middleware/authMiddleware")

router.get("/rooms/available", roomController.getAvailableRooms);

router.post("/rooms/allocate", roomController.allocateRoom);
router.get("/rooms/:roomNumber", roomController.getRoomByNumber);

router.post(
  '/rooms',
  
  roomController.createRoom
);

router.put(
  '/rooms/:roomNumber/status',
 
  roomController.updateRoomStatus
);

// Delete a room (restricted to admin)
router.delete(
  '/rooms/:roomNumber',
  auth.checkAuth,
  auth.allowRoles(['admin']), 
  roomController.deleteRoom
);

module.exports = router;
