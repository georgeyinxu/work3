import { IRoom } from "@/interfaces/RoomResponse";
import axios from "axios";

const getMessages = async (roomId: string): Promise<IRoom[] | undefined> => {
  try {
    const res = await axios.get(`/api/message?roomId=${roomId}`);

    return res.data.data;
  } catch (error) {
    console.error("Failed to check if room exists");
    return undefined;
  }
};

const saveMessage = async (
  roomId: string,
  sender: string,
  message: string,
  timestamp: Date
) => {
  let room = false;
  try {
    const res = await axios.post(
      "/api/message",
      {
        roomId,
        sender,
        message,
        timestamp,
      },
      {}
    );

    message = res.data.data;
    console.log("room", message);
  } catch (error) {
    console.error("Failed to save message, error");
  }

  return room;
};

export { getMessages, saveMessage };
