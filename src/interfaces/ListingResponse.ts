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
  jobStatus: JobStatus;
  date: string;
  file: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
