import axios from "axios";
import IListing from "@/interfaces/listingResponse";

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

export { fetchListings, fetchListing };
