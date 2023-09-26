import axios from "axios";

const short = (addr?: string) => {
  if (!addr) return null;

  return `${addr.slice(0, 5)}…${addr.slice(-4)}`;
};

const addTelegram = async (
  handle: string,
  address: string,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    await axios.put("/api/wallet", {
      address,
      telegram: handle,
    });
  } catch (error) {
    console.error("Failed to add telegram due to: " + error);
  } finally {
    setSuccess(true);
  }
};

export { short, addTelegram };
