"use client";

import React from "react";
import FileUpload from "@/components/Create/FileUpload";
import SubmissionBody from "@/components/Create/SubmissionBody";
import { postListing } from "@/utils/Deployer";

const Create = () => {
  return (
    <main className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
      <div className="max-w-screen-xl rounded-xl px-6 py-32 w-full">
        <h3 className="text-4xl uppercase font-semibold">
          <span className="text-[#FF66FF]">SUBMISSION:</span> DRAFT
        </h3>
        <h5 className="text-xl">
          Complete your submission, including relevant files, and then stake to
          submit
        </h5>
        <div className="grid grid-cols-2 gap-8 mt-10">
          <FileUpload />
          <SubmissionBody />
        </div>
        <div className="flex items-center justify-end my-4">
          <button
            className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r"
            onClick={() =>
              postListing("Hello World", "Hi I am good!", "100", 1000000)
            }
          >
            <span className="block text-white px-4 py-2 font-semibold rounded-full bg-transparent hover:bg-white hover:text-black transition">
              Confirm Submission
            </span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Create;
