import React from "react";
import { IMessage } from "@/interfaces/Message";

interface ChatContentProps {
  messages: IMessage[];
}

const ChatContent = ({ messages }: ChatContentProps) => {
  return (
    <div className="max-h-64 h-64 px-6 py-1 overflow-auto">
      {messages.map((message: IMessage, index: number) => (
        <div
          key={index}
          className={`py-2 flex flex-row w-full ${
            message.isChatOwner ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-4 w-fit py-3 flex flex-col rounded-full ${
              message.isChatOwner
                ? "order-1 mr-2 bg-[#598BF6] text-white"
                : "order-2 ml-2 bg-blue-100 text-black"
            }`}
          >
            <span className="text-sm">{message.text}</span>
            <span
              className={`text-xs ${
                message.isChatOwner ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {new Date(message.sentAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatContent;
