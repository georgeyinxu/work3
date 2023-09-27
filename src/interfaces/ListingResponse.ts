import JobStatus from "@/enums/JobStatus";

export interface IListing {
  _id: string;
  from: string;
  to: string;
  title: string;
  description: string;
  category: string;
  reward: number;
  transactionHash: string;
  jobId: number;
  jobType: string;
  jobStatus: JobStatus;
  location: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
