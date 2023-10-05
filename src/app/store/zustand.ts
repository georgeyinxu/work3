import { create } from "zustand";

type RoomStore = {
  roomId: string;
  setRoomId: (e: string) => void;
};

export const useRoomStore = create<RoomStore>((set) => ({
  roomId: "",
  setRoomId: (e: string) => set({ roomId: e }),
}));
