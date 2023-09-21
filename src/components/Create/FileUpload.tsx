"use client";

import React, { useState, useRef } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { FileInfo } from "@/interfaces/FileInfo";

type Props = {
  selectedFiles: File[];
  fileInfo: FileInfo[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setFileInfo: React.Dispatch<React.SetStateAction<FileInfo[]>>;
};

const FileUpload: React.FC<Props> = ({
  selectedFiles,
  fileInfo,
  setSelectedFiles,
  setFileInfo,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentTime = new Date().toLocaleString();

    const newFileInfo = files.map((file) => ({
      name: file.name,
      time: currentTime,
      size: formatBytes(file.size),
    }));

    setSelectedFiles(files);
    setFileInfo([...fileInfo, ...newFileInfo]);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white p-8 rounded-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-xl md:text-2xl text-[#202020] font-semibold">File Uploads</h3>
        <button
          onClick={openFilePicker}
          className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r"
        >
          <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
            Upload Files
          </span>
        </button>
      </div>
      <hr className="w-full h-0.5 bg-gradient-to-r from-[#ff00c7] to-[#ff9bfb] rounded-full my-4" />
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div>
        {fileInfo.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-4 px-2 rounded-lg hover:cursor-pointer hover:bg-gray-100"
          >
            <div>
              <h5 className="font-bold text-[#222222]">
                {file.name} ({file.size})
              </h5>
              <p className="text-[#8E8E8E] text-sm">{file.time}</p>
            </div>
            <div className="hover:text-red-500">
              <FaTrashCan />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
