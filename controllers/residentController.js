const Resident = require("../models/resident");
const Room = require("../models/room"); // Assuming we need to check room status

// Create a new resident
exports.createResident = async (req, res) => {
  const { name, contact, roomId } = req.body;

  // Validate required fields
  if (!name || !contact || !roomId) {
    return res
      .status(400)
      .json({ msg: "Name, Contact, and RoomId are required" });
  }

  try {
    // Check if the room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    // Check if the room is already occupied
    if (room.status === "occupied") {
      return res.status(400).json({ msg: "Room is already occupied" });
    }

    // Create a new resident
    const resident = new Resident({
      name,
      contact,
      roomId,
    });

    // Save the resident
    await resident.save();

    // Update room status to "occupied" since it's assigned to a resident
    room.status = "occupied";
    await room.save();

    // Return the created resident data
    res.status(201).json(resident);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Get a specific resident by ID
exports.getResident = async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id).populate("roomId");

    // Check if the resident exists
    if (!resident) {
      return res.status(404).json({ msg: "Resident not found" });
    }

    // Return the resident data
    res.json(resident);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Update a resident's information
exports.updateResident = async (req, res) => {
  const { name, contact, roomId } = req.body;

  // Validate required fields
  if (!name || !contact || !roomId) {
    return res
      .status(400)
      .json({ msg: "Name, Contact, and RoomId are required" });
  }

  try {
    // Check if the resident exists
    const resident = await Resident.findById(req.params.id);
    if (!resident) {
      return res.status(404).json({ msg: "Resident not found" });
    }

    // Update the resident's details
    resident.name = name || resident.name;
    resident.contact = contact || resident.contact;
    resident.roomId = roomId || resident.roomId;

    // Save the updated resident information
    await resident.save();

    // Return the updated resident data
    res.json(resident);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Delete a resident and free up the room
exports.deleteResident = async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);

    // Check if the resident exists
    if (!resident) {
      return res.status(404).json({ msg: "Resident not found" });
    }

    // Get the room assigned to the resident
    const room = await Room.findById(resident.roomId);

    // Free up the room by changing its status
    if (room) {
      room.status = "available";
      await room.save();
    }

    // Delete the resident from the database
    await resident.remove();

    // Return a success message
    res.json({ msg: "Resident deleted and room is now available" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
