const Maintenance = require("../models/maintenance");
const Room = require("../models/room");
const sendEmail = require("../utils/sendEmail");


exports.createMaintenanceRequest = async (req, res) => {
  const { description, roomNumber } = req.body;

  
  if (!description || !roomNumber) {
    return res.status(400).json({ msg: "Description and RoomId are required" });
  }

  try {
    const room = await Room.findOne({ roomNumber: roomNumber.toString() });
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    const maintenanceRequest = new Maintenance({
      description,
      roomId: room._id,
      status: "Pending",
    });

    await maintenanceRequest.save();

  

    res.status(201).json(maintenanceRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


exports.getMaintenanceRequests = async (req, res) => {
  try {
    const maintenanceRequests = await Maintenance.find().populate(
      "roomId"
    ); 

    if (maintenanceRequests.length === 0) {
      return res.status(404).json({ msg: "No maintenance requests found" });
    }

    res.json(maintenanceRequests);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.getMaintenanceRequestById = async (req, res) => {
  try {
    const maintenanceRequest = await Maintenance.findById(
      req.params.id
    ).populate("roomId");

    
    if (!maintenanceRequest) {
      return res.status(404).json({ msg: "Maintenance request not found" });
    }

    
    res.json(maintenanceRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


exports.updateMaintenanceRequestStatus = async (req, res) => {
  const { status } = req.body;

 
  if (!status || !["Pending", "In Progress", "Completed"].includes(status)) {
    return res
      .status(400)
      .json({
        msg: "Status must be one of: 'Pending', 'In Progress', 'Completed'",
      });
  }

  try {
   
    const maintenanceRequest = await Maintenance.findById(req.params.id);

   
    if (!maintenanceRequest) {
      return res.status(404).json({ msg: "Maintenance request not found" });
    }

    
    maintenanceRequest.status = status;

    
    await maintenanceRequest.save();

    
    res.json(maintenanceRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


exports.deleteMaintenanceRequest = async (req, res) => {
  try {
    const maintenanceRequest = await Maintenance.findById(req.params.id);

   
    if (!maintenanceRequest) {
      return res.status(404).json({ msg: "Maintenance request not found" });
    }

    
    await maintenanceRequest.remove();

    
    res.json({ msg: "Maintenance request deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
