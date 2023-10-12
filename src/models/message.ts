import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  roomId: String,
  message: String,
  sender: String,
  timestamp: Date,
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
