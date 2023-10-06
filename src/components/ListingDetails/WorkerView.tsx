import React, { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { checkWorkerSelected } from "@/utils/Worker";
import TransactionCard from "@/components/ListingDetails/TransactionCard";
import WorkerClaimCard from "./WorkerClaimCard";
import AlertCard from "@/components/Alerts/AlertCard";
import ErrorAlert from "@/components/Alerts/ErrorAlert";
import TelegramDialog from "@/components/Dialog/TelegramDialog";

import JobStatus from "@/enums/JobStatus";
import { IApplicant } from "@/interfaces/ApplicantResponse";
import { IListing } from "@/interfaces/ListingResponse";
import { IWallet } from "@/interfaces/WalletResponse";

import { ImArrowUpRight2 } from "react-icons/im";
import { FaMoneyBill, FaClock } from "react-icons/fa6";
import { formatFileName, short } from "@/utils/Common";
import Link from "next/link";
import UserDialog from "../Dialog/DeployerProfile";
import { DateTime } from "luxon";

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
  let [isOpen, setIsOpen] = useState(false);
  const [userDialog, setUserDialog] = useState(false);
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

  function openModal() {
    // setIsOpen(true);
    setUserDialog(true);
  }

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
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 details-card bg-white px-4 py-8">
          <div className="md:hidden">
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
          <h3 className="text-[#222222] text-xl sm:text-2xl md:text-3xl font-semibold mt-6">
            {listingDetails.title}
          </h3>
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
              <FaClock />
              <div className="flex flex-col justify-left ml-4">
                <h5 className="text-[#202020] text-base font-semibold mb-1">
                  Deadline
                </h5>
                <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-md text-center">
                  {DateTime.fromISO(listingDetails.date).toLocaleString(
                    DateTime.DATETIME_MED
                  )}
                </span>
              </div>
            </div>
          </div>
          <hr className="w-full h-0.5 bg-gray-50 rounded-full my-4" />
          <h6 className="text-[#202020] font-bold text-lg">Job Description</h6>
          <p
            className="overflow-hidden overflow-ellipsis text-[#222222] mt-4 text-sm"
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
        </div>
        <div className="hidden md:block">
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

      <TelegramDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <UserDialog
        isOpen={userDialog}
        setIsOpen={setUserDialog}
        listingDetails={listingDetails}
        setIsOpenTele={setIsOpen}
      />
    </main>
  );
};

export default WorkerView;
