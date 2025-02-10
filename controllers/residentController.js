const Residents = require("../models/resident.js");
const Rooms = require("../models/room.js");
const mongoose = require("mongoose");


exports.getResidents = async (req, res) => {
  try {
    const residents = await Residents.find().populate("roomId"); 
    res.json(residents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


exports.getResidentById = async (req, res) => {
  const { id } = req.params;
  try {
    const resident = await Residents.findById(id).populate("roomId");
    if (!resident) {
      return res.status(404).json({ msg: "Resident not found" });
    }
    res.json(resident);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.createResident = async (req, res) => {
  const { name, contact, email } = req.body;

  try {
    
    const existingResident = await Residents.findOne({ email });
    if (existingResident) {
      return res
        .status(400)
        .json({ msg: "Resident with this email already exists" });
    }

    const newResident = new Residents({
      name,
      contact,
      email
    });
    
    await newResident.save();

   



    res.status(201).json(newResident);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


// exports.createResident = async (req, res) => {
//   const { name, contact, email, roomId } = req.body;

//   try {
    
//     const existingResident = await Resident.findOne({ email });
//     if (existingResident) {
//       return res
//         .status(400)
//         .json({ msg: "Resident with this email already exists" });
//     }

//     const room = await Room.findById(roomId);
//     if (!room) {
//       return res.status(404).json({ msg: "Room not found" });
//     }

//     if (room.status !== "available") {
//       return res.status(400).json({ msg: "Room is not available" });
//     }

//     const newResident = new Resident({
//       name,
//       contact,
//       email,
//       roomId,
//     });

//     room.status = "occupied";
//     await room.save();

    
//     await newResident.save();

//     res.status(201).json(newResident);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// };


exports.updateResident = async (req, res) => {
  const { id } = req.params;
  const { name, contact, email, roomId } = req.body;

  try {
    
    const resident = await Residents.findById(id);
    if (!resident) {
      return res.status(404).json({ msg: "Resident not found" });
    }

    
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


exports.deleteResident = async (req, res) => {
  const { id } = req.params;

  try {
    
    const resident = await Residents.findByIdAndDelete(id);
    if (!resident) {
      return res.status(404).json({ msg: "Resident not found" });
    }

    
    const room = await Rooms.findById(resident.roomId);
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
