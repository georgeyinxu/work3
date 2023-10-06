"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import dynamic from "next/dynamic";
import Datepicker from "tailwind-datepicker-react";
import "react-quill/dist/quill.snow.css";
import { fetchCategories } from "@/utils/Categories";
import { ICategory } from "@/interfaces/CategoryResponse";
import { IJobType } from "@/interfaces/JobTypeResponse";
import { postListing } from "@/utils/Deployer";
import { updateListing } from "@/utils/Listings";
import { FaPaperclip, FaTrashCan } from "react-icons/fa6";
import Link from "next/link";
import { ImArrowUpRight2 } from "react-icons/im";
import { formatFileName } from "@/utils/Common";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const formattedDate = yesterday.toLocaleDateString("en-SG", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

type Props = {
  form: {
    title: string;
    reward: string;
    date: Date;
    category: string;
    description: string;
    file?: string;
    listingId?: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      title: string;
      reward: string;
      date: Date;
      category: string;
      description: string;
      file?: string;
      listingId?: string;
    }>
  >;
  edit: boolean;
  jobId?: number;
};

const SubmissionBody: React.FC<Props> = ({ form, setForm, edit, jobId }) => {
  const [show, setShow] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (selectedDate: Date) => {
    setForm({ ...form, date: selectedDate });
  };

  const handleDescriptionChange = (html: string) => {
    setForm({ ...form, description: html });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      // Check if the file size is greater than 100MB (in bytes)
      const maxSize = 100 * 1024 * 1024; // 100MB in bytes

      if (selectedFile.size <= maxSize) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setFileSize(`${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`);
      } else {
        // File size exceeds the limit, show an error message or handle it as needed
        alert(
          "File size exceeds the limit of 100MB. Please choose a smaller file."
        );
        // Clear the file input
        e.target.value = "";
      }
    } else {
      setFile(undefined);
      setFileName("");
      setFileSize("");
    }
  };

  const handleFileDelete = () => {
    setFile(undefined);
    setFileName("");
    setFileSize("");
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (edit) {
      updateListing(
        e,
        form.listingId!,
        file,
        form.title,
        form.description,
        form.reward,
        form.category,
        form.date,
        jobId!,
        setIsLoading
      );
    } else {
      postListing(
        e,
        file,
        form.title,
        form.description,
        form.reward,
        form.category,
        form.date,
        setIsLoading
      );
    }
  };

  const options = {
    title: "Please choose a date",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date(formattedDate),
    theme: {
      background: "bg-white dark:bg-white",
      todayBtn: "",
      clearBtn: "dark:bg-[#FF66FF] border-0",
      icons: "dark:bg-[#FF66FF]",
      text: "dark:text-[#202020]",
      disabledText: "bg-gray-200",
      input:
        "bg-gray-50 dark:bg-gray-50 text-[#202020] dark:text-[#202020] dark:border-gray-300",
      inputIcon: "",
      selected: "dark:bg-[#FF66FF] dark:text-white",
    },
    icons: {
      prev: () => (
        <span>
          <FaArrowLeft />
        </span>
      ),
      next: () => (
        <span>
          <FaArrowRight />
        </span>
      ),
    },
    datepickerClassNames: "top-12",
    defaultDate: form.date,
    language: "en",
  };

  useEffect(() => {
    const promises = [fetchCategories()];

    Promise.all(promises)
      .then((responses) => {
        // Setting categories
        let categories = responses[0];
        categories = categories.filter(
          (category: ICategory) => category.title !== "View All"
        );
        setCategories(categories);

        // Setting the states for form
        if (categories.length > 0) {
          setForm((prev) => ({ ...prev, category: categories[0]._id }));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="bg-white p-8 rounded-xl">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl md:text-2xl text-[#202020] font-semibold">
            Submission Body
          </h3>
        </div>
        <hr className="w-full h-0.5 bg-gradient-to-r from-[#ff00c7] to-[#ff9bfb] rounded-full my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder=""
              name="title"
              onChange={handleChange}
              value={form.title}
              required
            />
          </div>
          <div>
            <label
              htmlFor="Reward"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Reward ($SALD)
            </label>
            <input
              type="number"
              id="reward"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="0"
              name="reward"
              onChange={handleChange}
              value={form.reward}
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select Category
            </label>
            <select
              id="category"
              name="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleChange}
              value={form.category}
            >
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Deadline
            </label>
            <Datepicker
              options={options}
              onChange={handleDateChange}
              show={show}
              setShow={handleClose}
            />
          </div>
        </div>
        <label className="block mb-2 text-sm font-medium text-gray-900 mt-4">
          Description
        </label>
        <ReactQuill
          value={form.description}
          onChange={handleDescriptionChange}
          className="text-[#202020]"
        />

        <label className="relative inline-block">
          <input
            ref={fileInputRef}
            type="file"
            name="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
          <button
            className="px-4 py-2 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r text-xs sm:text-base mt-4"
            onClick={handleButtonClick}
          >
            <span className="block font-semibold hover:bg-transparent hover:text-white transition">
              Attach file
            </span>
          </button>
        </label>
        <div>
          <span className="text-sm text-gray-500 mt-2">
            Max file size: 100 MB (1 File Only)
          </span>
        </div>
        {fileName && (
          <div className="text-sm text-[#202020] mt-2 flex items-center gap-3">
            <FaPaperclip />
            <p>
              {fileName} ({fileSize})
            </p>
            <button
              className="rounded-full border-2 border-gray-200 text-[#FF66FF] p-2 hover:bg-[#FF66FF] hover:text-white hover:border-white transition"
              onClick={handleFileDelete}
            >
              <FaTrashCan />
            </button>
          </div>
        )}
        {form.file && (
          <div>
            <h6 className="text-md text-gray-800 font-semibold mt-2">
              Previous attached file
            </h6>
            <Link href={`${form.file}`}>
              <button className="text-sm text-[#FF66FF] flex items-center gap-2">
                <span className="truncate">{formatFileName(form.file)}</span>
                <ImArrowUpRight2 />
              </button>
            </Link>
          </div>
        )}
        <hr className="w-full h-0.5 bg-gradient-to-r from-[#ff00c7] to-[#ff9bfb] rounded-full my-4" />
        <div className="flex items-center justify-end my-4">
          {edit ? (
            <button
              className={`p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r ${
                isLoading ? "bg-opacity-60" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              <span className="block text-white px-4 py-2 font-semibold rounded-full bg-transparent hover:bg-white hover:text-black transition">
                {isLoading ? "Loading..." : "Confirm Edit"}
              </span>
            </button>
          ) : (
            <button
              className={`p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r ${
                isLoading ? "bg-opacity-60" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              <span className="block text-white px-4 py-2 font-semibold rounded-full bg-transparent hover:bg-white hover:text-black transition">
                {isLoading ? "Loading..." : "Confirm Submission"}
              </span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SubmissionBody;
