import { checkIfClaimed } from "@/utils/Applicant";
import { claimReward } from "@/utils/Worker";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";

type Props = {
  applicantId: number;
  listingId: string;
};

const WorkerClaimCard: React.FC<Props> = ({ applicantId, listingId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const address = useAddress();

  useEffect(() => {
    const fetchAllData = async () => {
      const claimedBefore = await checkIfClaimed(applicantId);
      setClaimed(claimedBefore);
    };

    if (applicantId) {
      fetchAllData();
    }
  }, [applicantId]);
  return (
    <div className="transaction-card bg-white rounded-2xl ml-2">
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
            width: "100%",
          }}
          className="disabled:opacity-60"
          disabled={claimed || isLoading}
          onClick={() =>
            claimReward(applicantId, listingId, setIsLoading, setClaimed)
          }
        >
          {isLoading && "Loading..."}
          {claimed && "Claimed"}
          {!isLoading && !claimed && "Claim Reward"}
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
  );
};

export default WorkerClaimCard;
