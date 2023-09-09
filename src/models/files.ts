import mongoose, { Schema } from "mongoose";

const filesSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
  },
  files: [
    {
      filename: String,
      filepath: String,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
  deleteAt: Date,
});

const Files = mongoose.models.Files || mongoose.model("Files", filesSchema);

export default Files;
