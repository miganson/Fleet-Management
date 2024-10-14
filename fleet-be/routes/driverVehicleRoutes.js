const express = require("express");
const DriverVehicle = require("../models/DriverVehicle");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { driver_id, vehicle_id, timestamp_start, timestamp_end } = req.body;

    const newAssignment = new DriverVehicle({
      driver_id,
      vehicle_id,
      timestamp_start,
      timestamp_end,
    });

    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const assignments = await DriverVehicle.find()
      .populate("driver_id vehicle_id");
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




module.exports = router;
