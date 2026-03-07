import React, { useState, useRef } from "react";
import { useMovieStore } from "../store/useMovieStore";

const DescriptionSearch = () => {
  const { fetchMovies } = useMovieStore();

  const [description, setDescription] = useState("");
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);

  const suggestions = [
    "Dark crime thriller",
    "Feel-good romance",
    "Sci-fi adventure",
  ];

  const handleSuggestion = (text) => {
    setDescription(text);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log("🎙 Mic started listening");
      setListening(true);
    };

    recognition.onspeechstart = () => {
      console.log("🗣 Speech detected");
    };

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      console.log("Interim:", interim);
      console.log("Final:", final);

      // Update textarea
      setDescription(final || interim);
    };
    recognition.onspeechend = () => {
      console.log("🔇 Speech ended");
    };

    recognition.onend = () => {
      console.log("⏹ Recognition stopped");
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("❌ Speech recognition error:", event.error);
    };

    recognition.start();

    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const toggleMic = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSearch = () => {
    const query = description.trim();

    if (!query) {
      setError("Please describe the movie you want.");
      return;
    }

    setError(""); // clear error if valid
    fetchMovies(query);
    console.log("Searching:", query);
  };

  // const handleSearch = () => fetchMovies(filters);

  return (
    <div className="w-full max-w-sm border border-neutral-500 bg-base-100">
      <div className="p-5 space-y-6">
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
