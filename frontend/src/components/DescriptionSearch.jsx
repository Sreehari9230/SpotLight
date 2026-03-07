import React, { useState } from "react";

const DescriptionSearch = () => {
  const [description, setDescription] = useState("");
  const [listening, setListening] = useState(false);

  const suggestions = [
    "Dark crime thriller",
    "Feel-good romance",
    "Sci-fi adventure",
  ];

  const handleSuggestion = (text) => {
    setDescription(text);
  };

  const toggleMic = () => {
    setListening((prev) => !prev);
  };

  const handleSearch = () => {
    console.log("Searching:", description);
  };

  return (
    <div className="w-full max-w-sm border border-neutral-500 bg-base-100">
      <div className="p-5 space-y-6">

        {/* Header */}
        <div>
          <h2 className="text-sm font-semibold tracking-widest uppercase">
            Movie Discovery
          </h2>

          <p className="text-xs opacity-60 mt-1">
            {listening
              ? "Listening... speak your movie idea"
              : "Describe the movie you want — type or speak"}
          </p>
        </div>

        {/* Text + Mic */}
        <section className="space-y-3">
          <div className="relative">

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="A dark psychological thriller set in space..."
              className={`w-full border px-3 py-2 pr-12 text-sm resize-none
              focus:outline-none transition
              ${
                listening
                  ? "border-red-400 shadow-[0_0_0_1px_rgba(248,113,113,0.4)]"
                  : "border-neutral-500"
              }`}
            />

            {/* Mic */}
            <button
              onClick={toggleMic}
              className={`absolute right-2 bottom-2 w-8 h-8
              flex items-center justify-center border
              transition
              ${
                listening
                  ? "border-red-400 bg-red-400 text-white animate-pulse"
                  : "border-neutral-500 hover:bg-neutral-200"
              }`}
            >
              🎙
            </button>

          </div>

          <p className="text-xs opacity-50">
            Be specific about mood, theme, or setting.
          </p>
        </section>

        {/* Suggestions */}
        <section>
          <p className="text-xs uppercase tracking-widest opacity-70 mb-3">
            Quick Ideas
          </p>

          <div className="flex flex-wrap gap-2">
            {suggestions.map((item, i) => (
              <button
                key={i}
                onClick={() => handleSuggestion(item)}
                className="border border-neutral-500 px-3 py-1.5 text-[11px]
                hover:bg-neutral-200 transition"
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Search */}
        <button
          onClick={handleSearch}
          className="w-full border border-neutral-900 px-4 py-2
          text-sm font-semibold tracking-widest uppercase
          hover:bg-neutral-900 hover:text-white transition"
        >
          Find Movies
        </button>

      </div>
    </div>
  );
};

export default DescriptionSearch;