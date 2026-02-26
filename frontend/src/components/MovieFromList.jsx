// // modal to show one movie which is picked fromt eh list of the movies after clicking the button randomly pick one from the list

import React from "react";
import { useMovieStore } from "../store/useMovieStore";

const MovieFromList = () => {
  const { pickedMovie } = useMovieStore();

  if (!pickedMovie) return null;

  return (
    <dialog id="pick_one_modal" className="modal">
      <div className="modal-box p-0 overflow-hidden relative max-w-2xl rounded-none border border-neutral-600 max-h-[90vh]">
        <div className="flex flex-col max-h-[90vh]">
          {/* 🎥 Poster */}
          {(pickedMovie.backdrop_path || pickedMovie.poster_path) && (
            <div className="border-b border-neutral-500">
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w780${
                    pickedMovie.backdrop_path || pickedMovie.poster_path
                  }`}
                  alt={pickedMovie.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

                <h3 className="absolute bottom-3 left-4 right-4 text-lg font-semibold text-white line-clamp-2">
                  {pickedMovie.title}
                </h3>

                <div className="absolute top-3 right-3 border border-white/30 bg-black/60 px-2 py-1 text-xs text-white">
                  ★ {pickedMovie.vote_average?.toFixed(1)}
                </div>
              </div>
            </div>
          )}

          {/* 📄 Scrollable content */}
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            <p className="text-sm leading-relaxed text-base-content/80">
              {pickedMovie.overview || "No description available."}
            </p>

            <div className="flex justify-between text-xs uppercase tracking-wide text-base-content/60">
              <span>{pickedMovie.original_language?.toUpperCase()}</span>
              <span>{pickedMovie.release_date?.split("-")[0]}</span>
            </div>
          </div>

          {/* ❌ Sticky close */}
          <div className="sticky bottom-0 bg-base-100 border-t border-neutral-500 p-4">
            <form method="dialog" className="flex justify-end">
              <button className="px-4 py-2 text-sm border border-neutral-500 hover:bg-base-200 transition">
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default MovieFromList;
