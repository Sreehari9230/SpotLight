import React from "react";
import { Filter, Sparkles } from "lucide-react";
import { useUiStore } from "../../store/useUiStore";

const SearchToggle = () => {
  const { searchToggle, searchMode } = useUiStore();

  const handleSearchToggle = () => {
    console.log(searchMode, "haha");
    searchToggle();
  };

  return (
    <button
      onClick={handleSearchToggle}
      className="flex items-center gap-2
      border border-neutral-500 px-2 py-1
      text-xs font-semibold uppercase tracking-wide
      transition-transform hover:-translate-y-1px"
    >
      <Filter
        size={14}
        className={searchMode === "filter" ? "opacity-100" : "opacity-40"}
      />

      <div className="w-px h-4 bg-neutral-400" />

      <Sparkles
        size={14}
        className={searchMode === "description" ? "opacity-100" : "opacity-40"}
      />

      <span
        className={`text-[10px] ${
          searchMode === "description" ? "opacity-100" : "opacity-40"
        }`}
      >
        AI
      </span>
    </button>
  );
};

export default SearchToggle;