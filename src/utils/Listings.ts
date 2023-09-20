import axios from "axios";
import IListing from "@/interfaces/ListingResponse";

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
  title: string,
  description: string,
  reward: string,
  date: Date,
  categoryId: string,
  listingId: string
) => {
  try {
    const res = await axios.put("/api/listing", {
      title,
      description,
      reward,
      date,
      categoryId,
      listingId,
    });
  } catch (error) {
    console.error("Failed to update listing due to: " + error);
  }

  window.location.href = `/listing/${listingId}`;
};

export { fetchListings, fetchListing, updateListing };
