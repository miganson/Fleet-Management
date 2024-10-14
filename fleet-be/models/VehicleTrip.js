const mongoose = require("mongoose");

const vehicleTripSchema = new mongoose.Schema({
  vehicle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  timestamp_start: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  timestamp_end: { type: Date },
  route_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
    required: true,
  },
  is_complete: { 
    type: Boolean, 
    required: true, 
    default: false
  },
});

const VehicleTrip = mongoose.model("VehicleTrip", vehicleTripSchema);
module.exports = VehicleTrip;
