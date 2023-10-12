import React, { useState, useRef } from "react";
import { TbMessages } from "react-icons/tb";

const ChatPlaceholder = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div className="bg-transparent rounded-2xl text-black justify-center">
      <div className="pb-30" style={{ marginBottom: "150px" }}>
        <img src="/images/web3to-logo.svg" className="h-8" alt="Web3.to Logo" />
      </div>

      <div className="pt-30 flex flex-col justify-center items-center w-full">
        <TbMessages size={40} style={{ color: "#555" }} />
        <span className="my-2 text-[20px] font-bold text-[#555]">Chat</span>
        <span className=" my-5 text-[14px] text-[#555]">
          Feel free to chat with <br />
          the deployer here!
        </span>
      </div>
    </div>
  );
};

export default ChatPlaceholder;
