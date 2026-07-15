import express from "express";
import {
    getRandomMovies,
    getMovieById,
    getGenres,
    getLanguages,
    getMoviesDesc,
} from "../controllers/movies.controller.js";
import { getWatchlist } from "../controllers/letterboxd.controller.js";

const router = express.Router();

// Get movie genres
router.get("/genres", getGenres);

// Get languages
router.get("/languages", getLanguages);

// POST because filters/search come in body
router.post("/random", getRandomMovies);

// Post description come in the body
router.post("/search", getMoviesDesc)

// Movie details by ID
router.get("/:id", getMovieById);


//get letterboxdwatchlist
router.get("/letterboxd", getWatchlist)


export default router;