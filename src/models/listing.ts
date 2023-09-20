import JobStatus from "@/enums/JobStatus";
import mongoose, { Schema } from "mongoose";

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
      enum: JobStatus,
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
