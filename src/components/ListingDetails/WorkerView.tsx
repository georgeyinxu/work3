import React from "react";
import UserDeployments from "@/components/ListingDetails/UserDeployments";
import DeploymentTabs from "@/components/ListingDetails/DeploymentTabs";
import { ImArrowUpRight2 } from "react-icons/im";
import TransactionCard from "@/components/ListingDetails/TransactionCard";
import IListing from "@/interfaces/listingResponse";

type Props = {
  listingDetails: IListing;
};

const WorkerView: React.FC<Props> = ({ listingDetails }) => {
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
              <p className="text-sm text-[#7D7D7D]">Total Deployment</p>
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
          <h3 className="text-[#222222] text-3xl font-semibold">
            {listingDetails.title}
          </h3>
          <p
            className="overflow-hidden overflow-ellipsis text-[#222222] mt-2"
            dangerouslySetInnerHTML={{ __html: listingDetails.description }}
          />
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
          <TransactionCard />
        </div>
      </div>
    </main>
  );
};

export default WorkerView;
