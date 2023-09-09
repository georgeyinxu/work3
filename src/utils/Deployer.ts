import { ethers } from "ethers";
import axios from "axios";

import deployerContractAbi from "@/abi/DeployerContractABI.json";
import saldTokenAbi from "@/abi/SaldTokenABI.json";

// const postListing = async (
//   title: string,
//   description: string,
//   reward: string,
//   deadline: number,
// ) => {
//   if (!process.env.NEXT_PUBLIC_MUMBAI_URL) {
//     console.error("Please set your NEXT_PUBLIC_MUMBAI_URL in .env.local");
//     return;
//   }
//
//   if (!process.env.NEXT_PUBLIC_DEPLOYER_ADDR) {
//     console.error("Please set your NEXT_PUBLIC_DEPLOYER_ADDR in .env.local");
//     return;
//   }
//
//   if (!process.env.NEXT_PUBLIC_SALD_ADDR) {
//     console.error("Please set your NEXT_PUBLIC_SALD_ADDR in .env.local");
//     return;
//   }
//
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();
//
//   const deployerContract = new ethers.Contract(
//     process.env.NEXT_PUBLIC_DEPLOYER_ADDR,
//     deployerContractAbi,
//     signer,
//   );
//   const tokenContract = new ethers.Contract(
//     process.env.NEXT_PUBLIC_SALD_ADDR,
//     saldTokenAbi,
//     signer,
//   );
//
//   // Debug: Log the ABI to check for the event
//   console.log(
//     "Deployer Contract ABI: ",
//     JSON.stringify(deployerContractAbi, null, 2),
//   );
//
//   // Approval
//   const amountToApprove = ethers.utils.parseUnits(reward, 18);
//
//   // Check existing allowance
//   const existingAllowance = await tokenContract.allowance(
//     await signer.getAddress(),
//     process.env.NEXT_PUBLIC_DEPLOYER_ADDR,
//   );
//   console.log("Existing Allowance: ", existingAllowance.toString());
//
//   if (existingAllowance.lt(amountToApprove)) {
//     const approveTx = await tokenContract
//       .connect(signer)
//       .approve(process.env.NEXT_PUBLIC_DEPLOYER_ADDR, amountToApprove);
//     const approveReceipt = await approveTx.wait();
//     console.log("Approval Receipt: ", approveReceipt);
//
//     if (approveReceipt.status === 0) {
//       console.error("Approval failed");
//       return;
//     }
//   }
//
//   // Debug: Re-check new allowance
//   const newAllowance = await tokenContract.allowance(
//     await signer.getAddress(),
//     process.env.NEXT_PUBLIC_DEPLOYER_ADDR,
//   );
//   console.log("New Allowance: ", newAllowance.toString());
//
//   // Make the job listing
//   const jobDetails = {
//     title,
//     description,
//     reward: ethers.utils.parseUnits(reward, 18),
//     deadline,
//     token: process.env.NEXT_PUBLIC_SALD_ADDR,
//   };
//
//   try {
//     const tx = await deployerContract.connect(signer).listJob(jobDetails);
//     const receipt = await tx.wait();
//
//     console.log(
//       `Job listed successfully with receipt: ${JSON.stringify(receipt)}`,
//     );
//   } catch (error) {
//     console.error("Failed to list job due to: " + error);
//   }
// };

const postListing = async (
  title: string,
  description: string,
  reward: string,
  category: string,
  date: Date,
) => {
  const from = "0xc5409Fa6e685Ff8692804d286D99E313059F401a";
  const to = "0x3E4ddE1AF4D349cBa509C2f78e04f2F7a3465C20";
  const transactionHash =
    "0x44c0d967c04e7ae1464224fe797474bf2d0d9c378dc5c72e53d398000cc277e4";
  const transactionIndex = 7;
  const deadline = new Date(date).getDate();
  const rewardNum = parseFloat(reward);

  try {
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
    console.error("Error uploading listing due to: " + error);
  }
};

export { postListing };
