"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";

const SubmissionBody = () => {
  const [editorHtml, setEditorHtml] = useState("");

  function handleChange(html: string) {
    setEditorHtml(html);
  }
  return (
    <div className="bg-white p-8 rounded-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl text-black">Submission Body</h3>
        <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
          <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
            Clear Submission
          </span>
        </button>
      </div>
      <hr className="w-full h-0.5 bg-gradient-to-r from-[#ff00c7] to-[#ff9bfb] rounded-full my-4" />
      <ReactQuill value={editorHtml} onChange={handleChange} />
    </div>
  );
};

export default SubmissionBody;
