"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAddress } from "@thirdweb-dev/react";
import WorkerView from "@/components/ListingDetails/WorkerView";
import DeployerView from "@/components/ListingDetails/DeployerView";
import { fetchListing } from "@/utils/Listings";
import IListing from "@/interfaces/ListingResponse";

type Props = {
  params: { slug: string };
};

const JobDetails: React.FC<Props> = ({ params }) => {
  const [isWorker, setIsWorker] = useState(true);
  const [listingDetails, setListingDetails] = useState<IListing>({
    title: "",
    description: "",
    _id: "",
    category: "",
    __v: 0,
    from: "",
    to: "",
    jobId: 0,
    date: "",
    createdAt: "",
    reward: 0,
    transactionHash: "",
    updatedAt: "",
  });
  const router = useRouter();
  const address = useAddress();

  useEffect(() => {
    const fetchAllData = async () => {
      const data = await fetchListing(params.slug);
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        router.push("/");
      } else {
        setListingDetails(data as IListing);

        if ("from" in data && address === data.from) {
          // setIsWorker(false);
        } else {
          setIsWorker(true);
        }
      }
    };

    fetchAllData();
  }, [address]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-screen-xl rounded-xl px-6 py-12 w-full">
        {isWorker ? (
          <WorkerView listingDetails={listingDetails} />
        ) : (
          <DeployerView listingDetails={listingDetails} />
        )}
      </div>
    </main>
  );
};

export default JobDetails;
