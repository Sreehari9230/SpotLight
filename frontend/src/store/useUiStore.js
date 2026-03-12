import { create } from "zustand";

export const useUiStore = create((set) => ({

    searchMode: 'filter',

    searchToggle: () => {
        set((state) => ({
            searchMode: state.searchMode === "filter" ? "description" : "filter",
        }))
    },
}))