const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const auth = require("../middleware/authMiddleware")

router.get("/rooms/available", roomController.getAvailableRooms);

router.post("/rooms/allocate", roomController.allocateRoom);
//router.get("/rooms/:roomNumber", roomController.getRoomByNumber);

router.post(
  '/',
   // Only admins and managers can create rooms
  roomController.createRoom
);

router.put(
  '/status',
  auth.checkAuth,
  auth.allowRoles(['admin', 'manager']), 
  roomController.updateRoomStatus
);

// Delete a room (restricted to admin)
router.delete(
  '/:roomNumber',
  auth.checkAuth,
  auth.allowRoles(['admin']), 
  roomController.deleteRoom
);

module.exports = router;
