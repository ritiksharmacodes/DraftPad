import { create } from "zustand";

type folder = {
    id: number;
    type: string; 
    title: string;
    parent_id: number|null;
    user_id: number;
    created_at: string;
};

type note = {
    id: number;
    type: string; 
    title: string;
    parent_id: number|null;
    content: string;
    user_id: number;
    created_at: string;
};

type WorkspaceStore = {
    folders: folder[];
    notes: note[];
    loading: boolean;
    error: string | null;
    navigationPath: (number | null)[];
};

const storedNavigationPath = sessionStorage.getItem("navigationArray");

export const useWorkspaceStore = create<WorkspaceStore>(() => ({
    folders: [],
    notes: [],
    loading: false,
    error: null,

    navigationPath: storedNavigationPath
        ? JSON.parse(storedNavigationPath)
        : [null],
}));