const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/fleet_management")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Fleet Backend is Running");
});

const routeRoutes = require("./routes/routeRoutes");
app.use("/api/routes", routeRoutes);

const organizationRoutes = require("./routes/organizationRoutes");
app.use("/api/organizations", organizationRoutes);

const vehicleRoutes = require("./routes/vehicleRoutes");
app.use("/api/vehicles", vehicleRoutes);

const driverRoutes = require("./routes/driverRoutes");
app.use("/api/drivers", driverRoutes);

const vehicleTripRoutes = require("./routes/vehicleTripRoutes");
app.use("/api/vehicle-trips", vehicleTripRoutes);

const driverVehicleRoutes = require("./routes/driverVehicleRoutes");
app.use("/api/driver-vehicle", driverVehicleRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
