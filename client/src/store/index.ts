// store/authStore.ts
import { create } from "zustand";

interface User {
  user: User | null;
  id: string;
  name: string;
  email: string;
  videos: []; // Adjust type as needed
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading:boolean,
  setLoading:(bool:boolean)=>void,
  setUser: (user: User, token: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading:false,
  setLoading:(bool)=>set(()=>({loading:bool})),
  setUser: (user, token) =>
    set(() => ({
      user,
      token,
    })),
  clearUser: () =>
    set(() => ({
      user: null,
      token: null,
    })),
}));
