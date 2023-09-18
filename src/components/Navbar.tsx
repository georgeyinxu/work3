"use client";

import { ConnectWallet } from "@thirdweb-dev/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";

const Navbar = () => {
  const address = useAddress();
  const addWalletAddress = async (address: string) => {
    try {
      await axios.post(
        "/api/wallet",
        {
          address,
        },
        {},
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
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <img
            src="/images/web3to-logo.svg"
            className="h-6 mr-3"
            alt="Web3.to Logo"
          />
        </a>
        <div className="flex md:order-2 gap-2">
          <a href="/listing/create">
            <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
              <span className="block text-black p-4 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
                Create Listing
              </span>
            </button>
          </a>
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
            }}
          />
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FE66FF] md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Find Talents
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
