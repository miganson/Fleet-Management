const express = require("express");
const Organization = require("../models/Organization");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newOrganization = new Organization(req.body);
    await newOrganization.save();
    res.status(201).json(newOrganization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
