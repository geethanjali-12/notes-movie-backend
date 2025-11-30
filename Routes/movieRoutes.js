const express = require('express');
const router = express.Router();
const {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require('../Controllers/movieController');
const { protect, } = require("../middleware/auth");

router.post('/createMovie',protect,  createMovie);
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.put('/:id',protect,  updateMovie);
router.delete('/:id',protect, deleteMovie);

module.exports = router;



