import mongoose, { Schema } from "mongoose";

const listingSchema = new Schema({
  from: String,
  to: String,
  title: String,
  description: String,
  reward: String,
  transactionHash: String,
  deadline: Number,
  createdAt: Date,
  updatedAt: Date,
});

const Listing =
  mongoose.models.Listing || mongoose.model("Listing", listingSchema);

export default Listing;
