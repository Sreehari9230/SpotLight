import React from "react";

const MAX_GENRES = 3;

const GenreInput = ({ genres, selectedGenres, addGenre, removeGenre }) => {
  const genreLabel =
    selectedGenres.length === 0
      ? "Any genre"
      : `${selectedGenres.length} selected`;

  return (
    <section>
      <p className="text-xs uppercase tracking-widest opacity-70 mb-2">
        Genres (max {MAX_GENRES})
      </p>

      {selectedGenres.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedGenres.map((id) => {
            const genre = genres.find((g) => g.id === id);

            return (
              <button
                key={id}
                onClick={() => removeGenre(id)}
                className="border border-neutral-500 px-2 py-1 text-[11px]
                flex items-center gap-2 hover:bg-neutral-200"
              >
                {genre?.name}
                <span className="opacity-60">×</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="dropdown w-full">
        <button
          tabIndex={0}
          className="w-full border border-neutral-500 px-3 py-2
          text-left text-sm hover:bg-neutral-100"
        >
          {genreLabel}
        </button>

        <div
          tabIndex={0}
          className="dropdown-content z-10 w-full border
          border-neutral-500 bg-base-100 max-h-56 overflow-y-auto"
        >
          {genres.map((genre) => (
            <button
              key={genre.id}
              disabled={
                selectedGenres.includes(genre.id) ||
                selectedGenres.length >= MAX_GENRES
              }
              onClick={() => addGenre(genre.id)}
              className="w-full px-3 py-2 text-left text-sm
              border-b border-neutral-300 last:border-b-0
              hover:bg-neutral-100 disabled:opacity-40"
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenreInput;