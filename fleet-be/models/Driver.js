const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organization_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
