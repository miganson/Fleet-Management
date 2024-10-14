const express = require("express");
const Driver = require("../models/Driver");
const router = express.Router();

router.post("/", async (req, res) => {
  // Base path already handled in app.js
  try {
    const newDriver = new Driver(req.body);
    await newDriver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
