import mongoose, { Schema } from "mongoose";
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
    jobType: String,
    jobStatus: {
      type: String,
      enum: JobStatus,
      default: JobStatus.ACTIVE,
    },
    location: String,
    date: Date,
  },
  {
    timestamps: true,
  },
);

const Listing =
  mongoose.models.Listing || mongoose.model("Listing", listingSchema);

export default Listing;
