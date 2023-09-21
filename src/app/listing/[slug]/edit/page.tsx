"use client";

import FileUpload from "@/components/Create/FileUpload";
import SubmissionBody from "@/components/Create/SubmissionBody";
import React, { useEffect, useState } from "react";
import ListingCard from "@/components/Edit/ListingCard";
import { fetchListing, updateListing } from "@/utils/Listings";
import { IListing } from "@/interfaces/listingResponse";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/navigation";
import listing from "@/models/listing";
import { FileInfo } from "@/interfaces/fileInfo";

type Props = {
  params: { slug: string };
};

const Edit: React.FC<Props> = ({ params }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileInfo, setFileInfo] = useState<FileInfo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [reward, setReward] = useState<string>("0");
  const [date, setDate] = useState<Date>(new Date());
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const address = useAddress();
  const router = useRouter();

  useEffect(() => {
    const fetchAllData = async () => {
      const data = (await fetchListing(params.slug)) as IListing;
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        router.push("/");
      } else {
        setTitle(data.title);
        setReward(data.reward.toString());
        setDate(new Date(data.date));
        setCategory(data.category);
        setDescription(data.description);
        setLastUpdated(new Date(data.updatedAt));

        // TODO: Handle Files Later
      }
    };

    fetchAllData();
  }, []); // Dependency array

  return (
    <main className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
      <div className="max-w-screen-xl rounded-xl px-6 py-32 w-full">
        <h3 className="text-4xl uppercase font-semibold">
          <span className="text-[#FF66FF]">LISTING:</span> EDIT
        </h3>
        <h5 className="text-xl">
          Complete your submission, including relevant files, and then stake to
          submit
        </h5>
        <ListingCard
          title={title}
          reward={reward}
          deadline={date}
          lastUpdated={lastUpdated}
          description={description}
        />
        <div className="grid grid-cols-2 gap-8">
          <FileUpload
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            fileInfo={fileInfo}
            setFileInfo={setFileInfo}
          />
          <SubmissionBody
            title={title}
            reward={reward}
            date={date}
            category={category}
            description={description}
            setTitle={setTitle}
            setReward={setReward}
            setCategory={setCategory}
            setDescription={setDescription}
            setDate={setDate}
          />
        </div>
        <div className="flex items-center justify-end my-4">
          <button
            className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r"
            onClick={() =>
              updateListing(
                title,
                description,
                reward,
                date,
                category,
                params.slug
              )
            }
          >
            <span className="block text-white px-4 py-2 font-semibold rounded-full bg-transparent hover:bg-white hover:text-black transition">
              Confirm Edit
            </span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Edit;
