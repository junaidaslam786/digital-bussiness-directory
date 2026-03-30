/**
 * Auth store – aligned with backend AuthController + UsersController /me endpoints.
 *
 * Auth endpoints:
 *   POST /auth/register           – register new user
 *   POST /auth/login              – login
 *   GET  /auth/me                 – get current user
 *   GET  /auth/verify-email       – verify email via token
 *   POST /auth/resend-verification – resend verification email
 *   POST /auth/refresh-token      – (handled by api.ts base client)
 *   POST /auth/logout             – logout, revoke refresh token
 *   POST /auth/forgot-password    – request password reset
 *   POST /auth/reset-password     – reset password with token
 *
 * Profile endpoints:
 *   GET    /users/me              – get profile
 *   PATCH  /users/me              – update name/phone
 *   POST   /users/me/avatar       – upload avatar
 *   PATCH  /users/me/password     – change password
 *   DELETE /users/me              – delete own account
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  apiFetch,
  setStoredTokens,
  clearStoredTokens,
  getStoredRefreshToken,
  buildQueryString,
} from "./api";
import type { ApiResponse } from "@/types/api";

// ────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────

export interface AuthPermission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  source?: "role" | "direct";
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  isActive: boolean;
  isVerified: boolean;
  emailVerifiedAt?: string;
  roleId: string;
  role?: { id: string; name: string; description?: string };
  permissions?: AuthPermission[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  roleId?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface UpdateProfileData {
  name?: string;
  phone?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

// ────────────────────────────────────────────────────────
// State
// ────────────────────────────────────────────────────────

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  verifyEmail: (token: string) => Promise<{ success: boolean; message: string }>;
  resendVerification: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  updateAvatarUrl: (avatarUrl: string) => Promise<void>;
  changePassword: (data: ChangePasswordData) => Promise<void>;
  deleteAccount: () => Promise<void>;

  clearError: () => void;
  setUser: (user: AuthUser) => void;
}

// ────────────────────────────────────────────────────────
// Store
// ────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const res = await apiFetch<ApiResponse<LoginResponse>>(
            "/auth/login",
            { method: "POST", body: credentials, skipAuth: true },
          );
          const { accessToken, refreshToken, user } = res.data;
          setStoredTokens(accessToken, refreshToken);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (err) {
          set({ isLoading: false, error: (err as Error).message });
          throw err;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          await apiFetch("/auth/register", {
            method: "POST",
            body: data,
            skipAuth: true,
          });
          set({ isLoading: false });
        } catch (err) {
          set({ isLoading: false, error: (err as Error).message });
          throw err;
        }
      },

      logout: async () => {
        const refreshToken = getStoredRefreshToken();
        try {
          if (refreshToken) {
            await apiFetch("/auth/logout", {
              method: "POST",
              body: { refreshToken },
            });
          }
        } finally {
          clearStoredTokens();
          set({ user: null, isAuthenticated: false, error: null });
        }
      },

      fetchCurrentUser: async () => {
        set({ isLoading: true });
        try {
          const res = await apiFetch<ApiResponse<AuthUser>>("/auth/me");
          set({ user: res.data, isAuthenticated: true, isLoading: false });
        } catch {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      verifyEmail: async (token) => {
        const qs = buildQueryString({ token });
        const res = await apiFetch<{ success: boolean; message: string }>(
          `/auth/verify-email${qs}`,
          { skipAuth: true },
        );
        return res;
      },

      resendVerification: async (email) => {
        await apiFetch("/auth/resend-verification", {
          method: "POST",
          body: { email },
          skipAuth: true,
        });
      },

      forgotPassword: async (email) => {
        await apiFetch("/auth/forgot-password", {
          method: "POST",
          body: { email },
          skipAuth: true,
        });
      },

      resetPassword: async (token, password) => {
        await apiFetch("/auth/reset-password", {
          method: "POST",
          body: { token, password },
          skipAuth: true,
        });
      },

      updateProfile: async (data) => {
        const res = await apiFetch<ApiResponse<AuthUser>>("/users/me", {
          method: "PATCH",
          body: data,
        });
        set({ user: res.data });
      },

      uploadAvatar: async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await apiFetch<ApiResponse<AuthUser>>("/users/me/avatar", {
          method: "POST",
          body: formData,
          skipContentType: true,
        });
        set({ user: res.data });
      },

      updateAvatarUrl: async (avatarUrl) => {
        const res = await apiFetch<ApiResponse<AuthUser>>("/users/me/avatar-url", {
          method: "PATCH",
          body: { avatarUrl },
        });
        set({ user: res.data });
      },

      changePassword: async (data) => {
        await apiFetch("/users/me/password", {
          method: "PATCH",
          body: data,
        });
      },

      deleteAccount: async () => {
        await apiFetch("/users/me", { method: "DELETE" });
        clearStoredTokens();
        set({ user: null, isAuthenticated: false });
      },

      clearError: () => set({ error: null }),
      setUser: (user) => set({ user, isAuthenticated: true }),
    }),
    {
      name: "koreabiz-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

// ── Selectors ──
export const selectCurrentUser = (s: AuthState) => s.user;
export const selectIsAuthenticated = (s: AuthState) => s.isAuthenticated;
export const selectAuthLoading = (s: AuthState) => s.isLoading;
export const selectAuthError = (s: AuthState) => s.error;
export const selectIsVerified = (s: AuthState) => s.user?.isVerified ?? false;
export const selectUserRole = (s: AuthState) => s.user?.role?.name ?? null;
