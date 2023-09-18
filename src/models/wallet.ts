import mongoose, { Schema } from "mongoose";

const walletSchema = new Schema({
  address: String,
  createdAt: Date,
});

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);

export default Wallet;
