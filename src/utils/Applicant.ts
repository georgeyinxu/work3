import axios from "axios";
import IApplicant from "@/interfaces/ApplicantResponse";

const fetchApplicants = async (listingId: string) => {
  let applicants: IApplicant[] = [];
  try {
    const res = await axios.get(
      `/api/listing/applicant?listingId=${listingId}`
    );
    applicants = res.data.data;
  } catch (error) {
    console.error("Failed to get all applicants due to: " + error);
  }

  return applicants;
};

export { fetchApplicants };
