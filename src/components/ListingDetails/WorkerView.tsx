import React, { useState, useEffect } from "react";
import UserDeployments from "@/components/ListingDetails/UserDeployments";
import DeploymentTabs from "@/components/ListingDetails/DeploymentTabs";
import { ImArrowUpRight2 } from "react-icons/im";
import TransactionCard from "@/components/ListingDetails/TransactionCard";
import IListing from "@/interfaces/listingResponse";
import { short } from "@/utils/Common";

type Props = {
  listingDetails: IListing;
};

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  days: number;
}

const WorkerView: React.FC<Props> = ({ listingDetails }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const sgt = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Singapore" }),
    );
    const targetTime = new Date(listingDetails.date);

    // Set the target to 6 PM SGT on 6th September
    targetTime.setMonth(8); // September (JavaScript months are 0-based)
    targetTime.setDate(6);
    targetTime.setHours(18, 0, 0, 0); // 6 PM

    // If it's already past the target time, set the target to 6 PM SGT on 7th September
    if (sgt.getTime() > targetTime.getTime()) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeDifference = targetTime.getTime() - sgt.getTime();
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <div className="flex gap-4 justify-start items-center">
        <img
          src="https://sothebys-com.brightspotcdn.com/dims4/default/6a8c506/2147483647/strip/true/crop/1000x1000+0+0/resize/684x684!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F8e%2F9c%2F972bfa1645c08ca0919ea68aabfe%2F4609.png"
          className={"w-24 h-24 rounded-full"}
          alt={"pudgy"}
        />
        <h3 className={"text-3xl text-[#2E2E2E] font-bold"}>
          {short(listingDetails.from)}
        </h3>
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
                {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M{" "}
                {timeLeft.seconds}S
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
          <TransactionCard
            jobId={listingDetails.jobId}
            to={listingDetails.from}
            date={new Date(listingDetails.date)}
            _id={listingDetails._id}
          />
        </div>
      </div>
    </main>
  );
};

export default WorkerView;
