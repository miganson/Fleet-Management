const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  plate_number: { type: String, required: true, unique: true },
  route_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  organization_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  last_maintenance: { type: Date },
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
