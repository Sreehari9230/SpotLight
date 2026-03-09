import React from "react";

const RatingInput = ({ rating, handleChange }) => {
  return (
    <section>
      <p className="text-xs uppercase tracking-widest opacity-70 mb-1">
        Minimum rating
      </p>

      <p className="text-sm mb-2 tabular-nums">{rating}+</p>

      <input
        type="range"
        min="0"
        max="10"
        step="0.5"
        name="rating"
        value={rating}
        onChange={handleChange}
        className="w-full"
      />
    </section>
  );
};

export default RatingInput;