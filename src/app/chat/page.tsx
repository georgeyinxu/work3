"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, KeyboardEvent, useState } from "react";
import { VscSend } from "react-icons/vsc";
import { BiMessageDetail } from "react-icons/bi";
import { BsCardImage } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { truncateAddress } from "@/utils/Common";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import ChatPlaceholder from "@/components/Chat/ChatPlaceholder";
import { getRoom } from "@/utils/Room";
import { IRoom } from "@/interfaces/RoomResponse";
import { io } from "socket.io-client";
import ChatContent from "@/components/Chat/ChatContent";
import { getMessages, saveMessage } from "@/utils/Message";
// import socket from "@/utils/Socket";

const fakeRooms = [
  {
    title: "Smart Contract Developer",
    deployer: "0x5F5A9e67142264d6ccb54e20BB29E36c5Ddfe79B",
    roomId: "0001",
  },
  {
    title: "Ai Developer",
    deployer: "0x5F5A9e67142264d6ccb54e20BB29E36c5Ddfe79B",
    roomId: "0002",
  },
  {
    title: "UI/UX Designer",
    deployer: "0x5F5A9e67142264d6ccb54e20BB29E36c5Ddfe79B",
    roomId: "0001",
  },
  {
    title: "Smart Contract Developer",
    deployer: "0x5F5A9e67142264d6ccb54e20BB29E36c5Ddfe79B",
    roomId: "0001",
  },
];

const Chat = () => {
  const router = useRouter();
  const address = useAddress();

  const [inputValue, setInputValue] = useState<string>("");
  const [rooms, setRooms] = useState<undefined | IRoom[]>(undefined);
  const [selectedRoom, setSelectedRoom] = useState<undefined | IRoom>(
    undefined
  );
  const [rows, setRows] = useState<number>(1);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [loadMsg, setLoadMsg] = useState<boolean>(false);

  const socket = io(process.env.NEXT_SOCKET_IO_URL || "http://localhost:3001");

  const [chat, setChat] = useState<any>([]);

  useEffect(() => {
    socket.on("receive_msg", (data: any) => {
      console.log("Message received: ", data);
      setChat((pre) => [...pre, data]);
    });
  }, [socket]);

  useEffect(() => {
    const getRooms = async () => {
      if (address) {
        const _rooms = await getRoom(address);
        if (_rooms) {
          console.log("_rooms", _rooms);
          setRooms(_rooms);
        }
      }
    };

    getRooms();
  }, [address]);

  useEffect(() => {
    const getMessagesApi = async (id: string) => {
      if (!loadMsg) {
        const msg = await getMessages(id);
        setChat(msg);
        setLoadMsg(true);
      }
    };
    if (selectedRoom?._id) {
      socket.emit("join_room", selectedRoom?._id);
      getMessagesApi(selectedRoom?._id);
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!inputValue.includes("\n")) {
      setRows(1);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.shiftKey) {
        setInputValue(inputValue + "\n");
        if (rows < 3) {
          setRows((row) => row + 1);
        }
      } else {
        handleSend(e);
        setInputValue("");
        setRows(1);
      }
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (inputValue !== "" && selectedRoom) {
      const msgData: any = {
        roomId: selectedRoom._id,
        sender: address,
        message: inputValue,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      console.log("sent message", msgData);
      await socket.emit("send_msg", msgData);
      setInputValue("");
      await saveMessage(
        selectedRoom._id,
        address ?? "",
        inputValue,
        new Date()
      );
    }
  };

  return (
    <div className="bg-white flex items-start overflow-y-hidden">
      <div className="flex flex-col space-between max-h-[100vh] md:h-[100vh] border-r border-solid border-gray-300">
        {/* <div className="flex flex-col space-between max-h-[calc(100vh-100px)] md:h-[calc(100vh-72px)] border-r border-solid border-gray-300"> */}
        <div style={{ width: "15vw" }} className="h-full w-full text-black">
          {rooms &&
            rooms.map((room, index) => (
              <div
                key={index}
                className="flex items-start cursor-pointer hover:bg-[#f8e8fa] px-4 py-2"
                onClick={() => setSelectedRoom(room)}
              >
                <div className="text-[24px] mr-3 mt-1">
                  <BiMessageDetail
                    style={{
                      color: "#265073",
                    }}
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <span className="text-[#265073] text-bold">
                    {truncateAddress(room.deployer)}
                  </span>
                  <span className="text-[#BBBBBB]">{room.listingId.title}</span>
                </div>
              </div>
            ))}
        </div>
        <div className="border-t border-solid border-gray-300 pt-4">
          <div className="flex justify-start items-center mb-2 hover:bg-[#f8e8fa] px-4 py-3 cursor-pointer">
            <div className="px-2">
              <AiOutlineUser size={24} style={{ color: "#444" }} />
            </div>
            <span className="text-[#444] text-[16px]">My Account</span>
          </div>
          <div className="px-4 mb-4">
            <ConnectWallet
              theme="light"
              style={{
                background:
                  "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)",
                borderRadius: 40,
                paddingLeft: 36,
                paddingRight: 36,
                paddingTop: 16,
                paddingBottom: 16,
                width: "100%",
                justifyContent: "center",
              }}
            />
          </div>
        </div>
      </div>
      <div className="h-[100vh] text-black w-full flex flex-col justify-between relative">
        <div className="flex justify-between w-full p-5">
          <a href="/" className="flex items-center">
            <img
              src="/images/web3to-logo.svg"
              className="h-6 mr-3"
              alt="Web3.to Logo"
            />
          </a>
          <button
            style={{
              background:
                "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(245,100,100,1) 48%, rgba(255,211,211,1) 100%)",
              borderRadius: "30px",
              padding: "16px 40px",
              fontSize: "20px",
              color: "#FFF",
              fontWeight: "bold",
            }}
          >
            Submit Dispute
          </button>
        </div>
        <div className="w-full h-full px-[60px] py-[12px]">
          {!selectedRoom ? (
            <div className="flex justify-center w-full items-start h-full">
              <ChatPlaceholder />
            </div>
          ) : (
            <div className="self-start">
              <ChatContent
                socket={socket}
                address={address || ""}
                chat={chat}
              />
            </div>
          )}
        </div>
        <div className="w-full absolute bottom-0 left-0 w-full bg-white p-4">
          <div className="w-full flex flex-1 justify-center items-center mb-12 ">
            <div className="flex bg-[#f2f4fa] px-8 py-4 items-center rounded-[20px]">
              <div className="mr-4">
                <button>
                  <BsCardImage size={20} style={{ color: "#777" }} />
                </button>
              </div>
              <div className="">
                <textarea
                  ref={textareaRef}
                  className="w-full border-none p-2 rounded-2xl bg-transparent"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type a message"
                  onKeyPress={handleKeyPress}
                  rows={rows}
                  cols={60}
                  style={{ border: "none" }}
                ></textarea>
              </div>
              <div className="ml-4">
                <button onClick={handleSend}>
                  <VscSend size={20} style={{ color: "#777" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
