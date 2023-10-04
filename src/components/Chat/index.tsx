import React from "react";
import ChatHeader from "@/components/Chat/Header/ChatHeader";
import ChatContent from "@/components/Chat/Content/ChatContent";
import ChatInputBox from "@/components/Chat/Input/ChatInputBox";
import { Message, messages } from "./Data/index";

const Chat = () => {
  const [chatMessages, setChatMessages] = React.useState<Message[]>(messages);

  return (
    <div className="max-w-sm mx-auto mt-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow relative">
        <ChatHeader name={"devlazar"} numberOfMessages={4} />
        <ChatContent messages={chatMessages} />
        <ChatInputBox  />
      </div>
    </div>
  );
};

export default Chat;
