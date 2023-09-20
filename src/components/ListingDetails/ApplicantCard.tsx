import React, { useEffect, useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { IoCopyOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { fetchApplicants } from "@/utils/Applicant";
import IApplicant from "@/interfaces/ApplicantResponse";
import { short } from "@/utils/Common";
import { DateTime } from "luxon";
import { useAddress } from "@thirdweb-dev/react";
import { applyListing } from "@/utils/Worker";
import { pickApplicant } from "@/utils/Deployer";

type Props = {
  listingId: string;
};

const ApplicantCard: React.FC<Props> = ({ listingId }) => {
  const [applicants, setApplicants] = useState<IApplicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<number>(-1);
  const address = useAddress();

  useEffect(() => {
    const fetchAllData = async () => {
      const res = await fetchApplicants(listingId);
      setApplicants(res);
      if (res.length > 0) {
        setSelectedApplicant(res[0].applicantId);
      }
    };

    fetchAllData();
  }, []);
  return (
    <div className="bg-white rounded-2xl transaction-card ml-2">
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
                  <h4 className="text-[#2e2e2e] ">
                    {short(applicant.applicantAddress)}
                  </h4>
                  <p className="text-[#8E8E8E] text-xs">
                    Applied on&nbsp;
                    {DateTime.fromISO(applicant.createdAt).toFormat(
                      "yyyy LLL dd",
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
            onClick={() => pickApplicant(selectedApplicant, listingId)}
          >
            Confirm Wallet
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
    </div>
  );
};

export default ApplicantCard;
