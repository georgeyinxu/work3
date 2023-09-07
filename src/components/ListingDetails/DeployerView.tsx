import React from "react";
import Link from "next/link";
import UserDeployments from "@/components/ListingDetails/UserDeployments";
import DeploymentTabs from "@/components/ListingDetails/DeploymentTabs";
import ApplicantCard from "@/components/ListingDetails/ApplicantCard";
import { ImArrowUpRight2 } from "react-icons/im";
import { FaPenFancy } from "react-icons/fa";

const DeployerView = () => {
  return (
    <main>
      <div className="flex gap-4 justify-start items-center">
        <img
          src="https://sothebys-com.brightspotcdn.com/dims4/default/6a8c506/2147483647/strip/true/crop/1000x1000+0+0/resize/684x684!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F8e%2F9c%2F972bfa1645c08ca0919ea68aabfe%2F4609.png"
          className={"w-24 h-24 rounded-full"}
          alt={"pudgy"}
        />
        <h3 className={"text-3xl text-[#2E2E2E] font-bold"}>0xc54...401a</h3>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <UserDeployments />
          <hr className="w-full h-0.5 bg-gray-50 rounded-full" />
          <div className="flex items-center justify-end">
            <DeploymentTabs />
          </div>
          <h3 className="text-[#222222] text-3xl font-semibold">Stats</h3>
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-sm text-[#7D7D7D]">Total Earned</p>
              <div className="flex items-center justify-center">
                <h3 className="text-[#222222] text-3xl font-semibold">$1.1B</h3>
                <img
                  src="/images/sald-token.svg"
                  className="w-14 h-14"
                  alt="sald token"
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-[#7D7D7D]">Ends In</p>
              <h3 className="text-[#222222] text-3xl font-semibold">
                22D 23H 22M
              </h3>
            </div>
          </div>
          <hr className="w-full h-0.5 bg-gray-50 rounded-full my-10" />
          <div className="flex items-center justify-between">
            <h3 className="text-[#222222] text-3xl font-semibold">
              Product Designer
            </h3>
            <Link href="/listing/1/edit">
              <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
                <span className="text-black flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
                  <FaPenFancy />
                  Edit
                </span>
              </button>
            </Link>
          </div>
          <p className="overflow-hidden overflow-ellipsis text-[#222222] mt-2">
            Ethereum is a smart contract platform that enables developers to
            build tokens and decentralized applications (dapps). ETH is the
            native currency for the Ethereum platform and also works as the
            transaction fees to miners on the Ethereum network. Ethereum is the
            pioneer for blockchain based smart contracts. Smart contract is
            essentially a computer code that runs exactly as programmed without
            any possibility of downtime, censorship, fraud or third-party
            interference. It can facilitate the exchange of money, content,
            property, shares, or anything of value. When running on the
            blockchain a smart contract becomes like a self-operating computer
            program that automatically executes when specific conditions are
            met. Ethereum allows programmers to run complete-turing smart
            contracts that is capable of any customizations. Rather than giving
            a set of limited operations, Ethereum allows developers to have
            complete control over customization of their smart contract, giving
            developers the power to build unique and innovative applications.
            Ethereum being the first blockchain based smart contract platform,
            they have gained much popularity, resulting in new competitors
            fighting for market share. The competitors includes: Ethereum
            Classic which is the oldchain of Ethereum, Qtum, EOS, Neo, Icon,
            Tron and Cardano. Ethereum wallets are fairly simple to set up with
            multiple popular choices such as myetherwallet, metamask, and
            Trezor. Read here for more guide on using ethereum wallet: How to
            Use an Ethereum Wallet
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
        <div>
          <ApplicantCard />
        </div>
      </div>
    </main>
  );
};

export default DeployerView;
