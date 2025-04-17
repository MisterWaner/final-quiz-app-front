import { create } from 'zustand';

export type LayoutState = {
    isSidebarOpen: boolean;
}

type LayoutAction = {
    toggleSidebar: () => void;
}

export const useLayoutStore = create<LayoutState & LayoutAction>()((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));