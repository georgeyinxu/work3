import axios from "axios";
import { ethers } from "ethers";

import deployerContractAbi from "@/abi/DeployerContractABI.json";

import { IListing } from "@/interfaces/ListingResponse";
import JobStatus from "@/enums/JobStatus";

const fetchListings = async () => {
  let listingsData: IListing[] = [];

  try {
    const res = await axios.get("/api/listing");
    listingsData = res.data.listings as IListing[];
  } catch (error) {
    console.error("Failed to get all listings due to: " + error);
  }

  return listingsData;
};

const fetchListing = async (id: string) => {
  let listingData: IListing | {} = {};

  try {
    const res = await axios.get(`/api/listing?id=${id}`);
    listingData = res.data.listings as IListing;
  } catch (error) {
    console.error("Failed to get all listings due to: " + error);
  }

  return listingData;
};

const updateListing = async (
  e: React.FormEvent<HTMLFormElement>,
  listingId: string,
  file: File | undefined,
  title: string,
  description: string,
  reward: string,
  category: string,
  date: Date,
  location: string,
  type: string,
  jobId: number,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();

  if (!process.env.NEXT_PUBLIC_DEPLOYER_ADDR) {
    console.error("Please set your NEXT_PUBLIC_DEPLOYER_ADDR in .env.local");
    return;
  }

  setIsLoading(true);
  const deadline = new Date(date).getDate();

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    window.ethereum.enable();
    const signer = provider.getSigner();

    const deployerContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_DEPLOYER_ADDR,
      deployerContractAbi,
      signer
    );

    await deployerContract.connect(signer).updateJob({
      jobId,
      title,
      description,
      reward: ethers.utils.parseUnits(reward, 18),
      deadline,
      status: Object.keys(JobStatus).indexOf("PENDING"),
    });

    // Preparing data to save to MongoDB
    const data = new FormData();
    if (file) {
      data.set("file", file);
    }
    data.set("title", title);
    data.set("description", description);
    data.set("reward", reward);
    data.set("jobType", type);
    data.set("date", date.toISOString());
    data.set("categoryId", category);
    data.set("location", location);
    data.set("listingId", listingId);

    const res = await fetch("/api/listing", {
      method: "PUT",
      body: data,
    });

    if (!res.ok) throw new Error(await res.text());
  } catch (error) {
    console.error("Failed to update listing due to: " + error);
  } finally {
    setIsLoading(false);
  }

  window.location.href = `/listing/${listingId}`;
};

export { fetchListings, fetchListing, updateListing };
