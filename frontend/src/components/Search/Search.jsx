import React, { useState } from "react";
import { useMovieStore } from "../../store/useMovieStore";
import SearchToggle from "./SearchToggle";
import FilterSearch from "./Filter/FilterSearch";
import DescriptionSearch from "./Description/DescriptionSearch";
import { useUiStore } from "../../store/useUiStore";

const DEFAULT_FILTERS = {
  genres: [],
  yearFrom: 1990,
  yearTo: 2025,
  rating: 6,
  language: "any",
};

const Search = () => {
  const { fetchMovies } = useMovieStore();
  const { searchMode } = useUiStore();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (searchMode === "filter") {
      fetchMovies(filters);
    } else {
      if (!description.trim()) {
        setError("Please describe the movie you’re looking for");
        return;
      }

      setError("");
      fetchMovies(description);
    }
  };
  return (
    <div className="w-full max-w-sm border border-neutral-500 bg-base-100">
      <div className="p-4 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-widest uppercase">
            Movie Discovery
          </h2>
          <SearchToggle />
        </div>

        {searchMode === "filter" ? (
          <FilterSearch filters={filters} setFilters={setFilters} />
        ) : (
          <DescriptionSearch
            description={description}
            setDescription={setDescription}
            error={error}
            setError={setError}
          />
        )}

        <button
          onClick={handleSearch}
          className="w-full border border-neutral-900 px-4 py-2
          text-sm font-semibold tracking-widest uppercase
          hover:bg-neutral-900 hover:text-white"
        >
          Find Movies
        </button>
      </div>
    </div>
  );
};

export default Search;
