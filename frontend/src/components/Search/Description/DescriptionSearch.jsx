import React, { useState, useRef, useEffect } from "react";
import { useSpeechRecognition } from "../../../hooks/useSpeechRecognition";

const DescriptionSearch = ({ description, setDescription }) => {
  // const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const { listening, startListening, stopListening, transcript } =
    useSpeechRecognition();

  // const suggestions = [
  //   "Dark crime thriller",
  //   "Feel-good romance",
  //   "Sci-fi adventure",
  // ];

  // const handleSuggestion = (text) => {
  //   setDescription(text);
  // };

  const toggleMic = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    if (transcript) {
      console.log("Updating textarea with:", transcript);
      setDescription(transcript);
    }
  }, [transcript]);

  return (
    <>
      <div>
        <p className="text-xs opacity-60 mt-1">
          {listening
            ? "Listening... speak your movie idea"
            : "Describe the movie you want — type or speak"}
        </p>
      </div>

      <section className="space-y-3">
        <div className="relative">
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (error) setError("");
            }}
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
        {error && <p className="text-xs text-red-500">{error}</p>}

        <p className="text-xs opacity-50">
          Be specific about mood, theme, or setting.
        </p>
      </section>

      {/* <section>
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
      </section> */}
    </>
  );
};

export default DescriptionSearch;
