import mongoose, { Schema } from "mongoose";

const jobTypeSchema = new Schema(
  {
    title: String,
  },
  {
    timestamps: true,
  }
);

const JobType =
  mongoose.models.JobType || mongoose.model("JobType", jobTypeSchema);

export default JobType;
