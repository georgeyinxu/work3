"use client";

import { ConnectWallet } from "@thirdweb-dev/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const address = useAddress();
  const addWalletAddress = async (address: string) => {
    try {
      await axios.post(
        "/api/wallet",
        {
          address,
        },
        {}
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (address) {
      addWalletAddress(address);
    }
  }, [address]);

  return (
    <nav className="border-gray-200 bg-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <img
            src="/images/web3to-logo.svg"
            className="h-6 mr-3"
            alt="Web3.to Logo"
          />
        </a>
        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden md:flex">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent items-center">
            <li>
              <a href="/listing/create" className="block">
                <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r w-full md:w-auto">
                  <span className="block text-black p-4 font-semibold rounded-full bg-white hover:bg-transparent transition">
                    Create Listing
                  </span>
                </button>
              </a>
            </li>
            <li>
              <div className="block my-4 md:my-0">
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
            </li>
          </ul>
        </div>
        <div
          className={`w-full md:w-auto ${open ? "block" : "hidden"}`}
          id="navbar-solid-bg"
        >
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <a href="/listing/create" className="block">
                <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r w-full md:w-auto">
                  <span className="block text-black p-4 font-semibold rounded-full bg-white hover:bg-transparent transition">
                    Create Listing
                  </span>
                </button>
              </a>
            </li>
            <li>
              <div className="block my-4">
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
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
