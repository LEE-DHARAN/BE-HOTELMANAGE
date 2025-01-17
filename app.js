const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();



// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/maintenance", require("./routes/maintenanceRoutes"));
app.use(errorMiddleware);

module.exports = app;

