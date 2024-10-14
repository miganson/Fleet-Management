const express = require("express");
const VehicleTrip = require("../models/VehicleTrip");
const router = express.Router();

// Create a new vehicle trip
router.post("/", async (req, res) => {
  try {
    const newTrip = new VehicleTrip(req.body);
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all vehicle trips
router.get("/", async (req, res) => {
  try {
    const trips = await VehicleTrip.find().populate("vehicle_id route_id");
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a vehicle trip (e.g., mark it as complete)
router.put("/:id", async (req, res) => {
  try {
    const updatedTrip = await VehicleTrip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTrip) return res.status(404).json({ message: "Trip not found" });
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
