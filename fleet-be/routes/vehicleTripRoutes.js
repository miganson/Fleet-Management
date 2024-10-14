const express = require("express");
const VehicleTrip = require("../models/VehicleTrip");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newTrip = new VehicleTrip(req.body);
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const trips = await VehicleTrip.find().populate("vehicle_id route_id");
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
