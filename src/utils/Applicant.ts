import axios from "axios";
import {IApplicant} from "@/interfaces/ApplicantResponse";

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

const checkIfClaimed = async (applicantId: number) => {
  let claimed = false;

  try {
    const res = await axios.get(`/api/user/claim?applicantId=${applicantId}`)

    claimed = res.data.data;
  } catch (error) {
    console.error("Failed to check if applicant has claimed due to: " + error)
  }

  return claimed;
}

export { fetchApplicants, checkIfClaimed };
