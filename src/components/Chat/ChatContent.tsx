import { truncateAddress } from "@/utils/Common";
import React, { useState, useEffect, useRef } from "react";

type Props = {
  socket: any;
  address: string;
  chat: any[];
};

const JobChat: React.FC<Props> = ({ socket, address, chat }) => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current) {
      container.current.scrollTop = container.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div
      // ref={container}
      className="h-full overflow-y-scroll max-h-screen text-black"
    >
      {chat.map(({ roomId, sender, message, time }, key: number) => (
        <div key={key} className="flex flex-col">
          <div>
            <div
              className={`mb-1 flex ${
                sender === address ? "justify-end" : "justify-start"
              }`}
            >
              <span
                className={`px-4 py-3 rounded-[20px] ${
                  sender === address ? "bg-[#95e88b]" : "bg-[#d1d1d1]"
                }`}
              >
                {message}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobChat;
