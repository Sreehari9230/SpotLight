import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useMovieStore = create((set) => ({
    // Filter States
    genres: [],
    languages: [],
    isLanGenLoading: false,

    // Random Movie States
    isMoviesLoading: false,
    movies: [],
    searchQuery: null,

    // Movie Data State
    isMovieDetailsLoading: false,
    movieDetails: null,

    // store/useMovieStore.js
    pickedMovie: null,
    setPickedMovie: (movie) => set({ pickedMovie: movie }),

    fetchGenres: async () => {
        try {
            set({ isLanGenLoading: true });
            // /api/movies/languages
            const res = await axiosInstance.get("/api/movies/genres");

            // ✅ show backend response message
            if (res?.data?.message) {
                toast.success(res.data.message);
                console.log(res.data, "data");
                console.log(res.data.message, "message");
            }

            set({ genres: res.data });
            console.log('genres', res.data)

        } catch (error) {
            console.error("Error fetching Genres:", error);
            toast.error("Failed to fetch Genres");
        } finally {
            set({ isLanGenLoading: false });
        }
    },

    fetchLanguages: async () => {
        try {
            set({ isLanGenLoading: true });
            // /api/movies/languages
            const res = await axiosInstance.get("/api/movies/languages");

            // ✅ show backend response message
            if (res?.data?.message) {
                toast.success(res.data.message);
                console.log(res.data, "data");
                console.log(res.data.message, "message");
            }

            set({ languages: res.data });

        } catch (error) {
            console.error("Error fetching Languages:", error);
            toast.error("Failed to fetch Languages");
        } finally {
            set({ isLanGenLoading: false });
        }
    },

    // fetching movies according to filters
    fetchMovies: async (searchQuery) => {
        try {
            console.log("Input:", searchQuery);

            set({ isMoviesLoading: true });

            let res;

            // If it's a string → description search
            if (typeof searchQuery === "string") {

                const query = searchQuery.trim();

                if (!query) {
                    console.warn("Description empty");
                    return;
                }

                console.log("Calling description search API", query);

                res = await axiosInstance.post("/api/movies/search", {
                    description: query,
                });

                set({ searchQuery: { description: query } });
            }

            // If it's an object → filter search 
            else if (typeof searchQuery === "object") {
                console.log("Calling filter API");

                set({ searchQuery });

                res = await axiosInstance.post("/api/movies/random", searchQuery);
            }

            if (res) {
                console.log(res.data, "data");
                set({ movies: res.data });
            }

        } catch (error) {
            console.error("Error fetching movies:", error);
            toast.error("Failed to fetch movies");
        } finally {
            set({ isMoviesLoading: false });
        }
    },

    // router.get("/:id", getMovieById);
    // fetching the data of one single movie according to id
    // not being used for now
    fetchMovieData: async (id) => {
        try {
            console.log("Movie ID:", id);

            set({ isMovieDetailsLoading: true });

            // const res = await axiosInstance.post("/movies/filter", filters);
            const res = await axiosInstance.get(`/api/movies/${id}`);

            // ✅ show backend response message
            if (res?.data?.message) {
                toast.success(res.data.message);
                console.log(res.data, "data");
                console.log(res.data.message, "message");
            }

            set({ movieDetails: res.data });
        } catch (error) {
            console.error("Error fetching movie details:", error);
            toast.error("Failed to fetch movie details");
        } finally {
            set({ isMovieDetailsLoading: false });
        }
    },

    // clearMovies: () => set({ movies: [] }),

}));
