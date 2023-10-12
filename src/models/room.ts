import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
  deployer: String,
  listingId: String,
  // listingId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Listing",
  // },
  worker: String,
  createdAt: Date,
  updatedAt: Date,
});

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room;
