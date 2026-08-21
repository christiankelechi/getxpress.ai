import { create } from "zustand";
import { persist } from "zustand/middleware";

// Safe localStorage fallback
const zustandStorage = {
  getItem: (name) => {
    try {
      const storedValue = localStorage.getItem(name);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch {
      // fallback or ignore
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch {
      // fallback or ignore
    }
  },
};

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      chatsHistory: [],

      // Setters
      setUser: (user) => set({ user }),
      setChatsHistory: (history) => set({ chatsHistory : history}),
      // setAccessToken: (access_token) => set({ access_token }),

      // Logout clears critical state
      logout: () =>
        set({
          user: null,
          // access_token: null,
        }),
    }),
    {
      name: "xpress-ai-storage",
      storage: zustandStorage,
      partialize: (state) => ({
        user: state.user,
        chatsHistory: state.chatsHistory
        // access_token: state.access_token,
      }),
    }
  )
);

export default useUserStore;
