import Link from "next/link";
import { FaAnglesRight } from "react-icons/fa6";
import React from "react";

const App = () => {
  return (
    <main className="bg-white flex flex-col items-center justify-center">
      <div className="max-w-screen-xl py-40 min-h-screen flex flex-col items-start">
        <h1 className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-tr from-[#FF4FB8] to-[#FF9FFB]">
          [How Work Should Work]
        </h1>
        <div className="grid grid-cols-8 gap-4 mt-10">
          <div className="bg-[#FF66FF] rounded-md py-4 px-8 flex flex-col items-center justify-center">
            <p className="text-white">View All</p>
          </div>
          <div className="bg-[#FF66FF] rounded-md py-4 px-8 flex flex-col items-center justify-center bg-opacity-60">
            <img
              src="/images/icons/development-icon.svg"
              className="h-10 mb-4"
              alt="Development"
            />
            <p className="text-white text-center">Development</p>
          </div>
          <div className="bg-[#FF66FF] rounded-md py-4 px-8 flex flex-col items-center justify-center bg-opacity-60">
            <img
              src="/images/icons/marketing-icon.svg"
              className="h-10 mb-4"
              alt="Development"
            />
            <p className="text-white text-center">Marketing</p>
          </div>
          <div className="bg-[#FF66FF] rounded-md py-4 px-8 flex flex-col items-center justify-center bg-opacity-60">
            <img
              src="/images/icons/cs-icon.svg"
              className="h-10 mb-4"
              alt="Development"
            />
            <p className="text-white text-center">Customer Service</p>
          </div>
          <div className="bg-[#FF66FF] rounded-md py-4 px-8 flex flex-col items-center justify-center bg-opacity-60">
            <img
              src="/images/icons/design-icon.svg"
              className="h-10 mb-4"
              alt="Development"
            />
            <p className="text-white text-center">Design</p>
          </div>
          <div className="bg-[#FF66FF] rounded-md py-4 px-8 flex flex-col items-center justify-center bg-opacity-60">
            <img
              src="/images/icons/operations-icon.svg"
              className="h-10 mb-4"
              alt="Development"
            />
            <p className="text-white text-center">Operations</p>
          </div>
          <div className="bg-[#FF66FF] rounded-md py-4 px-8 flex flex-col items-center justify-center bg-opacity-60">
            <img
              src="/images/icons/finance-icon.svg"
              className="h-10 mb-4"
              alt="Development"
            />
            <p className="text-white text-center">Finance</p>
          </div>
          <div className="bg-[#FF66FF] rounded-md py-4 px-8 flex flex-col items-center justify-center bg-opacity-60">
            <img
              src="/images/icons/management-icon.svg"
              className="h-10 mb-4"
              alt="Development"
            />
            <p className="text-white text-center">Management</p>
          </div>
        </div>
        <div className="h-1 my-8 bg-gradient-to-r from-red-400 via-yellow-500 to-green-400" />
        <div className="flex flex-col gap-4 w-full">
          <div className="py-4 px-6 border border-gray-300 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-semibold">Product Designer</h3>
              <Link
                className="flex items-center justify-center gap-3 hover:text-[#FE66FF]"
                href="/listing/1"
              >
                <span className="text-3xl font-semibold">Apply</span>
                <FaAnglesRight />
              </Link>
            </div>
            <p className="text-lg mt-2 mb-4">
              We&apos;re looking for a mid-level product designer to join our
              team.
            </p>
            <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
              <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
                1000 $SALD
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
