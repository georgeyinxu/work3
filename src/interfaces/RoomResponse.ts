export interface IRoom {
  _id: string;
  deployer: string;
  worker: string;
  createdAt: Date;
  __v: number;
  listingId: {
    title: string;
    _id: string;
  };
}
