import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import SecondaryLoader from "../components/SecondaryLoader";

import { useMovieStore } from "../store/useMovieStore";
import PickoneButton from "../components/PickoneButton";
import MovieFromList from "../components/MovieFromList";
import UpcomingModal from "../components/UpcomingModal";
import PrimaryLoader from "../components/PrimaryLoader";
import Search from "../components/Search/Search";

const HomePage = () => {
  const { isLanGenLoading, isMoviesLoading, movies } = useMovieStore();

  return (
    <div
      className="relative min-h-screen bg-base-100 text-base-content
                    flex flex-col items-center 
                    px-4 py-6 gap-8"
    >
      {isLanGenLoading && (
        <PrimaryLoader />
      )}

      {isMoviesLoading && (
        <SecondaryLoader />
      )}

      <Search />

      {/* Pick One Button */}
      {movies?.movies?.length > 0 && <PickoneButton />}

      {/* Movie Result */}
      <MovieList />

      {/* Picked Movie Modal */}
      <MovieFromList />

      {/* upcoming feature modal */}
      <UpcomingModal />
    </div>
  );
};

export default HomePage;
