import axios from "axios";
import IListing from "@/interfaces/listingResponse";

const fetchListings = async () => {
  let listingsData: IListing[] = [];

  try {
    const res = await axios.get("/api/listing");
    listingsData = res.data.listings as IListing[];
  } catch (error) {
    console.error("Failed to get all categories due to: " + error);
  }

  return listingsData;
};

export { fetchListings };
