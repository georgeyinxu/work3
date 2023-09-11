import FileUpload from "@/components/Create/FileUpload";
import SubmissionBody from "@/components/Create/SubmissionBody";
import React from "react";
import ListingCard from "@/components/Edit/ListingCard";

const Edit = () => {
  return (
    <main className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
      <div className="max-w-screen-xl rounded-xl px-6 py-32 w-full">
        <h3 className="text-4xl uppercase font-semibold">
          <span className="text-[#FF66FF]">SUBMISSION:</span> EDIT
        </h3>
        <h5 className="text-xl">
          Complete your submission, including relevant files, and then stake to
          submit
        </h5>
        <ListingCard />
        <div className="grid grid-cols-2 gap-8">
          <FileUpload />
          <SubmissionBody />
        </div>
        <div className="flex items-center justify-end my-4">
          <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
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
