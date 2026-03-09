import React, { useMemo, useState } from "react";

const LanguageInput = ({
  language,
  setFilters,
  languages,
  closeDropdown,
}) => {
  const [languageSearch, setLanguageSearch] = useState("");

  const languageLabel =
    language === "any"
      ? "Any language"
      : languages.find((l) => l.iso_639_1 === language)?.english_name ||
        "Any language";

  const filteredLanguages = useMemo(() => {
    return languages.filter(
      (l) =>
        l.iso_639_1 &&
        l.english_name &&
        l.english_name.toLowerCase().includes(languageSearch.toLowerCase())
    );
  }, [languages, languageSearch]);

  return (
    <section>
      <p className="text-xs uppercase tracking-widest opacity-70 mb-2">
        Language
      </p>

      <div className="dropdown w-full">
        <button
          tabIndex={0}
          className="w-full border border-neutral-500 px-3 py-2 text-left text-sm hover:bg-neutral-100"
        >
          {languageLabel}
        </button>

        <div
          tabIndex={0}
          className="dropdown-content z-10 w-full border border-neutral-500 bg-base-100 max-h-64 overflow-y-auto"
        >
          <input
            type="text"
            placeholder="Search…"
            value={languageSearch}
            onChange={(e) => setLanguageSearch(e.target.value)}
            className="w-full px-3 py-2 text-sm border-b border-neutral-300"
          />

          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, language: "any" }));
              setLanguageSearch("");
              closeDropdown();
            }}
            className="w-full px-3 py-2 text-left text-sm border-b border-neutral-300 hover:bg-neutral-100"
          >
            Any
          </button>

          {filteredLanguages.map((lang) => (
            <button
              key={lang.iso_639_1}
              onClick={() => {
                setFilters((prev) => ({
                  ...prev,
                  language: lang.iso_639_1,
                }));
                setLanguageSearch("");
                closeDropdown();
              }}
              className="w-full px-3 py-2 text-left text-sm border-b border-neutral-300 last:border-b-0 hover:bg-neutral-100"
            >
              {lang.english_name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageInput;