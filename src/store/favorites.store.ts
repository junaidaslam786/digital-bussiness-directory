import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Favorites store – uses business IDs (UUID) aligned with backend Business.id.
 */
interface FavoritesState {
  favoriteIds: string[];
  addFavorite: (businessId: string) => void;
  removeFavorite: (businessId: string) => void;
  isFavorite: (businessId: string) => boolean;
  toggleFavorite: (businessId: string) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      addFavorite: (businessId) => {
        set((state) => ({
          favoriteIds: [...new Set([...state.favoriteIds, businessId])],
        }));
      },

      removeFavorite: (businessId) => {
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((id) => id !== businessId),
        }));
      },

      isFavorite: (businessId) => {
        return get().favoriteIds.includes(businessId);
      },

      toggleFavorite: (businessId) => {
        const state = get();
        if (state.favoriteIds.includes(businessId)) {
          set({
            favoriteIds: state.favoriteIds.filter((id) => id !== businessId),
          });
        } else {
          set({
            favoriteIds: [...state.favoriteIds, businessId],
          });
        }
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

// ── Selectors ──
export const selectFavoriteIds = (s: FavoritesState) => s.favoriteIds;
export const selectFavoriteCount = (s: FavoritesState) => s.favoriteIds.length;
