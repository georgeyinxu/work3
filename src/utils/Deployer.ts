import { ethers } from "ethers";
import axios from "axios";

import deployerContractAbi from "@/abi/DeployerContractABI.json";
import saldTokenAbi from "@/abi/SaldTokenABI.json";

const postListing = async (
  title: string,
  description: string,
  reward: string,
  category: string,
  date: Date,
) => {
  if (!process.env.NEXT_PUBLIC_DEPLOYER_ADDR) {
    console.error("Please set your NEXT_PUBLIC_DEPLOYER_ADDR in .env.local");
    return;
  }

  if (!process.env.NEXT_PUBLIC_SALD_ADDR) {
    console.error("Please set your NEXT_PUBLIC_SALD_ADDR in .env.local");
    return;
  }

  const deadline = new Date(date).getDate();
  const rewardNum = parseFloat(reward);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const deployerContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_DEPLOYER_ADDR,
    deployerContractAbi,
    signer,
  );
  const tokenContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_SALD_ADDR,
    saldTokenAbi,
    signer,
  );

  // Approval
  const amountToApprove = ethers.utils.parseUnits(reward, 18);

  // Check existing allowance
  const existingAllowance = await tokenContract.allowance(
    await signer.getAddress(),
    process.env.NEXT_PUBLIC_DEPLOYER_ADDR,
  );

  if (existingAllowance.lt(amountToApprove)) {
    const approveTx = await tokenContract
      .connect(signer)
      .approve(process.env.NEXT_PUBLIC_DEPLOYER_ADDR, amountToApprove);
    const approveReceipt = await approveTx.wait();

    if (approveReceipt.status === 0) {
      console.error("Approval failed");
      return;
    }
  }

  // Make the job listing
  const jobDetails = {
    title,
    description,
    reward: ethers.utils.parseUnits(reward, 18),
    deadline,
    token: process.env.NEXT_PUBLIC_SALD_ADDR,
  };

  try {
    const tx = await deployerContract.connect(signer).listJob(jobDetails);
    const receipt = await tx.wait();

    const from = receipt.from;
    const to = receipt.to;
    const transactionHash = receipt.transactionHash;
    const transactionIndex = receipt.transactionIndex;

    // TODO: Check if transactionIndex is correct as Steve mentioned it comes from the maslow contract

    await axios.post(
      "/api/listing",
      {
        from,
        to,
        title,
        description,
        reward: rewardNum,
        transactionHash,
        jobId: transactionIndex,
        date,
        categoryId: category,
      },
      {},
    );
  } catch (error) {
    console.error("Failed to list job due to: " + error);
  }
};

export { postListing };
