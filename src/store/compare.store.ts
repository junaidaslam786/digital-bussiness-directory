import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Compare store – uses business IDs (UUID) aligned with backend Business.id.
 * Backend has no slug field on businesses, so we use the UUID for identification.
 */
interface CompareState {
  compareIds: string[];
  addToCompare: (businessId: string) => boolean;
  removeFromCompare: (businessId: string) => void;
  isInCompare: (businessId: string) => boolean;
  clearCompare: () => void;
  canAddMore: () => boolean;
}

const MAX_COMPARE = 4;

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      compareIds: [],

      addToCompare: (businessId) => {
        const state = get();
        if (state.compareIds.length >= MAX_COMPARE) {
          return false;
        }
        if (state.compareIds.includes(businessId)) {
          return false;
        }
        set((state) => ({
          compareIds: [...state.compareIds, businessId],
        }));
        return true;
      },

      removeFromCompare: (businessId) => {
        set((state) => ({
          compareIds: state.compareIds.filter((id) => id !== businessId),
        }));
      },

      isInCompare: (businessId) => {
        return get().compareIds.includes(businessId);
      },

      clearCompare: () => {
        set({ compareIds: [] });
      },

      canAddMore: () => {
        return get().compareIds.length < MAX_COMPARE;
      },
    }),
    {
      name: "koreabiz-compare",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ── Selectors ──
export const selectCompareIds = (s: CompareState) => s.compareIds;
export const selectCompareCount = (s: CompareState) => s.compareIds.length;
export const selectCanAddMore = (s: CompareState) => s.compareIds.length < MAX_COMPARE;
