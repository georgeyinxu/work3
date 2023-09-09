import { ethers } from "ethers";

import workerContractAbi from "@/abi/WorkerContractABI.json";

const init = async () => {
  if (!process.env.NEXT_PUBLIC_MUMBAI_URL) {
    console.error("Please set your TESTNET URL in .env.local");
    return;
  }

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_MUMBAI_URL,
  );

  if (
    !(
      process.env.NEXT_PUBLIC_WORKER_ADDR &&
      process.env.NEXT_PUBLIC_DEPLOYER_ADDR &&
      process.env.NEXT_PUBLIC_VALIDATOR_ADDR &&
      process.env.NEXT_PUBLIC_MASLOW_ADDR
    )
  ) {
    console.error(
      "Contract address/addresses is missing, please fill it up in .env.local file",
    );
    return;
  }

  const signer = provider.getSigner();
  const worker = new ethers.Contract(
    process.env.NEXT_PUBLIC_WORKER_ADDR,
    workerContractAbi,
    signer,
  );
};
