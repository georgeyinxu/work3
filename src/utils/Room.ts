import axios from "axios";

const getRoom = async (worker: string) => {
  let room = false;
  try {
    const res = await axios.get(`/api/room?worker=${worker}`);

    room = res.data.data;

    console.log("room", room);
  } catch (error) {
    console.error("Failed to check if room exists");
  }

  return room;
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
