const Maintenance = require("../models/maintenance");
const Room = require("../models/room");

// Create a new maintenance request
exports.createMaintenanceRequest = async (req, res) => {
  const { description, roomId } = req.body;

  // Validate required fields
  if (!description || !roomId) {
    return res.status(400).json({ msg: "Description and RoomId are required" });
  }

  try {
    // Check if the room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    // Create a new maintenance request
    const maintenanceRequest = new Maintenance({
      description,
      roomId,
      status: "Pending", // Default status is Pending
    });

    // Save the maintenance request
    await maintenanceRequest.save();

    // Return the created maintenance request data
    res.status(201).json(maintenanceRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Get all maintenance requests (can filter by status if needed)
exports.getMaintenanceRequests = async (req, res) => {
  const { status } = req.query; // Optional query parameter for filtering by status

  try {
    let filter = {};
    if (status) {
      filter.status = status;
    }

    const maintenanceRequests = await Maintenance.find(filter).populate(
      "roomId"
    ); // Populate room data

    // If no maintenance requests found
    if (maintenanceRequests.length === 0) {
      return res.status(404).json({ msg: "No maintenance requests found" });
    }

    // Return the list of maintenance requests
    res.json(maintenanceRequests);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Get a specific maintenance request by ID
exports.getMaintenanceRequestById = async (req, res) => {
  try {
    const maintenanceRequest = await Maintenance.findById(
      req.params.id
    ).populate("roomId");

    // Check if the maintenance request exists
    if (!maintenanceRequest) {
      return res.status(404).json({ msg: "Maintenance request not found" });
    }

    // Return the maintenance request data
    res.json(maintenanceRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Update a maintenance request status (e.g., from 'Pending' to 'In Progress' or 'Completed')
exports.updateMaintenanceRequestStatus = async (req, res) => {
  const { status } = req.body;

  // Validate required fields
  if (!status || !["Pending", "In Progress", "Completed"].includes(status)) {
    return res
      .status(400)
      .json({
        msg: "Status must be one of: 'Pending', 'In Progress', 'Completed'",
      });
  }

  try {
    // Find the maintenance request by ID
    const maintenanceRequest = await Maintenance.findById(req.params.id);

    // Check if the maintenance request exists
    if (!maintenanceRequest) {
      return res.status(404).json({ msg: "Maintenance request not found" });
    }

    // Update the maintenance request status
    maintenanceRequest.status = status;

    // Save the updated maintenance request
    await maintenanceRequest.save();

    // Return the updated maintenance request
    res.json(maintenanceRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Delete a maintenance request
exports.deleteMaintenanceRequest = async (req, res) => {
  try {
    const maintenanceRequest = await Maintenance.findById(req.params.id);

    // Check if the maintenance request exists
    if (!maintenanceRequest) {
      return res.status(404).json({ msg: "Maintenance request not found" });
    }

    // Delete the maintenance request from the database
    await maintenanceRequest.remove();

    // Return a success message
    res.json({ msg: "Maintenance request deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
