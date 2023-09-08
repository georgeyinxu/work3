import { ConnectWallet } from "@thirdweb-dev/react";
import { IoCopyOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import React from "react";

const ApplicantCard = () => {
  return (
    <div className="bg-white rounded-2xl transaction-card ml-2">
      <div className="max-h-[40vh] overflow-y-scroll">
        <div className="bg-gray-100 rounded-2xl flex items-center justify-between gap-2 text-gray-500 text-xl p-4 mb-2 border-2 border-[#FF66FF] hover:cursor-pointer">
          <div className="flex items-center justify-center">
            <button className="mr-2">
              <IoCopyOutline />
            </button>
            <div>
              <h4 className="text-[#2e2e2e] ">0xc54...401a</h4>
              <p className="text-[#8E8E8E] text-xs">
                Applied on 7/1/2023, 1:47:38 PM
              </p>
            </div>
          </div>
          <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
            <span className="text-black flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
              <IoChatbubbleEllipsesOutline />
            </span>
          </button>
        </div>
        <div className="bg-gray-100 rounded-2xl flex items-center justify-between gap-2 text-gray-500 text-xl p-4 mb-2 hover:cursor-pointer">
          <div className="flex items-center justify-center">
            <button className="mr-2">
              <IoCopyOutline />
            </button>
            <div>
              <h4 className="text-[#2e2e2e] ">0xc54...401a</h4>
              <p className="text-[#8E8E8E] text-xs">
                Applied on 7/1/2023, 1:47:38 PM
              </p>
            </div>
          </div>
          <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
            <span className="text-black flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
              <IoChatbubbleEllipsesOutline />
            </span>
          </button>
        </div>
        <div className="bg-gray-100 rounded-2xl flex items-center justify-between gap-2 text-gray-500 text-xl p-4 mb-2 hover:cursor-pointer">
          <div className="flex items-center justify-center">
            <button className="mr-2">
              <IoCopyOutline />
            </button>
            <div>
              <h4 className="text-[#2e2e2e] ">0xc54...401a</h4>
              <p className="text-[#8E8E8E] text-xs">
                Applied on 7/1/2023, 1:47:38 PM
              </p>
            </div>
          </div>
          <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
            <span className="text-black flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
              <IoChatbubbleEllipsesOutline />
            </span>
          </button>
        </div>
        <div className="bg-gray-100 rounded-2xl flex items-center justify-between gap-2 text-gray-500 text-xl p-4 mb-2 hover:cursor-pointer">
          <div className="flex items-center justify-center">
            <button className="mr-2">
              <IoCopyOutline />
            </button>
            <div>
              <h4 className="text-[#2e2e2e] ">0xc54...401a</h4>
              <p className="text-[#8E8E8E] text-xs">
                Applied on 7/1/2023, 1:47:38 PM
              </p>
            </div>
          </div>
          <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
            <span className="text-black flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
              <IoChatbubbleEllipsesOutline />
            </span>
          </button>
        </div>
        <div className="bg-gray-100 rounded-2xl flex items-center justify-between gap-2 text-gray-500 text-xl p-4 mb-2 hover:cursor-pointer">
          <div className="flex items-center justify-center">
            <button className="mr-2">
              <IoCopyOutline />
            </button>
            <div>
              <h4 className="text-[#2e2e2e] ">0xc54...401a</h4>
              <p className="text-[#8E8E8E] text-xs">
                Applied on 7/1/2023, 1:47:38 PM
              </p>
            </div>
          </div>
          <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
            <span className="text-black flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
              <IoChatbubbleEllipsesOutline />
            </span>
          </button>
        </div>
      </div>
      <div className="w-full">
        <ConnectWallet
          theme="light"
          style={{
            background:
              "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)",
            borderRadius: 16,
            paddingTop: 20,
            paddingBottom: 20,
            fontSize: 24,
            marginTop: 8,
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default ApplicantCard;
