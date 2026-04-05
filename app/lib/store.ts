import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
  plan: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set: any) => ({
  user: null,
  token: null,
  setAuth: (token: string, user: User) => set({ token, user }),
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
