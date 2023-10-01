import React, { useEffect, useState } from "react";
import Link from "next/link";
import ApplicantCard from "@/components/ListingDetails/ApplicantCard";
import { ImArrowUpRight2 } from "react-icons/im";
import { FaPenFancy } from "react-icons/fa";
import { IListing } from "@/interfaces/ListingResponse";
import { formatFileName, short } from "@/utils/Common";
import { FaBriefcase, FaLocationDot, FaMoneyBill } from "react-icons/fa6";
import TelegramDialog from "../Dialog/TelegramDialog";
import WorkerProfile from "../Dialog/WorkerProfile";

type Props = {
  listingDetails: IListing;
};

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  days: number;
}

const DeployerView: React.FC<Props> = ({ listingDetails }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const sgt = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Singapore" })
    );
    const targetTime = new Date(listingDetails.date);

    if (sgt.getTime() > targetTime.getTime()) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const timeDifference = targetTime.getTime() - sgt.getTime();
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 details-card bg-white px-4 py-8">
          <div className="block md:hidden mb-6">
            <ApplicantCard
              listingId={listingDetails._id}
              jobId={listingDetails.jobId}
              listingStatus={listingDetails.jobStatus}
            />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-[#222222] text-xl sm:text-2xl md:text-3xl font-semibold">
              {listingDetails.title}
            </h3>
            <Link
              href={`/listing/${listingDetails._id}/edit`}
              className="hidden md:block"
            >
              <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
                <span className="text-black flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
                  <FaPenFancy />
                  Edit
                </span>
              </button>
            </Link>
          </div>
          <button className="text-[#FF66FF] underline mt-2" onClick={openModal}>
            {short(listingDetails.from)}
          </button>
          <hr className="w-full h-0.5 bg-gray-50 rounded-full my-4" />
          <h6 className="text-[#202020] font-bold text-lg">Job Details</h6>
          <div className="flex flex-col gap-8 mt-4">
            <div className="flex items-start justify-left text-gray-600 text-2xl">
              <FaMoneyBill />
              <div className="flex flex-col justify-left ml-4">
                <h5 className="text-[#202020] text-base font-semibold mb-1">
                  Pay
                </h5>
                <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-md text-center">
                  {listingDetails.reward} $SALD
                </span>
              </div>
            </div>
            <div className="flex items-start justify-left text-gray-600 text-2xl">
              <FaBriefcase />
              <div className="flex flex-col justify-left ml-4">
                <h5 className="text-[#202020] text-base font-semibold mb-1">
                  Job type
                </h5>
                <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-md text-center">
                  {listingDetails.jobType}
                </span>
              </div>
            </div>
            <div className="flex items-start justify-left text-gray-600 text-2xl">
              <FaLocationDot />
              <div className="flex flex-col justify-left ml-4">
                <h5 className="text-[#202020] text-base font-semibold mb-1">
                  Location
                </h5>
                <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-md text-center">
                  {listingDetails.location}
                </span>
              </div>
            </div>
          </div>
          <hr className="w-full h-0.5 bg-gray-50 rounded-full my-4" />
          <h6 className="text-[#202020] font-bold text-lg">Job Description</h6>
          <p
            className="overflow-hidden overflow-ellipsis text-[#222222] mt-2 text-sm"
            dangerouslySetInnerHTML={{ __html: listingDetails.description }}
          />
          {listingDetails.file && (
            <div>
              <h6 className="text-sm text-[#7D7D7D] mt-4">Files</h6>
              <div className="flex flex-col md:flex-row md:items-center justify-start gap-4 mt-2">
                <Link href={`${listingDetails.file}`}>
                  <button className="text-sm text-[#FF66FF] flex items-center gap-2">
                    <span className="truncate">
                      {formatFileName(listingDetails.file)}
                    </span>
                    <ImArrowUpRight2 />
                  </button>
                </Link>
              </div>
            </div>
          )}
          <Link
            href={`/listing/${listingDetails._id}/edit`}
            className="md:hidden"
          >
            <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r w-full mt-8">
              <span className="text-black flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
                <FaPenFancy />
                Edit
              </span>
            </button>
          </Link>
        </div>
        <div className="hidden md:block">
          <ApplicantCard
            listingId={listingDetails._id}
            jobId={listingDetails.jobId}
            listingStatus={listingDetails.jobStatus}
          />
        </div>
      </div>

      <TelegramDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  );
};

export default DeployerView;
