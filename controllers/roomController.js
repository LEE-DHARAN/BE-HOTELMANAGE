const Room = require("../models/Room");

exports.getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ status: "available" });
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.allocateRoom = async (req, res) => {
  const { roomNumber, residentId } = req.body;

  try {
    const room = await Room.findOne({ roomNumber });
    if (room.status !== "available")
      return res.status(400).json({ msg: "Room not available" });

    room.status = "occupied";
    room.residentId = residentId;
    await room.save();

    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
