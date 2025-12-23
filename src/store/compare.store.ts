import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CompareState {
  compareSlugs: string[];
  addToCompare: (slug: string) => boolean;
  removeFromCompare: (slug: string) => void;
  isInCompare: (slug: string) => boolean;
  clearCompare: () => void;
  canAddMore: () => boolean;
}

const MAX_COMPARE = 4;

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      compareSlugs: [],

      addToCompare: (slug) => {
        const state = get();
        if (state.compareSlugs.length >= MAX_COMPARE) {
          return false;
        }
        if (state.compareSlugs.includes(slug)) {
          return false;
        }
        set((state) => ({
          compareSlugs: [...state.compareSlugs, slug],
        }));
        return true;
      },

      removeFromCompare: (slug) => {
        set((state) => ({
          compareSlugs: state.compareSlugs.filter((s) => s !== slug),
        }));
      },

      isInCompare: (slug) => {
        return get().compareSlugs.includes(slug);
      },

      clearCompare: () => {
        set({ compareSlugs: [] });
      },

      canAddMore: () => {
        return get().compareSlugs.length < MAX_COMPARE;
      },
    }),
    {
      name: "koreabiz-compare",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
