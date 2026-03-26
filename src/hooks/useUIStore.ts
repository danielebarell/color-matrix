import { create } from "zustand";

type Panels = {
  dialog: boolean;
  image: boolean;
};
type UIState = {
  panels: Panels;
  openPanel: (panel: keyof Panels) => void;
  closePanel: (panel: keyof Panels) => void;
};

export const useUIStore = create<UIState>((set) => ({
  panels: {
    dialog: false,
    image: false,
  },
  openPanel(panel) {
    return set((state) => ({
      panels: { ...state.panels, [panel]: true },
    }));
  },
  closePanel(panel) {
    return set((state) => ({
      panels: { ...state.panels, [panel]: false },
    }));
  },
}));
