import mongoose, { Schema } from "mongoose";

const applicantSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
    applicantAddress: String,
    transactionHash: String,
    fee: Number,
    applicantId: Number,
  },
  {
    timestamps: true,
  },
);

const Applicant =
  mongoose.models.Applicant || mongoose.model("Applicant", applicantSchema);

export default Applicant;
