import React, { useEffect, useMemo, useState } from "react";
import { useMovieStore } from "../store/useMovieStore";

import GenreInput from "../components/Search/FilterSearch/FilterInputs/GenreInput";

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

  const genreLabel =
    filters.genres.length === 0
      ? "Any genre"
      : `${filters.genres.length} selected`;

  const languageLabel =
    filters.language === "any"
      ? "Any language"
      : languages.find((l) => l.iso_639_1 === filters.language)?.english_name ||
        "Any language";

  const filteredLanguages = useMemo(() => {
    return languages.filter(
      (l) =>
        l.iso_639_1 &&
        l.english_name &&
        l.english_name.toLowerCase().includes(languageSearch.toLowerCase()),
    );
  }, [languages, languageSearch]);

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
        <section>
          <p className="text-xs uppercase tracking-widest opacity-70 mb-2">
            Release year
          </p>

          <div className="flex gap-2">
            <input
              type="number"
              name="yearFrom"
              value={filters.yearFrom}
              onChange={handleChange}
              className="w-full border border-neutral-500 px-2 py-1 text-sm"
            />
            <input
              type="number"
              name="yearTo"
              value={filters.yearTo}
              onChange={handleChange}
              className="w-full border border-neutral-500 px-2 py-1 text-sm"
            />
          </div>
        </section>

        {/* ================= RATING ================= */}
        <section>
          <p className="text-xs uppercase tracking-widest opacity-70 mb-1">
            Minimum rating
          </p>
          <p className="text-sm mb-2 tabular-nums">{filters.rating}+</p>

          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            name="rating"
            value={filters.rating}
            onChange={handleChange}
            className="w-full"
          />
        </section>

        {/* ================= LANGUAGE ================= */}
        <section>
          <p className="text-xs uppercase tracking-widest opacity-70 mb-2">
            Language
          </p>

          <div className="dropdown w-full">
            <button
              tabIndex={0}
              className="w-full border border-neutral-500 px-3 py-2
              text-left text-sm hover:bg-neutral-100"
            >
              {languageLabel}
            </button>

            <div
              tabIndex={0}
              className="dropdown-content z-10 w-full border
              border-neutral-500 bg-base-100 max-h-64 overflow-y-auto"
            >
              <input
                type="text"
                placeholder="Search…"
                value={languageSearch}
                onChange={(e) => setLanguageSearch(e.target.value)}
                className="w-full px-3 py-2 text-sm border-b border-neutral-300"
              />

              <button
                onClick={() => {
                  setFilters((prev) => ({ ...prev, language: "any" }));
                  setLanguageSearch("");
                  closeDropdown();
                }}
                className="w-full px-3 py-2 text-left text-sm
                border-b border-neutral-300 hover:bg-neutral-100"
              >
                Any
              </button>

              {filteredLanguages.map((lang) => (
                <button
                  key={lang.iso_639_1}
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev,
                      language: lang.iso_639_1,
                    }));
                    setLanguageSearch("");
                    closeDropdown();
                  }}
                  className="w-full px-3 py-2 text-left text-sm
                  border-b border-neutral-300 last:border-b-0
                  hover:bg-neutral-100"
                >
                  {lang.english_name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SEARCH ================= */}
        <button
          onClick={handleSearch}
          // disabled={isLanGenLoading}
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
