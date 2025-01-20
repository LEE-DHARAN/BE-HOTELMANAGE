const mongoose = require("mongoose");

// Middleware to validate MongoDB ObjectId
const validateObjectId = (req, res, next)=> {
  const { id } = req.params;

  // Check if the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId" });
  }

  // If valid, proceed to the next middleware or route handler
  next();
}

module.exports = validateObjectId ;
