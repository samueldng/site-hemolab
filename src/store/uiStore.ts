import { create } from "zustand";

interface UiState {
    isResultadosModalOpen: boolean;
    openResultadosModal: () => void;
    closeResultadosModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
    isResultadosModalOpen: false,
    openResultadosModal: () => set({ isResultadosModalOpen: true }),
    closeResultadosModal: () => set({ isResultadosModalOpen: false }),
}));
