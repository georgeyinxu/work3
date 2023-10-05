import React from "react";
import DebouncedInput from "@/components/Chat/Input/DebouncedInput";
import { IMessage } from "@/interfaces/Message";
interface ChatInputBoxProps {
  sendMessage: (message: IMessage) => void;
}

const ChatInputBox = ({ sendMessage }: ChatInputBoxProps) => {
  const [newMessage, setNewMessage] = React.useState("");

  const doSendMessage = () => {
    if (newMessage && newMessage.length > 0) {
      const newMessagePayload: IMessage = {
        sentAt: new Date(),
        sentBy: "devlazar",
        isChatOwner: true,
        text: newMessage,
      };
      sendMessage(newMessagePayload);
      setNewMessage("");
    }
  };

  return (
    <div className="px-6 py-3 bg-white w-100 overflow-hidden rounded-bl-xl rounded-br-xla">
      <div className="flex flex-row items-center space-x-5">
        <DebouncedInput
          value={newMessage ?? ""}
          debounce={100}
          onChange={(value) => setNewMessage(String(value))}
        />
        <button
          type="button"
          disabled={!newMessage || newMessage.length === 0}
          className="px-3 py-2 text-xs font-medium text-center text-white bg-[#FF66FF] rounded-lg hover:bg-white border-2 border-[#FF66FF] hover:text-[#202020] focus:ring-4 focus:outline-none focus:ring-purple-300 disabled:opacity-50"
          onClick={() => doSendMessage()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInputBox;
