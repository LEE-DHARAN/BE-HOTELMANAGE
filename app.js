const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/errorMiddleware");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const billingRoutes = require("./routes/billingRoutes");
const residentRoutes = require("./routes/residentRoutes");
const roomRoutes = require("./routes/roomRoutes");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes")
dotenv.config();

const app = express();



// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

app.use(express.json());

// Routes
app.use("/api", maintenanceRoutes);
app.use("/api", billingRoutes);
app.use("/api", residentRoutes);
app.use("/api", roomRoutes);
app.use("/api", authRoutes);
app.use(errorMiddleware);


// Add cookie parser middleware
app.use(cookieParser());


module.exports = app;

