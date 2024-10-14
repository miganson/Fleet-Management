const express = require("express");
const Vehicle = require("../models/Vehicle");
const router = express.Router();

// Create a new vehicle
router.post("/", async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("organization_id route_id");
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific vehicle by ID
router.get("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate(
      "organization_id route_id"
    );
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
