const Review = require('../models/Review');
const mongoose = require('mongoose');
const createReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    const populatedReview = await Review.findById(newReview._id).populate('user').populate('listing');
    res.json({ review: populatedReview, message: 'Review created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user').populate('listing');
    res.json({ reviews, message: "Fetch all reviews data" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID provided. Please provide a valid ID for the update." });
    }
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true })
      .populate('user')
      .populate('listing');
    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found with the provided ID." });
    }
    res.json({ review: updatedReview, message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createReview, getReviews, updateReview, deleteReview };
