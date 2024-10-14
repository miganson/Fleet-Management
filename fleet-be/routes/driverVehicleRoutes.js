const express = require("express");
const DriverVehicle = require("../models/DriverVehicle");
const router = express.Router();

// Create a new driver-vehicle relationship
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

// Get all driver-vehicle assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await DriverVehicle.find()
      .populate("driver_id vehicle_id");
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific driver-vehicle assignment by ID
router.get("/:id", async (req, res) => {
  try {
    const assignment = await DriverVehicle.findById(req.params.id)
      .populate("driver_id vehicle_id");
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a driver-vehicle assignment by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedAssignment = await DriverVehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAssignment) return res.status(404).json({ message: "Assignment not found" });
    res.status(200).json(updatedAssignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a driver-vehicle assignment by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedAssignment = await DriverVehicle.findByIdAndDelete(req.params.id);
    if (!deletedAssignment) return res.status(404).json({ message: "Assignment not found" });
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
