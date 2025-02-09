const Resident = require("../models/resident");
const Room = require("../models/room");
const mongoose = require("mongoose");


exports.getResidents = async (req, res) => {
  try {
    const residents = await Resident.find().populate("roomId"); 
    res.json(residents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


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

exports.createResident = async (req, res) => {
  const { name, contact, email } = req.body;

  try {
    
    const existingResident = await Resident.findOne({ email });
    if (existingResident) {
      return res
        .status(400)
        .json({ msg: "Resident with this email already exists" });
    }

    const newResident = new Resident({
      name,
      contact,
      email
    });
    
    await newResident.save();

    const customer = await Customer.findById(name);
    
    //send email
      await sendEmail({
        to: customer.email,
        subject: "Resident created",
        text: `Resident created on ${date} at ${time}`,
      });



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
    
    const resident = await Resident.findById(id);
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
    
    const resident = await Resident.findByIdAndDelete(id);
    if (!resident) {
      return res.status(404).json({ msg: "Resident not found" });
    }

    
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
