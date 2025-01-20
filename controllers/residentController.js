const Resident = require("../models/Resident");
const Room = require("../models/room");
const mongoose = require("mongoose");

// Get all residents
exports.getResidents = async (req, res) => {
  try {
    const residents = await Resident.find().populate("roomId"); // Populate room details
    res.json(residents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Get a specific resident by ID
exports.getResidentById = async (req, res) => {
  const { id } = req.params;
  try {
    const resident = await Resident.findById(id).populate("roomId");
    if (!resident) {
      return res.status(404).json({ msg: "Resident not found" });
    }
    res.json(resident);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Create a new resident
exports.createResident = async (req, res) => {
  const { name, contact, email, roomId } = req.body;

  try {
    // Check if the resident email already exists
    const existingResident = await Resident.findOne({ email });
    if (existingResident) {
      return res
        .status(400)
        .json({ msg: "Resident with this email already exists" });
    }

    // Check if the room exists and is available
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    if (room.status !== "available") {
      return res.status(400).json({ msg: "Room is not available" });
    }

    // Create new resident
    const newResident = new Resident({
      name,
      contact,
      email,
      roomId,
    });

    // Update the room status to occupied
    room.status = "occupied";
    await room.save();

    // Save the resident
    await newResident.save();

    res.status(201).json(newResident);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Update a resident's details
exports.updateResident = async (req, res) => {
  const { id } = req.params;
  const { name, contact, email, roomId } = req.body;

  try {
    // Find resident by ID
    const resident = await Resident.findById(id);
    if (!resident) {
      return res.status(404).json({ msg: "Resident not found" });
    }

    // Update resident details
    resident.name = name || resident.name;
    resident.contact = contact || resident.contact;
    resident.email = email || resident.email;
    resident.roomId = roomId || resident.roomId;

    await resident.save();

    res.json(resident);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Delete a resident
exports.deleteResident = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete resident by ID
    const resident = await Resident.findByIdAndDelete(id);
    if (!resident) {
      return res.status(404).json({ msg: "Resident not found" });
    }

    // Find the associated room and mark it as available
    const room = await Room.findById(resident.roomId);
    if (room) {
      room.status = "available";
      await room.save();
    }

    res.json({ msg: "Resident deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
