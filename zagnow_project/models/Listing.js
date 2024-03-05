const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  businessPhone: { type: Number, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  images: [{ type: String}],
});

module.exports = mongoose.model('Listing', listingSchema);
