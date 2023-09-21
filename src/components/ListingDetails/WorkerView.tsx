import React, { useState, useEffect } from "react";
import UserDeployments from "@/components/ListingDetails/UserDeployments";
import DeploymentTabs from "@/components/ListingDetails/DeploymentTabs";
import { ImArrowUpRight2 } from "react-icons/im";
import TransactionCard from "@/components/ListingDetails/TransactionCard";
import { IListing } from "@/interfaces/ListingResponse";
import { short } from "@/utils/Common";
import ErrorAlert from "../Alerts/ErrorAlert";
import { useAddress } from "@thirdweb-dev/react";
import { checkWorkerSelected } from "@/utils/Worker";
import AlertCard from "../Alerts/AlertCard";
import JobStatus from "@/enums/JobStatus";
import WorkerClaimCard from "./WorkerClaimCard";
import { IApplicant } from "@/interfaces/ApplicantResponse";

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
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [applicantDetails, setApplicantDetails] = useState<IApplicant>({
    _id: "",
    post: "",
    applicantAddress: "",
    transactionHash: "",
    fee: 0,
    applicantId: 0,
    selected: false,
    claimed: false,
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });
  const address = useAddress();

  const calculateTimeLeft = () => {
    const now = new Date();
    const sgt = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Singapore" })
    );
    const targetTime = new Date(listingDetails.date);

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

  useEffect(() => {
    const fetchAllData = async () => {
      if (address && listingDetails._id) {
        const { data, applicantDetails } = await checkWorkerSelected(
          listingDetails._id,
          address
        );

        setIsSelected(data);
        setApplicantDetails(applicantDetails);
      }
    };

    fetchAllData();
  }, [address, listingDetails._id]);

  return (
    <main>
      {listingDetails.jobStatus !== "ACTIVE" && !isSelected && (
        <ErrorAlert
          header="Listing no longer available!"
          text="Another worker who has applied for the job has been selected to conduct it."
        />
      )}
      {isSelected && (
        <div className="mb-4">
          <AlertCard
            header="Congratulations! You have been selected!"
            text="Please submit your work via the in-built chat"
          />
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <img
            src="https://sothebys-com.brightspotcdn.com/dims4/default/6a8c506/2147483647/strip/true/crop/1000x1000+0+0/resize/684x684!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F8e%2F9c%2F972bfa1645c08ca0919ea68aabfe%2F4609.png"
            className={"w-12 h-12 md:w-16 md:h-16 rounded-full"}
            alt={"pudgy"}
          />
          <div className="flex flex-col justify-between items-start">
            <h3
              className={
                "text-xl sm:text-2xl md:text-3xl text-[#2E2E2E] font-bold"
              }
            >
              {short(listingDetails.from)}
            </h3>
            <span className="text-gray-500 font-bold">TVL: 58%</span>
          </div>
        </div>
        <button className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-full p-1 hidden md:block">
          <span className="text-black flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
            Submit Dispute
          </span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2">
          <UserDeployments />
          <hr className="w-full h-0.5 bg-gray-50 rounded-full" />
          <div className="flex items-center justify-center md:justify-end">
            <DeploymentTabs />
          </div>
          <h3 className="text-[#222222] text-2xl md:text-3xl font-semibold">
            Stats
          </h3>
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
            <div>
              <p className="text-sm text-[#7D7D7D]">Total Deployment</p>
              <div className="flex items-center md:justify-center">
                <h3 className="text-[#222222] text-2xl md:text-3xl font-semibold">
                  $1.1B
                </h3>
                <img
                  src="/images/sald-token.svg"
                  className="w-10 h-10 md:w-14 md:h-14"
                  alt="sald token"
                />
              </div>
            </div>
            {timeLeft.seconds ? (
              <div>
                <p className="text-sm text-[#7D7D7D]">Ends In</p>
                <h3 className="text-[#222222] text-2xl md:text-3xl font-semibold">
                  {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M{" "}
                  {timeLeft.seconds}S
                </h3>
              </div>
            ) : (
              " "
            )}
          </div>
          <hr className="w-full h-0.5 bg-gray-50 rounded-full my-10 md:hidden" />
          <div className='md:hidden'>
          {listingDetails.jobStatus === JobStatus.COMPLETED ? (
            <WorkerClaimCard
              listingId={listingDetails._id}
              applicantId={applicantDetails.applicantId}
            />
          ) : (
            <TransactionCard
              jobId={listingDetails.jobId}
              to={listingDetails.from}
              date={new Date(listingDetails.date)}
              _id={listingDetails._id}
              status={listingDetails.jobStatus !== "ACTIVE"}
            />
          )}
        </div>
          <hr className="w-full h-0.5 bg-gray-50 rounded-full my-10" />
          <h3 className="text-[#222222] text-xl sm:text-2xl md:text-3xl font-semibold">
            {listingDetails.title}
          </h3>
          <p
            className="overflow-hidden overflow-ellipsis text-[#222222] mt-2 text-sm sm:text-base md:text-lg"
            dangerouslySetInnerHTML={{ __html: listingDetails.description }}
          />
          <h6 className="text-sm text-[#7D7D7D] mt-8">Files</h6>
          <div className="flex flex-col md:flex-row md:items-center justify-start gap-4 mt-2">
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
        <button className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-full p-1 md:hidden w-full mt-8">
          <span className="text-black flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
            Submit Dispute
          </span>
        </button>
        <div className='hidden md:block'>
          {listingDetails.jobStatus === JobStatus.COMPLETED ? (
            <WorkerClaimCard
              listingId={listingDetails._id}
              applicantId={applicantDetails.applicantId}
            />
          ) : (
            <TransactionCard
              jobId={listingDetails.jobId}
              to={listingDetails.from}
              date={new Date(listingDetails.date)}
              _id={listingDetails._id}
              status={listingDetails.jobStatus !== "ACTIVE"}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default WorkerView;
