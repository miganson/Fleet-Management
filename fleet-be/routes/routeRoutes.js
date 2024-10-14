const express = require("express");
const Route = require("../models/Route");
const router = express.Router();

// Create a new route
router.post("/", async (req, res) => {
  try {
    const newRoute = new Route(req.body);
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all routes
router.get("/", async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get a specific route by ID
router.get("/:id", async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a route by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRoute)
      return res.status(404).json({ message: "Route not found" });
    res.status(200).json(updatedRoute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a route by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRoute = await Route.findByIdAndDelete(req.params.id);
    if (!deletedRoute)
      return res.status(404).json({ message: "Route not found" });
    res.status(200).json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
