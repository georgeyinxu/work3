import mongoose, { Schema } from "mongoose";
import { Enum } from "@solana/web3.js";
import JobStatus from "@/enums/JobStatus";

const listingSchema = new Schema(
  {
    from: String,
    to: String,
    title: String,
    description: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    reward: Number,
    transactionHash: String,
    jobId: Number,
    jobStatus: {
      type: String,
      enum: Object.values(JobStatus),
      default: JobStatus.ACTIVE,
    },
    date: Date,
  },
  {
    timestamps: true,
  },
);

const Listing =
  mongoose.models.Listing || mongoose.model("Listing", listingSchema);

export default Listing;
