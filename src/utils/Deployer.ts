import { ethers } from "ethers";

import deployerContractAbi from "@/abi/DeployerContractABI.json";
import saldTokenAbi from "@/abi/SaldTokenABI.json";

const postListing = async (
  title: string,
  description: string,
  reward: string,
  deadline: number,
) => {
  if (!process.env.NEXT_PUBLIC_MUMBAI_URL) {
    console.error("Please set your NEXT_PUBLIC_MUMBAI_URL in .env.local");
    return;
  }

  if (!process.env.NEXT_PUBLIC_DEPLOYER_ADDR) {
    console.error("Please set your NEXT_PUBLIC_DEPLOYER_ADDR in .env.local");
    return;
  }

  if (!process.env.NEXT_PUBLIC_SALD_ADDR) {
    console.error("Please set your NEXT_PUBLIC_SALD_ADDR in .env.local");
    return;
  }

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

  // Debug: Log the ABI to check for the event
  console.log(
    "Deployer Contract ABI: ",
    JSON.stringify(deployerContractAbi, null, 2),
  );

  // Approval
  const amountToApprove = ethers.utils.parseUnits(reward, 18);

  // Check existing allowance
  const existingAllowance = await tokenContract.allowance(
    await signer.getAddress(),
    process.env.NEXT_PUBLIC_DEPLOYER_ADDR,
  );
  console.log("Existing Allowance: ", existingAllowance.toString());

  if (existingAllowance.lt(amountToApprove)) {
    const approveTx = await tokenContract
      .connect(signer)
      .approve(process.env.NEXT_PUBLIC_DEPLOYER_ADDR, amountToApprove);
    const approveReceipt = await approveTx.wait();
    console.log("Approval Receipt: ", approveReceipt);

    if (approveReceipt.status === 0) {
      console.error("Approval failed");
      return;
    }
  }

  // Debug: Re-check new allowance
  const newAllowance = await tokenContract.allowance(
    await signer.getAddress(),
    process.env.NEXT_PUBLIC_DEPLOYER_ADDR,
  );
  console.log("New Allowance: ", newAllowance.toString());

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

    console.log(
      `Job listed successfully with receipt: ${JSON.stringify(receipt)}`,
    );
  } catch (error) {
    console.error("Failed to list job due to: " + error);
  }
};

export { postListing };
