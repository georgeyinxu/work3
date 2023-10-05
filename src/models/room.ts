import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    deployer: String,
    worker: String,
    listingId: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  },
  { timestamps: true }
);

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room;
