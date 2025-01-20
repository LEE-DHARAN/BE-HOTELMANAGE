const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/errorMiddleware");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const billingRoutes = require("./routes/billingRoutes");
const residentRoutes = require("./routes/residentRoutes");
const roomRoutes = require("./routes/roomRoutes");
const auth = require("./middleware/authMiddleware")
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();



// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow requests from your frontend's URL
    credentials: true, // Allow cookies to be sent
  })
);

app.use(express.json());

// Routes
app.use("/api", maintenanceRoutes);
app.use("/api", billingRoutes);
app.use("/api", residentRoutes);
app.use("/api/rooms", roomRoutes);
app.use(errorMiddleware);


// Add cookie parser middleware
app.use(cookieParser());


module.exports = app;

