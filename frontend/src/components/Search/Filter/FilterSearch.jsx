import React, { useEffect, useMemo, useState } from "react";
import { useMovieStore } from "../../../store/useMovieStore";

import GenreInput from "./FilterInputs/GenreInput";
import YearInput from "./FilterInputs/YearInput";
import RatingInput from "./FilterInputs/RatingInput";
import LanguageInput from "./FilterInputs/LanguageInput";

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
    // fetchGenres,
    // fetchLanguages,
    fetchMovies,
    genres,
    languages,
    // isLanGenLoading,
  } = useMovieStore();

  //should remove
  // const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const [languageSearch, setLanguageSearch] = useState("");

  // useEffect(() => {
  //   fetchGenres();
  //   fetchLanguages();
  // }, [fetchGenres, fetchLanguages]);

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
    <>
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
    </>
  );
};

export default FilterSearch;
