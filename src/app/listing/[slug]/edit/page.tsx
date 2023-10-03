"use client";

import SubmissionBody from "@/components/Create/SubmissionBody";
import React, { useEffect, useState } from "react";
import ListingCard from "@/components/Edit/ListingCard";
import { fetchListing } from "@/utils/Listings";
import { IListing } from "@/interfaces/ListingResponse";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/navigation";

type Props = {
  params: { slug: string };
};

const Edit: React.FC<Props> = ({ params }) => {
  const [jobId, setJobId] = useState(-1);
  const [form, setForm] = useState<{
    title: string;
    reward: string;
    date: Date;
    category: string;
    location: string;
    type: string;
    description: string;
    file?: string | undefined;
    listingId?: string;
  }>({
    title: "",
    reward: "0",
    date: new Date(),
    category: "",
    location: "",
    type: "",
    description: "",
    file: undefined,
    listingId: "",
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const address = useAddress();
  const router = useRouter();

  useEffect(() => {
    const fetchAllData = async () => {
      const data = (await fetchListing(params.slug)) as IListing;
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        router.push("/");
      } else {
        // Setting the previous value
        setForm({
          title: data.title,
          reward: data.reward.toString(),
          date: new Date(data.date),
          category: data.category,
          description: data.description,
          location: data.location,
          type: data.jobType,
          file: data.file,
          listingId: data._id,
        });

        setJobId(data.jobId);

        setLastUpdated(new Date(data.updatedAt));
      }
    };

    fetchAllData();
  }, []);

  return (
    <main className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
      <div className="max-w-screen-xl rounded-xl px-6 py-12 w-full">
        <h3 className="text-2xl sm:text-3xl md:text-4xl uppercase font-semibold text-[#202020] text-center md:text-left">
          <span className="text-[#FF66FF]">LISTING:</span> EDIT
        </h3>
        <h5 className="text-md sm:text-lg md:text-xl text-[#202020] text-center md:text-left">
          Complete your submission, including relevant files, and then stake to
          submit
        </h5>
        <ListingCard
          title={form.title}
          reward={form.reward}
          deadline={new Date(form.date)}
          lastUpdated={lastUpdated}
          description={form.description}
        />
        <div className="grid grid-cols-1 gap-8">
          <SubmissionBody form={form} jobId={jobId} setForm={setForm} edit={true} />
        </div>
      </div>
    </main>
  );
};

export default Edit;
