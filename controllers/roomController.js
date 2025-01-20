const Room = require("../models/room");

// Get all available rooms
exports.getAvailableRooms = async (req, res) => {
  try {
    // Fetch rooms where status is "available"
    const rooms = await Room.find({ status: "available" });

    // If no rooms are available, send an appropriate response
    if (rooms.length === 0) {
      return res.status(404).json({ msg: "No available rooms found" });
    }

    // Return the list of available rooms
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Allocate a room to a resident
exports.allocateRoom = async (req, res) => {
  const { roomNumber, residentId } = req.body;

  // Validate incoming data
  if (!roomNumber || !residentId) {
    return res
      .status(400)
      .json({ msg: "Room number and resident ID are required" });
  }

  try {
    // Find the room by room number
    const room = await Room.findOne({ roomNumber });

    // If room doesn't exist, return an error
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    // Check if the room is available for allocation
    if (room.status !== "available") {
      return res.status(400).json({ msg: "Room not available for allocation" });
    }

    // Update room status and assign resident ID
    room.status = "occupied";
    room.residentId = residentId;

    // Save the updated room data
    await room.save();

    // Return the updated room data
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Get a specific room by room number
exports.getRoomByNumber = async (req, res) => {
  const { roomNumber } = req.params;
  try {
    const room = await Room.findOne({ roomNumber });
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Create a new room
exports.createRoom = async (req, res) => {
  const { roomNumber, type, price, status, residentId } = req.body;
  
  try {
    // Check if the room number already exists
    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(400).json({ msg: "Room with this number already exists" });
    }

    // Create a new room
    const newRoom = new Room({
      roomNumber,
      type,
      price,
      status,
      residentId
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Update room status (e.g., mark a room as available or occupied)
exports.updateRoomStatus = async (req, res) => {
  const { roomNumber, status } = req.body;

  try {
    const room = await Room.findOne({ roomNumber });
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    room.status = status;  // status can be 'available' or 'occupied'
    await room.save();

    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Delete a room
exports.deleteRoom = async (req, res) => {
  const { roomNumber } = req.params;

  try {
    const room = await Room.findOneAndDelete({ roomNumber });
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    res.json({ msg: "Room deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
