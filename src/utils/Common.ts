import { IWallet } from "@/interfaces/WalletResponse";
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

  return {wallet, telegram};
};

export { short, addTelegram, checkTelegram };
