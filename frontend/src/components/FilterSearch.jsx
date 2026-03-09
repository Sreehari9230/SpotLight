import React, { useEffect, useMemo, useState } from "react";
import { useMovieStore } from "../store/useMovieStore";

import GenreInput from "../components/Search/FilterSearch/FilterInputs/GenreInput";
import YearInput from "./Search/FilterSearch/FilterInputs/YearInput";
import RatingInput from "./Search/FilterSearch/FilterInputs/RatingInput";
import LanguageInput from "./Search/FilterSearch/FilterInputs/LanguageInput";

const MAX_GENRES = 3;

//shouldremove
const DEFAULT_FILTERS = {
  genres: [],
  yearFrom: 1990,
  yearTo: 2025,
  rating: 6,
  language: "any",
};

const FilterSearch = () => {
  const {
    fetchGenres,
    fetchLanguages,
    fetchMovies,
    genres,
    languages,
    isLanGenLoading,
  } = useMovieStore();

  //should remove
  // const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const [languageSearch, setLanguageSearch] = useState("");

  useEffect(() => {
    fetchGenres();
    fetchLanguages();
  }, [fetchGenres, fetchLanguages]);

  const closeDropdown = () => document.activeElement?.blur();

  /* ================= GENRES ================= */
  const addGenre = (id) => {
    if (filters.genres.length >= MAX_GENRES) return;
    if (!filters.genres.includes(id)) {
      setFilters((prev) => ({ ...prev, genres: [...prev.genres, id] }));
    }
    closeDropdown();
  };

  const removeGenre = (id) => {
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres.filter((g) => g !== id),
    }));
  };

  /* ================= COMMON ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => fetchMovies(filters);

  return (
    <div className="w-full max-w-sm border border-neutral-500 bg-base-100">
      <div className="p-4 space-y-5">
        {/* Header */}
        {/* <h2 className="text-sm font-semibold tracking-widest uppercase">
          Random Movie Picker
        </h2> */}
        <h2 className="text-sm font-semibold tracking-widest uppercase">
          Movie Discovery
        </h2>
        <p className="text-xs opacity-60">
          Discover movies based on your preferences
        </p>

        {/* ================= GENRES ================= */}
        <GenreInput
          genres={genres}
          selectedGenres={filters.genres}
          addGenre={addGenre}
          removeGenre={removeGenre}
        />

        {/* ================= YEAR ================= */}
        <YearInput
          yearFrom={filters.yearFrom}
          yearTo={filters.yearTo}
          handleChange={handleChange}
        />

        {/* ================= RATING ================= */}
        <RatingInput rating={filters.rating} handleChange={handleChange} />

        {/* ================= LANGUAGE ================= */}
        <LanguageInput
          language={filters.language}
          setFilters={setFilters}
          languages={languages}
          closeDropdown={closeDropdown}
        />

        {/* ================= SEARCH ================= */}
        <button
          onClick={handleSearch}
          className="w-full border border-neutral-900 px-4 py-2
          text-sm font-semibold tracking-widest uppercase
          hover:bg-neutral-900 hover:text-white
          disabled:opacity-50"
        >
          Find Movies
        </button>
      </div>
    </div>
  );
};

export default FilterSearch;
