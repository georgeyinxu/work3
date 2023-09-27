"use client";

import React, { useState } from "react";
import SubmissionBody from "@/components/Create/SubmissionBody";
import { postListing } from "@/utils/Deployer";

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    reward: "0",
    date: new Date(),
    category: "",
    location: "",
    type: "",
    description: "",
  });

  return (
    <main className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
      <div className="max-w-screen-xl rounded-xl px-6 py-12 w-full">
        <h3 className="text-2xl sm:text-3xl md:text-4xl uppercase font-semibold text-[#202020] text-center md:text-left">
          <span className="text-[#FF66FF]">NEW LISTING:</span> DRAFT
        </h3>
        <h5 className="text-md sm:text-lg md:text-xl text-[#202020] text-center md:text-left">
          Complete your submission, including relevant files, and then stake to
          submit
        </h5>
        <div className="grid grid-cols-1 gap-8 mt-10">
          <SubmissionBody form={form} setForm={setForm} />
        </div>
        <div className="flex items-center justify-end my-4">
          <button
            className={`p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r ${
              isLoading ? "bg-opacity-60" : ""
            }`}
            onClick={() =>
              postListing(
                form.title,
                form.description,
                form.reward,
                form.category,
                form.date,
                setIsLoading
              )
            }
            disabled={isLoading}
          >
            <span className="block text-white px-4 py-2 font-semibold rounded-full bg-transparent hover:bg-white hover:text-black transition">
              {isLoading ? "Loading..." : "Confirm Submission"}
            </span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Create;
