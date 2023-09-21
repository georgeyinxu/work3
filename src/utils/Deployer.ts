import { ethers } from "ethers";
import axios from "axios";

import deployerContractAbi from "@/abi/DeployerContractABI.json";
import maslowContractAbi from "@/abi/MaslowContractABI.json";
import saldTokenAbi from "@/abi/SaldTokenABI.json";
import workerContractAbi from "@/abi/WorkerContractABI.json";

const postListing = async (
  title: string,
  description: string,
  reward: string,
  category: string,
  date: Date,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!process.env.NEXT_PUBLIC_DEPLOYER_ADDR) {
    console.error("Please set your NEXT_PUBLIC_DEPLOYER_ADDR in .env.local");
    return;
  }

  if (!process.env.NEXT_PUBLIC_MASLOW_ADDR) {
    console.error("Please set your NEXT_PUBLIC_MASLOW_ADDR in .env.local");
    return;
  }

  if (!process.env.NEXT_PUBLIC_SALD_ADDR) {
    console.error("Please set your NEXT_PUBLIC_SALD_ADDR in .env.local");
    return;
  }

  setIsLoading(true);
  const deadline = new Date(date).getDate();
  const rewardNum = parseFloat(reward);
  let maslowJobId = 0;
  let createdListingId;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  window.ethereum.enable();
  const signer = provider.getSigner();

  const deployerContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_DEPLOYER_ADDR,
    deployerContractAbi,
    signer
  );
  const tokenContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_SALD_ADDR,
    saldTokenAbi,
    signer
  );
  const maslowContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_MASLOW_ADDR,
    maslowContractAbi,
    signer
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
    const waitForJobListedEvent = new Promise<number>((resolve, reject) => {
      maslowContract.on("JobListed", (jobId, event) => {
        resolve(jobId.toNumber());
        maslowContract.removeAllListeners("JobListed");
      });
    });

    const tx = await deployerContract.connect(signer).listJob(jobDetails);
    const receipt = await tx.wait();

    const maslowJobId = await waitForJobListedEvent;
    const from = receipt.from;
    const to = receipt.to;
    const transactionHash = receipt.transactionHash;

    const res = await axios.post(
      "/api/listing",
      {
        from,
        to,
        title,
        description,
        reward: rewardNum,
        transactionHash,
        jobId: maslowJobId,
        date,
        categoryId: category,
      },
      {}
    );

    createdListingId = res.data.data;

    window.location.href = `/listing/${createdListingId}`;
  } catch (error: any) {
    if (error.code === "ACTION_REJECTED") {
      console.log("User rejected the MetaMask transaction.");
    } else {
      console.error("Failed to list job due to: ", error);
    }
  } finally {
    setIsLoading(false);
  }
};

const pickApplicant = async (
  applicantId: number,
  listingId: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setPickedWorker: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!process.env.NEXT_PUBLIC_DEPLOYER_ADDR) {
    console.error("Please set your NEXT_PUBLIC_DEPLOYER_ADDR in .env.local");
    return;
  }

  if (!process.env.NEXT_PUBLIC_MASLOW_ADDR) {
    console.error("Please set your NEXT_PUBLIC_MASLOW_ADDR in .env.local");
    return;
  }

  if (!process.env.NEXT_PUBLIC_SALD_ADDR) {
    console.error("Please set your NEXT_PUBLIC_SALD_ADDR in .env.local");
    return;
  }

  setIsLoading(true);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const deployerContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_DEPLOYER_ADDR,
    deployerContractAbi,
    signer
  );

  try {
    const tx = await deployerContract
      .connect(signer)
      .pickApplicant(applicantId);
    const receipt = await tx.wait();

    await axios.put("/api/listing/applicant", {
      applicantId,
      listingId,
      status: "APPLICATION"
    });

    setPickedWorker(true);
  } catch (error: any) {
    if (error.code === "ACTION_REJECTED") {
      console.log("User rejected the MetaMask transaction.");
    } else {
      console.error("Failed to pick applicant for job due to: ", error);
    }
  } finally {
    setIsLoading(false);
  }
};

const completeJob = async (
  jobId: number,
  applicantId: number,
  listingId: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setCompleteJobDone: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (!process.env.NEXT_PUBLIC_DEPLOYER_ADDR) {
    console.error("Please set your NEXT_PUBLIC_DEPLOYER_ADDR in .env.local");
    return;
  }

  if (!process.env.NEXT_PUBLIC_MASLOW_ADDR) {
    console.error("Please set your NEXT_PUBLIC_MASLOW_ADDR in .env.local");
    return;
  }

  if (!process.env.NEXT_PUBLIC_SALD_ADDR) {
    console.error("Please set your NEXT_PUBLIC_SALD_ADDR in .env.local");
    return;
  }

  setIsLoading(true);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const deployerContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_DEPLOYER_ADDR,
    deployerContractAbi,
    signer
  );

  try {
    const tx = await deployerContract.connect(signer).finishJob(jobId);

    const receipt = await tx.wait();
    console.log(receipt);

    await axios.put("/api/listing/applicant", {
      applicantId,
      listingId,
      status: "COMPLETED"
    });

    setCompleteJobDone(true);
  } catch (error: any) {
    if (error.code === "ACTION_REJECTED") {
      console.log("User rejected the MetaMask transaction.");
    } else {
      console.error("Failed to pick applicant for job due to: ", error);
    }
  } finally {
    setIsLoading(false);
  }
};

export { postListing, pickApplicant, completeJob };
