import axios from "axios";
import { IListing } from "@/interfaces/ListingResponse";

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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();
  try {
    setIsLoading(true)
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
    data.set("listingId", listingId)

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

  // TODO: Add integration with the smart contract
};

export { fetchListings, fetchListing, updateListing };
