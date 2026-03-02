import React, { useEffect, useMemo, useState } from "react";
import { useMovieStore } from "../../store/useMovieStore";

const MAX_GENRES = 3;
//shouldremove
const DEFAULT_FILTERS = {
  genres: [],
  //   yearFrom: 1990,
  //   yearTo: 2025,
  //   rating: 6,
  //   language: "any",
};

const GenreInput = () => {
  const { fetchGenres, genres } = useMovieStore();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

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

  const genreLabel =
    filters.genres.length === 0
      ? "Any genre"
      : `${filters.genres.length} selected`;

  return (
    <div>
      {/* ================= GENRES ================= */}
      <section>
        <p className="text-xs uppercase tracking-widest opacity-70 mb-2">
          Genres (max {MAX_GENRES})
        </p>

        {filters.genres.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {filters.genres.map((id) => {
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
                  filters.genres.includes(genre.id) ||
                  filters.genres.length >= MAX_GENRES
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
    </div>
  );
};

export default GenreInput;
