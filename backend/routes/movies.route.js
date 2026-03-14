import express from "express";
import {
    getRandomMovies,
    getMovieById,
    getGenres,
    getLanguages,
    getMoviesDesc,
} from "../controllers/movies.controller.js";

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



export default router;


            //  res = await axiosInstance.post("/api/movies/search", {
            //         description: query,
            //     });