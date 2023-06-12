import { create } from "zustand";

interface PhaserConfigInterface {
   width: number;
   height: number;
   halfWidth: number;
   halfHeight: number;

   setWidth: (width: number) => void;
   setHeight: (height: number) => void;
}

const useStore = create<PhaserConfigInterface>((set) => ({
   width: window.innerWidth,
   height: window.innerHeight,
   halfWidth: window.innerWidth / 2,
   halfHeight: window.innerHeight / 2,

   setWidth: (width) =>
      set((state) => ({ ...state, width, halfWidth: width / 2 })),
   setHeight: (height) =>
      set((state) => ({ ...state, height, halfHeight: height / 2 })),
}));

export default useStore;
