const express = require("express");
const Vehicle = require("../models/Vehicle");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("organization_id route_id");
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
