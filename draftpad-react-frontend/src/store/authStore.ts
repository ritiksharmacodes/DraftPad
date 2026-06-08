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
    token: localStorage.getItem("token") ?? "",
    isAuthenticated: !!(localStorage.getItem("token")),

    // ACTIONS
    actions: {

        logout: () => {
            sessionStorage.clear();
            localStorage.clear();

            set({
                token: "",
                isAuthenticated: false,
            });

            window.location.reload();
        },

    }
}));