import { create } from "zustand";

interface State {
    filter: string;
}

interface Action {
    setFilter: (newFilter: string) => void;
}

export const filterStore = create<State & Action>((set) => ({
    filter: "",
    setFilter: (newFilter: string) => set({ filter: newFilter }),
}));
