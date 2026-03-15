import {
  fetchMoviesFromTMDB,
  fetchMovieById,
  fetchGenres,
  fetchLanguages,
} from "../services/tmdb.service.js";
import { getFiltersFromAI } from "../services/ai.service.js";
import { validateDesc } from "../utils/validateDesc.js";

export const getRandomMovies = async (req, res) => {
  try {
    console.log(req.body, 'filter')
    const movies = await fetchMoviesFromTMDB(req.body);

    console.log("line 6 in controller", movies); // not executed

    if (!movies || movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No movies found from controller" });
    }

    // Shuffle movies
    const shuffled = movies.sort(() => 0.5 - Math.random());

    // Pick only 5 movies
    const selectedMovies = shuffled.slice(0, 12);

    res.status(200).json({
      count: selectedMovies.length,
      movies: selectedMovies,
    });
  } catch (error) {
    console.error("TMDB Error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch movies from controller" });
  }
};

export const getMoviesDesc = async (req, res) => {
  try {
    const { description } = req.body;

    console.log(description, "description");

    // validation
    const validationError = validateDesc(description);

    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    // AI step
    const filters = await getFiltersFromAI(description);

    console.log("AI filters:", filters);

    // fetch movies
    const movies = await fetchMoviesFromTMDB(filters);

    if (!movies || movies.length === 0) {
      return res.status(404).json({
        message: "No movies found",
      });
    }

    // shuffle
    const shuffled = movies.sort(() => 0.5 - Math.random());

    const selectedMovies = shuffled.slice(0, 12);

    res.status(200).json({
      count: selectedMovies.length,
      movies: selectedMovies,
    });

  } catch (error) {
    console.error("Description search error:", error.message);

    res.status(500).json({
      message: "Failed to fetch movies",
    });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Movie ID is required",
      });
    }

    const movie = await fetchMovieById(id);

    res.status(200).json(movie);
  } catch (error) {
    console.error(
      "TMDB Movie Error:",
      error.response?.data || error.message
    );

    res.status(error.response?.status || 500).json({
      message: "Failed to fetch movie details",
    });
  }
};


let genresCache = null;
let languagesCache = null;

export const getGenres = async (req, res) => {
  try {
    console.log('genres');

    if (!genresCache) {
      genresCache = await fetchGenres();
    }

    res.status(200).json(genresCache);
  } catch (error) {
    console.error("Error fetching genres:", error.message);
    res.status(500).json({ message: "Failed to fetch genres" });
  }
};

export const getLanguages = async (req, res) => {
  try {
    console.log('languages');
    if (!languagesCache) {
      languagesCache = await fetchLanguages();
    }

    res.status(200).json(languagesCache);
  } catch (error) {
    console.error("Error fetching languages:", error.message);
    res.status(500).json({ message: "Failed to fetch languages" });
  }
};