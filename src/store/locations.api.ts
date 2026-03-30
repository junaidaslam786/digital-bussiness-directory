/**
 * Locations API store – aligned with backend CountriesController + CitiesController.
 *
 * Country endpoints:
 *   GET  /countries                – list countries (public)
 *   GET  /countries/:id            – get country with cities
 *   POST /countries                – create (super_admin)
 *   PATCH /countries/:id           – update (super_admin)
 *   DELETE /countries/:id          – soft-delete (super_admin)
 *
 * City endpoints:
 *   GET  /cities                   – list cities (public, optional countryId)
 *   GET  /cities/:id               – get city
 *   POST /cities                   – create (admin)
 *   PATCH /cities/:id              – update (admin)
 *   DELETE /cities/:id             – soft-delete (admin)
 */

import { create } from "zustand";
import { apiFetch, buildQueryString } from "./api";
import type {
  Country,
  City,
  CreateCountryData,
  UpdateCountryData,
  CreateCityData,
  UpdateCityData,
} from "@/types";
import type { ApiResponse, PaginatedResponse, PaginationMeta } from "@/types/api";

interface LocationsState {
  // Countries
  countries: Country[];
  countriesLoading: boolean;
  countriesError: string | null;
  currentCountry: Country | null;

  // Cities
  cities: City[];
  citiesMeta: PaginationMeta | null;
  citiesLoading: boolean;
  citiesError: string | null;
  currentCity: City | null;

  // Country actions
  fetchCountries: (includeInactive?: boolean) => Promise<void>;
  fetchCountryById: (id: string) => Promise<void>;
  createCountry: (data: CreateCountryData) => Promise<Country>;
  updateCountry: (id: string, data: UpdateCountryData) => Promise<Country>;
  deleteCountry: (id: string) => Promise<void>;

  // City actions
  fetchCities: (params?: {
    countryId?: string;
    includeInactive?: boolean;
    page?: number;
    limit?: number;
  }) => Promise<void>;
  fetchCityById: (id: string) => Promise<void>;
  createCity: (data: CreateCityData) => Promise<City>;
  updateCity: (id: string, data: UpdateCityData) => Promise<City>;
  deleteCity: (id: string) => Promise<void>;

  clearErrors: () => void;
}

export const useLocationsStore = create<LocationsState>((set) => ({
  countries: [],
  countriesLoading: false,
  countriesError: null,
  currentCountry: null,

  cities: [],
  citiesMeta: null,
  citiesLoading: false,
  citiesError: null,
  currentCity: null,

  // ── Countries ──

  fetchCountries: async (includeInactive) => {
    set({ countriesLoading: true, countriesError: null });
    try {
      const qs = includeInactive ? buildQueryString({ includeInactive }) : "";
      const res = await apiFetch<ApiResponse<Country[]>>(
        `/countries${qs}`,
        { skipAuth: true },
      );
      set({ countries: res.data, countriesLoading: false });
    } catch (err) {
      set({ countriesLoading: false, countriesError: (err as Error).message });
    }
  },

  fetchCountryById: async (id) => {
    try {
      const res = await apiFetch<ApiResponse<Country>>(
        `/countries/${encodeURIComponent(id)}`,
        { skipAuth: true },
      );
      set({ currentCountry: res.data });
    } catch (err) {
      set({ countriesError: (err as Error).message });
    }
  },

  createCountry: async (data) => {
    const res = await apiFetch<ApiResponse<Country>>("/countries", {
      method: "POST",
      body: data,
    });
    set((s) => ({ countries: [...s.countries, res.data] }));
    return res.data;
  },

  updateCountry: async (id, data) => {
    const res = await apiFetch<ApiResponse<Country>>(
      `/countries/${encodeURIComponent(id)}`,
      { method: "PATCH", body: data },
    );
    set((s) => ({
      countries: s.countries.map((c) => (c.id === id ? res.data : c)),
      currentCountry:
        s.currentCountry?.id === id ? res.data : s.currentCountry,
    }));
    return res.data;
  },

  deleteCountry: async (id) => {
    await apiFetch(`/countries/${encodeURIComponent(id)}`, { method: "DELETE" });
    set((s) => ({
      countries: s.countries.filter((c) => c.id !== id),
    }));
  },

  // ── Cities ──

  fetchCities: async (params) => {
    set({ citiesLoading: true, citiesError: null });
    try {
      const qs = params
        ? buildQueryString(params as Record<string, unknown>)
        : "";
      const res = await apiFetch<PaginatedResponse<City>>(
        `/cities${qs}`,
        { skipAuth: true },
      );
      set({ cities: res.data, citiesMeta: res.meta, citiesLoading: false });
    } catch (err) {
      set({ citiesLoading: false, citiesError: (err as Error).message });
    }
  },

  fetchCityById: async (id) => {
    try {
      const res = await apiFetch<ApiResponse<City>>(
        `/cities/${encodeURIComponent(id)}`,
        { skipAuth: true },
      );
      set({ currentCity: res.data });
    } catch (err) {
      set({ citiesError: (err as Error).message });
    }
  },

  createCity: async (data) => {
    const res = await apiFetch<ApiResponse<City>>("/cities", {
      method: "POST",
      body: data,
    });
    set((s) => ({ cities: [...s.cities, res.data] }));
    return res.data;
  },

  updateCity: async (id, data) => {
    const res = await apiFetch<ApiResponse<City>>(
      `/cities/${encodeURIComponent(id)}`,
      { method: "PATCH", body: data },
    );
    set((s) => ({
      cities: s.cities.map((c) => (c.id === id ? res.data : c)),
      currentCity: s.currentCity?.id === id ? res.data : s.currentCity,
    }));
    return res.data;
  },

  deleteCity: async (id) => {
    await apiFetch(`/cities/${encodeURIComponent(id)}`, { method: "DELETE" });
    set((s) => ({
      cities: s.cities.filter((c) => c.id !== id),
    }));
  },

  clearErrors: () =>
    set({ countriesError: null, citiesError: null }),
}));

// ── Selectors ──
export const selectCountries = (s: LocationsState) => s.countries;
export const selectActiveCountries = (s: LocationsState) =>
  s.countries.filter((c) => c.isActive);
export const selectCountriesLoading = (s: LocationsState) => s.countriesLoading;
export const selectCurrentCountry = (s: LocationsState) => s.currentCountry;

export const selectCities = (s: LocationsState) => s.cities;
export const selectActiveCities = (s: LocationsState) =>
  s.cities.filter((c) => c.isActive);
export const selectCitiesLoading = (s: LocationsState) => s.citiesLoading;
export const selectCitiesMeta = (s: LocationsState) => s.citiesMeta;
export const selectCurrentCity = (s: LocationsState) => s.currentCity;

export const selectCitiesByCountry = (countryId: string) => (s: LocationsState) =>
  s.cities.filter((c) => c.countryId === countryId);
