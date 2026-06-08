import { create } from "zustand";

// --- PRIVATE HELPER FUNCTION  NOTE:- This function is supposed to diasappear because eventually folder_note_container_items_already_loaded needs to disappear ---
// function cleanseKaroSessionStorageKo(top_index: number | null) {
//     if (top_index === null) return;

//     const stored = sessionStorage.getItem('folder_note_container_items_already_loaded');
//     const FNCitemsAlreadyLoaded = stored ? JSON.parse(stored) : [];
//     const flatenedFNCitemsAlreadyLoaded = FNCitemsAlreadyLoaded.flat(Infinity);

//     const newFNCitemsAlreadyLoaded = flatenedFNCitemsAlreadyLoaded.filter(
//         (cur: any) => cur.parent_id !== top_index
//     );
//     sessionStorage.setItem('folder_note_container_items_already_loaded', JSON.stringify(newFNCitemsAlreadyLoaded));
// }

type folder = {
    id: number;
    type: string;
    title: string;
    parent_id: number | null;
    user_id: number;
    created_at: string;
};

type note = {
    id: number;
    type: string;
    title: string;
    parent_id: number | null;
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

type WorkspaceActions = {
    actions: {
        setLoading: (isLoading: boolean) => void;
        setError: (errorMessage: string | null) => void;
        enterFolder: (folderID : number) => void;
        goBack: () => void;
        navigateToBreadcrumb: (breadcrumbIndex: number)=>void;
    }
}

const storedNavigationPath = sessionStorage.getItem("navigationArray");

// Combine your state type and action type definitions
type FullStoreType = WorkspaceStore & WorkspaceActions;

export const useWorkspaceStore = create<FullStoreType>((set, get) => ({
    // INITIAL STATE
    folders: [],
    notes: [],
    loading: false,
    error: null,
    navigationPath: storedNavigationPath ? JSON.parse(storedNavigationPath) : [null],

    // ACTIONS
    actions: {

        setLoading: (isLoading) => set({loading: isLoading}),

        setError: (errorMessage) => set({error: errorMessage}),

        enterFolder: (folderID) => set((state) => {
            const currentPath = state.navigationPath;

            // 1. Create an immutable brand-new array copy 
            const updatedPath = [...currentPath, folderID];
            sessionStorage.setItem('navigationArray', JSON.stringify(updatedPath));
    
            // 2. Return the state update. React takes over the rendering pipeline automatically!
            return { navigationPath: updatedPath };
        }),

        goBack: () => set((state) => {
            const currentPath = state.navigationPath;
    
            // 1. If we are already at the root level [null], do nothing
            if (currentPath.length === 1 && currentPath[0] === null) {
                return state;
            }
    
            // 2. Create an immutable brand-new array copy instead of mutating with .pop()
            const updatedPath = currentPath.slice(0, -1);
            sessionStorage.setItem('navigationArray', JSON.stringify(updatedPath));
    
            // 3. Return the state update. React takes over the rendering pipeline automatically!
            return { navigationPath: updatedPath };
        }),

        navigateToBreadcrumb: (breadcrumbIndex)=>set((state)=>{
            const updatedPath = state.navigationPath.slice(0, breadcrumbIndex + 1);
            sessionStorage.setItem("navigationArray", JSON.stringify(updatedPath));
            return {navigationPath: updatedPath};
        }),

    }
}));