import React from "react";
import ChatHeader from "@/components/Chat/Header/ChatHeader";
import ChatContent from "@/components/Chat/Content/ChatContent";
import ChatInputBox from "@/components/Chat/Input/ChatInputBox";
import { messages } from "./Data/index";
import { IMessage } from "@/interfaces/Message";

const Chat = () => {
  const [chatMessages, setChatMessages] = React.useState<IMessage[]>(messages);

  const sendMessage = (message: IMessage) => {
    setChatMessages((prev) => [...prev, message]);
  };

  return (
    <div className="max-w-sm mx-auto mt-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow relative">
        <ChatHeader name={"devlazar"} numberOfMessages={4} />
        <ChatContent messages={chatMessages} />
        <ChatInputBox sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
