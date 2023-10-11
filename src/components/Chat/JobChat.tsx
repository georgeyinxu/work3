import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
} from "react";

type Props = {
  jobId: number;
  deployer: string;
  worker: string;
};

const JobChat: React.FC<Props> = ({ jobId, deployer, worker }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [inputValue]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.shiftKey) {
        setInputValue(inputValue + "\n");
      } else {
        // TODO logic to send message to socketIO
        setInputValue("");
      }
    }
  };

  const handleSend = () => {
    // TODO logic to send message to socketIO
    setInputValue("");
  };

  return (
    <div className="bg-white rounded-2xl transaction-card text-black mt-2 md:ml-2">
      <div className="bg-gray-100 min-h-[200px] rounded-2xl"></div>
      <textarea
        ref={textareaRef}
        className="w-full mt-2 border border-black border-solid p-2 rounded-2xl"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      ></textarea>
      <button
        onClick={handleSend}
        style={{
          background:
            "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)",
          borderRadius: 16,
          paddingTop: 4,
          paddingBottom: 4,
          fontSize: 24,
          fontWeight: 600,
          color: "white",
          marginTop: 2,
          width: "100%",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default JobChat;
