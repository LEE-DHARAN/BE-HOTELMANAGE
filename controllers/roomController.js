const Room = require("../models/room");
const Resident = require("../models/resident");
const mongoose = require('mongoose');

exports.getAvailableRooms = async (req, res) => {
  try {
    
    const rooms = await Room.find({ status: "available" });
    
    if (rooms.length === 0) {
      return res.status(404).json({ msg: "No available rooms found" });
    }

    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Allocate a room to a resident
exports.allocateRoom = async (req, res) => {
  const { roomId, residentId } = req.body;

  // Validate ObjectId format
  if (
    !mongoose.Types.ObjectId.isValid(roomId) ||
    !mongoose.Types.ObjectId.isValid(residentId)
  ) {
    return res.status(400).json({ msg: "Invalid room ID or resident ID" });
  }

  if (!roomId || !residentId) {
    return res
      .status(400)
      .json({ msg: "Room ID and resident ID are required" });
  }

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    if (room.status !== "available") {
      return res.status(400).json({ msg: "Room not available for allocation" });
    }

    const resident = await Resident.findById(residentId);

    if (!resident) {
      return res.status(404).json({ msg: "Resident not found" });
    }

    room.status = "occupied";
    room.residentId = resident._id;
    await room.save();

    resident.roomId = room._id;
    await resident.save();

    res.json({
      msg: "Room successfully allocated",
      room,
      resident,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};



exports.getRoomByNumber = async (req, res) => {
  const { roomNumber } = req.params;
  try {
    const room = await Room.findOne({ roomNumber });
    if (!room) {
      return res.status(404).json({ msg: "Room not found2" });
    }
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


exports.createRoom = async (req, res) => {
  const { roomNumber, type, price, status, residentId } = req.body;
  
  try {
    
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

// Update room status
exports.updateRoomStatus = async (req, res) => {
  // Extract roomNumber from URL parameters and status from the request body
  const { roomNumber } = req.params; // roomNumber comes from the URL params
  const { status } = req.body; // status comes from the request body

  try {
    // Find the room by roomNumber
    const room = await Room.findOne({ roomNumber });
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    // Update the room status
    room.status = status;
    await room.save();

    // Send back the updated room
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
      return res.status(404).json({ msg: "Room not found4" });
    }

    res.json({ msg: "Room deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
