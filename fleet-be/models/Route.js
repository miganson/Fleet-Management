const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  route_length: { type: Number, required: true }
});

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;
