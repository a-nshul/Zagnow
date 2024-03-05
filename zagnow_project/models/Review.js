const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
});

reviewSchema.pre('findOne', function (next) {
  this.populate('user').populate('listing');
  next();
});

module.exports = mongoose.model('Review', reviewSchema);
