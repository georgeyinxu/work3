interface IListing {
  _id: string;
  from: string;
  to: string;
  title: string;
  description: string;
  category: string;
  reward: number;
  transactionHash: string;
  jobId: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export default IListing;
