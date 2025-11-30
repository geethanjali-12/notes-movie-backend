const Review = require('../models/reviewModel');
const Movie = require('../models/movieModel');

//  Create a new review for a movie
const createReview = async (req, res) => {
  try {
    const { movieId, userId, rating, comment } = req.body;

    // Check if all fields are provided
    if (!movieId || !userId || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new review
    const review = new Review({
      movie: movieId,
      user: userId,
      rating,
      comment,
    });

    const savedReview = await review.save();

    // Update movie’s average rating
    const reviews = await Review.find({ movie: movieId });
    const avgRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

    await Movie.findByIdAndUpdate(movieId, { avgRating: avgRating.toFixed(1) });

    res.status(201).json({ message: 'Review added successfully', review: savedReview });
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
};

// Get all reviews for a specific movie
const getReviewsByMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const reviews = await Review.find({ movie: movieId }).populate('user', 'name email');

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

//  Update a review (User)
const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};

//  Delete a review (User/Admin)
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsByMovie,
  updateReview,
  deleteReview,
};

