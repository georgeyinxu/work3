import React from "react";
import { ethers } from "ethers";
import axios from "axios";

import workerContractAbi from "@/abi/WorkerContractABI.json";
import maslowContractAbi from "@/abi/MaslowContractABI.json";
import saldTokenAbi from "@/abi/SaldTokenABI.json";

const applyListing = async (
  _id: string,
  jobId: number,
  fee: string,
  date: Date,
  setApplied: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!process.env.NEXT_PUBLIC_WORKER_ADDR) {
    console.error("Please set your NEXT_PUBLIC_WORKER_ADDR in .env.local");
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

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const deadline = new Date(date).getDate();

  const workerContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_WORKER_ADDR,
    workerContractAbi,
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

  setIsLoading(true);

  try {
    const amountToApprove = ethers.utils.parseUnits(fee, 18);
    const existingAllowance = await tokenContract.allowance(
      await signer.getAddress(),
      process.env.NEXT_PUBLIC_DEPLOYER_ADDR
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

    try {
      const waitForJobListedEvent = new Promise<number>((resolve, reject) => {
        maslowContract.on("JobApplied", (jobId, applicantId, event) => {
          resolve(applicantId.toNumber());
          setApplied(true);
          maslowContract.removeAllListeners("JobApplied");
        });
      });

      const tx = await workerContract
        .connect(signer)
        .applyJob(jobId, ethers.utils.parseUnits(fee, 18), deadline);
      const receipt = await tx.wait();
      console.log(JSON.stringify(receipt));

      const applicantId = await waitForJobListedEvent;
      const from = receipt.from;
      const transactionHash = receipt.transactionHash;

      await axios.post(
        "/api/listing/applicant",
        {
          jobId: _id,
          applicantAddress: from,
          transactionHash,
          fee,
          applicantId,
        },
        {}
      );
    } catch (error: any) {
      if (error.code === "ACTION_REJECTED") {
        console.log("User rejected the MetaMask transaction.");
      } else {
        console.error("Failed to apply for job due to: ", error);
      }
    }
  } catch (error) {
    console.error("Failed to apply for job due to: ", error);
  } finally {
    setIsLoading(false);
  }
};

const checkApplied = async (address: string, post: string) => {
  let applied = false;

  try {
    const res = await axios.get(
      `/api/user/applied?postId=${post}&address=${address}`
    );

    applied = res.data.data;
  } catch (error) {
    console.error("Failed to check if wallet address has applied");
  }

  return applied;
};

const checkWorkerSelected = async (jobId: string, walletAddress: string) => {
  let selected = false;
  let applicantDetails = {
    _id: "",
    post: "",
    applicantAddress: "",
    transactionHash: "",
    fee: 0,
    applicantId: 0,
    selected: false,
    claimed: false,
    createdAt: "",
    updatedAt: "",
    __v: 0,
  };

  try {
    const res = await axios.get(
      `/api/listing/applicant/successful?listingId=${jobId}&address=${walletAddress}`
    );

    selected = res.data.data;
    applicantDetails = res.data.applicantDetails;
  } catch (error) {
    console.error("Failed to check if applicant was selected");
  }

  return { data: selected, applicantDetails };
};

const claimReward = async (
  applicantId: number,
  listingId: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setClaimed: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!process.env.NEXT_PUBLIC_WORKER_ADDR) {
    console.error("Please set your NEXT_PUBLIC_WORKER_ADDR in .env.local");
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

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const workerContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_WORKER_ADDR,
    workerContractAbi,
    signer
  );
  // const tokenContract = new ethers.Contract(
  //   process.env.NEXT_PUBLIC_SALD_ADDR,
  //   saldTokenAbi,
  //   signer
  // );
  // const maslowContract = new ethers.Contract(
  //   process.env.NEXT_PUBLIC_MASLOW_ADDR,
  //   maslowContractAbi,
  //   signer
  // );

  try {
    setIsLoading(true);
    const tx = await workerContract.connect(signer).claimApplicant(applicantId);

    await tx.wait();

    await axios.put(
      "/api/user/claim",
      {
        applicantId,
        listingId,
      },
      {}
    );

    setClaimed(true);
  } catch (error: any) {
    if (error.code === "ACTION_REJECTED") {
      console.log("User rejected the MetaMask transaction.");
    } else {
      console.error("Failed to claim reward due to: ", error);
    }
  } finally {
    setIsLoading(false);
  }
};

export { applyListing, checkApplied, checkWorkerSelected, claimReward };
