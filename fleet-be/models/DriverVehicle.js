const mongoose = require('mongoose');

const driverVehicleSchema = new mongoose.Schema({
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  timestamp_start: { type: Date, required: true },
  timestamp_end: { type: Date }
});

const DriverVehicle = mongoose.model('DriverVehicle', driverVehicleSchema);
module.exports = DriverVehicle;
