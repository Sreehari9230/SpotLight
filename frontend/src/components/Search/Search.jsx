import React, { useEffect, useMemo, useState } from "react";
import { useMovieStore } from "../../store/useMovieStore";
import SearchToggle from "./SearchToggle";
import FilterSearch from './Filter/FilterSearch'
import DescriptionSearch from './Description/DescriptionSearch'

const Search = () => {
  const { fetchMovies } = useMovieStore();

  const handleSearch = () => fetchMovies(filters);

  return (
    <div className="w-full max-w-sm border border-neutral-500 bg-base-100">
      <div className="p-4 space-y-5">
        {/* Header */}
        {/* <h2 className="text-sm font-semibold tracking-widest uppercase">
          Random Movie Picker
        </h2> */}

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-widest uppercase">
            Movie Discovery
          </h2>

          <SearchToggle />
        </div>

        {}

        <FilterSearch />

        <DescriptionSearch/>

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

export default Search;
