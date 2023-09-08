import React from "react";
import { ImArrowUpRight2 } from "react-icons/im";

const ListingCard = () => {
  return (
    <div className="bg-white rounded-xl p-8 mb-4 my-6 grid grid-cols-3">
      <div className="col-span-2">
        <h3 className="text-[#222222] text-3xl font-semibold">
          Product Designer
        </h3>
        <p className="overflow-hidden overflow-ellipsis text-[#222222] mt-2 line-clamp-3">
          Ethereum is a smart contract platform that enables developers to build
          tokens and decentralized applications (dapps). ETH is the native
          currency for the Ethereum platform and also works as the transaction
          fees to miners on the Ethereum network. Ethereum is the pioneer for
          blockchain based smart contracts. Smart contract is essentially a
          computer code that runs exactly as programmed without any possibility
          of downtime, censorship, fraud or third-party interference. It can
          facilitate the exchange of money, content, property, shares, or
          anything of value. When running on the blockchain a smart contract
          becomes like a self-operating computer program that automatically
          executes when specific conditions are met. Ethereum allows programmers
          to run complete-turing smart contracts that is capable of any
          customizations. Rather than giving a set of limited operations,
          Ethereum allows developers to have complete control over customization
          of their smart contract, giving developers the power to build unique
          and innovative applications. Ethereum being the first blockchain based
          smart contract platform, they have gained much popularity, resulting
          in new competitors fighting for market share. The competitors
          includes: Ethereum Classic which is the oldchain of Ethereum, Qtum,
          EOS, Neo, Icon, Tron and Cardano. Ethereum wallets are fairly simple
          to set up with multiple popular choices such as myetherwallet,
          metamask, and Trezor. Read here for more guide on using ethereum
          wallet: How to Use an Ethereum Wallet
        </p>
        <h6 className="text-sm text-[#7D7D7D] mt-8">Files</h6>
        <div className="flex items-center justify-start gap-4 mt-2">
          <button className="text-sm text-[#FF66FF] flex items-center gap-2">
            <span className="truncate">Design Assignment 1</span>
            <ImArrowUpRight2 />
          </button>
          <button className="text-sm text-[#FF66FF] flex items-center gap-2">
            <span className="truncate">Design Assignment 2</span>
            <ImArrowUpRight2 />
          </button>
          <button className="text-sm text-[#FF66FF] flex items-center gap-2">
            <span className="truncate">Design Assignment 3</span>
            <ImArrowUpRight2 />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between px-10">
        <div>
          <p className="text-sm text-[#7D7D7D]">Total Payout</p>
          <div className="flex items-center justify-center">
            <h3 className="text-[#222222] text-3xl font-semibold">$1000</h3>
            <img
              src="/images/sald-token.svg"
              className="w-14 h-14"
              alt="sald token"
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-[#7D7D7D]">Ends In</p>
          <h3 className="text-[#222222] text-3xl font-semibold">22D 23H 22M</h3>
        </div>
        <div>
          <p className="text-sm text-[#7D7D7D]">Last Updated</p>
          <h3 className="text-[#222222] text-3xl font-semibold">
            08/06/2023 7:15PM
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
