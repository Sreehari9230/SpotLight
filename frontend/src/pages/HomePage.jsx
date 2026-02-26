import React, { useEffect, useState } from "react";
import SearchFilters from "../components/Filter/SearchFilters";
import MovieList from "../components/MovieList";
import DiceLoader from "../components/DiceLoader";

import { useMovieStore } from "../store/useMovieStore";
import PickoneButton from "../components/PickoneButton";
import MovieFromList from "../components/MovieFromList";
import UpcomingModal from "../components/UpcomingModal";

const HomePage = () => {
  const { isLanGenLoading, isMoviesLoading, movies } = useMovieStore();
  // const [isLoading, setIsLoading] = useState(true);

  // Example: simulate API loading  Show an Info Instead of lan and gen loading here
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <div
      className="relative min-h-screen bg-base-100 text-base-content
                    flex flex-col items-center 
                    px-4 py-6 gap-8"
    >
      {(isLanGenLoading || isMoviesLoading) && (
        // || isLoading
        <DiceLoader />
      )}

      {/* Filters */}
      <SearchFilters />

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
