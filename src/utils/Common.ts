import axios from "axios";
import { basename } from "path";
import { IWallet } from "@/interfaces/WalletResponse";

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
    window.location.reload();
  }
};

const checkTelegram = async (address: string) => {
  let telegram = false;
  let wallet: IWallet | null = null;

  try {
    const res = await axios.get(`/api/wallet?address=${address}`);

    if (res.status === 200) {
      wallet = res.data.data;

      if (wallet && wallet.telegram !== "") {
        telegram = true;
      }
    }
  } catch (error) {
    console.error(
      "Failed to verify if user has added telegram due to: " + error
    );
  }

  return { wallet, telegram };
};

const formatFileName = (url: string) => {
  if (!url) return null;

  const parsedUrl = new URL(url);
  const pathname = parsedUrl.pathname;
  const filename = basename(pathname);

  return filename;
};
const fetchLocations = async () => {
  const res = await axios.get("/api/location");
  const locations = res.data.data;

  return locations;
};

const fetchJobTypes = async () => {
  const res = await axios.get("/api/jobType");
  const jobTypes = res.data.data;

  return jobTypes;
};

export {
  short,
  formatFileName,
  fetchLocations,
  fetchJobTypes,
  addTelegram,
  checkTelegram,
};
