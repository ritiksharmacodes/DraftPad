import { create } from "zustand";

type AuthStore = {
    token: string;
    isAuthenticated: boolean;
};

type AuthActions = {
    actions: {
        logout: () => void;
    }
};

type FullStoreType = AuthStore & AuthActions;

export const useAuthStore = create<FullStoreType>((set, get) => ({
    // INITIAL STATE
    token: "",
    isAuthenticated: false,

    // ACTIONS
    actions: {
        
        logout: () => set(() => {
            sessionStorage.clear();
            localStorage.clear();
            window.location.reload();
        }),

    }
}));