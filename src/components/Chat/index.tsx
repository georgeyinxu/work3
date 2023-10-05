import React, { useEffect } from "react";
import { io } from "socket.io-client";
import ChatHeader from "@/components/Chat/Header/ChatHeader";
import ChatContent from "@/components/Chat/Content/ChatContent";
import ChatInputBox from "@/components/Chat/Input/ChatInputBox";
import { IMessage } from "@/interfaces/Message";

const Chat = () => {
  const [chatMessages, setChatMessages] = React.useState<IMessage[]>([]);
  // let socket: any;
  // socket = io("http://localhost:3001");

  // useEffect(() => {
  //   socket.on("receive_msg", (data: IMessage) => {
  //     setChatMessages((prev) => [...prev, data]);
  //   });
  // }, [socket]);

  return (
    <div className="max-w-sm mx-auto mt-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow relative">
        <ChatHeader name={"devlazar"} numberOfMessages={4} />
        <ChatContent messages={chatMessages} />
        {/* <ChatInputBox socket={socket} roomId={4} /> */}
      </div>
    </div>
  );
};

export default Chat;
