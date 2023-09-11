interface IApplicant {
  _id: string;
  post: string;
  applicantAddress: string;
  transactionHash: string;
  fee: number;
  applicantId: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default IApplicant;
