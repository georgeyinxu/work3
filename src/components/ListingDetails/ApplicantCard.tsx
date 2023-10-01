import React, { useEffect, useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { IoCopyOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { fetchApplicants } from "@/utils/Applicant";
import { IApplicant } from "@/interfaces/ApplicantResponse";
import { short } from "@/utils/Common";
import { DateTime } from "luxon";
import { useAddress } from "@thirdweb-dev/react";
import { completeJob, pickApplicant } from "@/utils/Deployer";
import AlertCard from "@/components/Alerts/AlertCard";
import JobStatus from "@/enums/JobStatus";
import WorkerProfile from "../Dialog/WorkerProfile";

type Props = {
  listingId: string;
  jobId: number;
  listingStatus: JobStatus;
};

const ApplicantCard: React.FC<Props> = ({
  listingId,
  jobId,
  listingStatus,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completeLoading, setCompleteLoading] = useState<boolean>(false);
  const [completeJobDone, setCompleteJobDone] = useState<boolean>(false);
  const [pickedWorker, setPickedWorker] = useState<boolean>(false);
  const [confirmedWorker, setConfirmedWorker] = useState<IApplicant>({
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
  const [applicants, setApplicants] = useState<IApplicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<number>(-1);
  const [isUserProfile, setIsUserProfile] = useState(false);
  const [workerAddress, setWorkerAddress] = useState("");
  const address = useAddress();

  function openWorkerProfile(address: string) {
    setIsUserProfile(true);
    setWorkerAddress(address);
  }

  useEffect(() => {
    const fetchAllData = async () => {
      const res = await fetchApplicants(listingId);
      setApplicants(res);
      if (res.length > 0) {
        setSelectedApplicant(res[0].applicantId);

        const filteredApplicants = res.filter(
          (applicant) => applicant.selected
        );

        console.log("Filtered applicants: ", filteredApplicants);
        if (filteredApplicants.length === 1) {
          setPickedWorker(true);
          setConfirmedWorker(filteredApplicants[0]);
        }
      }
    };

    setCompleteJobDone(listingStatus === "COMPLETED");
    fetchAllData();
  }, []);
  return (
    <div className="bg-white rounded-2xl transaction-card md:ml-2">
      <div className="max-h-[40vh] overflow-y-scroll">
        {applicants &&
          applicants.map((applicant) => (
            <div
              className={`bg-gray-100 rounded-2xl flex items-center justify-between gap-2 text-gray-500 text-xl p-4 mb-2 hover:cursor-pointer ${
                selectedApplicant === applicant.applicantId &&
                "border-2 border-[#FF66FF]"
              }`}
              key={applicant._id}
              onClick={() => setSelectedApplicant(applicant.applicantId)}
            >
              <div className="flex items-center justify-center">
                <button
                  className="mr-2"
                  onClick={() => {
                    navigator.clipboard.writeText(applicant.applicantAddress);
                  }}
                >
                  <IoCopyOutline />
                </button>
                <div>
                  <button className="text-[#FF66FF]" onClick={() => openWorkerProfile(applicant.applicantAddress)}>
                    {short(applicant.applicantAddress)}
                  </button>
                  <p className="text-[#8E8E8E] text-xs">
                    Applied on&nbsp;
                    {DateTime.fromISO(applicant.createdAt).toFormat(
                      "yyyy LLL dd"
                    )}
                  </p>
                </div>
              </div>
              <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
                <span className="text-black flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
                  <IoChatbubbleEllipsesOutline />
                </span>
              </button>
            </div>
          ))}
      </div>
      {pickedWorker ? (
        <button
          style={{
            background:
              "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)",
            borderRadius: 16,
            paddingTop: 20,
            paddingBottom: 20,
            fontSize: 24,
            fontWeight: 600,
            color: "white",
            width: "100%",
          }}
          onClick={() =>
            completeJob(
              jobId,
              confirmedWorker.applicantId,
              listingId,
              setCompleteLoading,
              setCompleteJobDone
            )
          }
          disabled={completeLoading || completeJobDone}
          className="disabled:opacity-60"
        >
          {completeLoading ? "Loading..." : "Completed Job"}
        </button>
      ) : (
        <div className="w-full">
          {address ? (
            <button
              style={{
                background:
                  "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)",
                borderRadius: 16,
                paddingTop: 20,
                paddingBottom: 20,
                fontSize: 24,
                fontWeight: 600,
                color: "white",
                marginTop: 8,
                width: "100%",
              }}
              className={`${
                applicants.length === 0 || isLoading || pickedWorker
                  ? "opacity-60"
                  : ""
              }`}
              disabled={applicants.length === 0 || isLoading}
              onClick={() =>
                pickApplicant(
                  selectedApplicant,
                  listingId,
                  setIsLoading,
                  setPickedWorker
                )
              }
            >
              {isLoading && "Loading..."}
              {applicants.length === 0 && "0 Applicants"}
              {applicants.length !== 0 && !isLoading && "Confirm Wallet"}
            </button>
          ) : (
            <ConnectWallet
              theme="light"
              style={{
                background:
                  "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)",
                borderRadius: 16,
                paddingTop: 20,
                paddingBottom: 20,
                fontSize: 24,
                marginTop: 8,
                width: "100%",
              }}
            />
          )}
        </div>
      )}
      {pickedWorker && !completeJobDone && (
        <div className="mt-2">
          <AlertCard
            header="Successfully Selected Worker!"
            text="Feel free to communicate with the worker using our built in chat!"
          />
        </div>
      )}
      {completeJobDone && (
        <div className="mt-2">
          <AlertCard
            header="Successfully Completed Job!"
            text="Thank you for trusting us with your project!"
          />
        </div>
      )}
      <WorkerProfile isUserProfile={isUserProfile} setIsUserProfile={setIsUserProfile} workerAddress={workerAddress} />
    </div>
  );
};

export default ApplicantCard;
