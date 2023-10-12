import { IRoom } from "@/interfaces/RoomResponse";
import axios from "axios";

const getRoom = async (address: string) => {
  try {
    const res = await axios.get(`/api/room?sender=${address}`);

    return res.data.data;
  } catch (error) {
    console.error("Failed to check if room exists");
    return undefined;
  }
};

const createRoom = async (
  deployer: string,
  worker: string,
  listingId: string
) => {
  let room = false;
  try {
    const res = await axios.post(
      "/api/room",
      {
        deployer,
        worker,
        listingId,
      },
      {}
    );

    room = res.data.data;
    console.log("room", room);
  } catch (error) {
    console.error("Failed to create room", error);
  }

  return room;
};

export { getRoom, createRoom };
