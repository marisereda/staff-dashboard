import { create } from 'zustand';

type State = {
  file: File | null;
};

type Actions = {
  setFile: (file: File | null) => void;
};

export const useSyncStore = create<State & Actions>(set => ({
  file: null,

  setFile: file => set(() => ({ file })),
}));
