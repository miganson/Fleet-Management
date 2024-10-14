const express = require("express");
const Organization = require("../models/Organization");
const router = express.Router();

// Create a new organization
router.post("/", async (req, res) => {
  try {
    const newOrganization = new Organization(req.body);
    await newOrganization.save();
    res.status(201).json(newOrganization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all organizations
router.get("/", async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific organization by ID
router.get("/:id", async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization)
      return res.status(404).json({ message: "Organization not found" });
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an organization by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOrganization)
      return res.status(404).json({ message: "Organization not found" });
    res.status(200).json(updatedOrganization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an organization by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrganization = await Organization.findByIdAndDelete(
      req.params.id
    );
    if (!deletedOrganization)
      return res.status(404).json({ message: "Organization not found" });
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
