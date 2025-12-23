import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoritesState {
  favoriteIds: string[];
  addFavorite: (enterpriseId: string) => void;
  removeFavorite: (enterpriseId: string) => void;
  isFavorite: (enterpriseId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      addFavorite: (enterpriseId) => {
        set((state) => ({
          favoriteIds: [...new Set([...state.favoriteIds, enterpriseId])],
        }));
      },

      removeFavorite: (enterpriseId) => {
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((id) => id !== enterpriseId),
        }));
      },

      isFavorite: (enterpriseId) => {
        return get().favoriteIds.includes(enterpriseId);
      },

      clearFavorites: () => {
        set({ favoriteIds: [] });
      },
    }),
    {
      name: "koreabiz-favorites",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
