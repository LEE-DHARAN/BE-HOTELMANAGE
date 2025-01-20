const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const auth = require("../middleware/authMiddleware")
// Route to get all available rooms
router.get("/rooms/available", roomController.getAvailableRooms);

// Route to allocate a room to a resident
router.post("/rooms/allocate", roomController.allocateRoom);

// Get a specific room by room number
router.get('/:roomNumber', auth.checkAuth, roomController.getRoomByNumber);

// Create a new room (restricted to admin or manager)
router.post(
  '/',
   // Only admins and managers can create rooms
  roomController.createRoom
);

// Update room status (e.g., mark room as available or occupied)
router.put(
  '/status',
  auth.checkAuth,
  auth.allowRoles(['admin', 'manager']), // Only admins and managers can update room status
  roomController.updateRoomStatus
);

// Delete a room (restricted to admin)
router.delete(
  '/:roomNumber',
  auth.checkAuth,
  auth.allowRoles(['admin']), // Only admins can delete rooms
  roomController.deleteRoom
);


module.exports = router;
