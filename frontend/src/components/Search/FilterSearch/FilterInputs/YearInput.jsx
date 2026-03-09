import React from "react";

const YearInput = ({ yearFrom, yearTo, handleChange }) => {
  return (
    <section>
      <p className="text-xs uppercase tracking-widest opacity-70 mb-2">
        Release year
      </p>

      <div className="flex gap-2">
        <input
          type="number"
          name="yearFrom"
          value={yearFrom}
          onChange={handleChange}
          className="w-full border border-neutral-500 px-2 py-1 text-sm"
        />

        <input
          type="number"
          name="yearTo"
          value={yearTo}
          onChange={handleChange}
          className="w-full border border-neutral-500 px-2 py-1 text-sm"
        />
      </div>
    </section>
  );
};

export default YearInput;