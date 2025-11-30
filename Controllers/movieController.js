const Movie = require('../models/movieModel');


const createMovie = async (req, res) => {
  try {
    const { title, description, genre, image } = req.body;

    const movie = new Movie({
      title,
      description,
      genre,
      image,
    });

    const savedMovie = await movie.save();
    res.status(201).json({ message: 'Movie created successfully', movie: savedMovie });
  } catch (error) {
    res.status(500).json({ message: 'Error creating movie', error: error.message });
  }
};

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error: error.message });
  }
};

// Get single movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie', error: error.message });
  }
};

//  Update movie details (Admin)
const updateMovie = async (req, res) => {
  try {
    const { title, description, genre, image } = req.body;

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, description, genre, image },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie updated successfully', movie });
  } catch (error) {
    res.status(500).json({ message: 'Error updating movie', error: error.message });
  }
};

// Delete movie (Admin)
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting movie', error: error.message });
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
