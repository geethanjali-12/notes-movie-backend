const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviewsByMovie,
  updateReview,
  deleteReview,
} = require('../Controllers/reviewController');
const { protect } = require("../middleware/auth");

// 👇 Review Routes
router.post('/', protect, createReview);                  // Add new review
router.get('/:movieId', getReviewsByMovie);      // Get all reviews for a movie
router.put('/:id', protect, updateReview);                // Update review
router.delete('/:id', protect, deleteReview);             // Delete review

module.exports = router;
