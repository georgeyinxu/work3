"use client";

import React, { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import dynamic from "next/dynamic";
import Datepicker from "tailwind-datepicker-react";
import "react-quill/dist/quill.snow.css";
import { fetchCategories } from "@/utils/Categories";
import ICategory from "@/interfaces/categoryResponse";

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
  title: string;
  description: string;
  reward: string;
  date: Date;
  category: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setReward: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const SubmissionBody: React.FC<Props> = ({
  title,
  description,
  reward,
  date,
  category,
  setTitle,
  setDescription,
  setReward,
  setDate,
  setCategory,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const options = {
    title: "Please choose a date",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date(formattedDate),
    theme: {
      background: "bg-white",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "bg-gray-200",
      input: "",
      inputIcon: "",
      selected: "",
    },
    icons: {
      // () => ReactElement | JSX.Element
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
    defaultDate: new Date(),
    language: "en",
  };

  // TODO: Fix default date for edit to show the previous date set by the deployer

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  function handleChange(html: string) {
    setDescription(html);
  }

  const handleRewardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    setReward(value);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      let categories = await fetchCategories();
      categories = categories.filter(
        (category) => category.title !== "View All",
      );
      setCategories(categories);

      if (categories.length > 0) {
        setCategory(categories[0]._id);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="bg-white p-8 rounded-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl text-black">Submission Body</h3>
        <button
          className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r"
          onClick={() => setDescription("")}
        >
          <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
            Clear Description
          </span>
        </button>
      </div>
      <hr className="w-full h-0.5 bg-gradient-to-r from-[#ff00c7] to-[#ff9bfb] rounded-full my-4" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="Reward"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Reward ($SALD)
          </label>
          <input
            type="number"
            id="reward"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0"
            value={reward}
            onChange={handleRewardChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
        <div>
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4">
        Description
      </label>
      <ReactQuill value={description} onChange={handleChange} />
    </div>
  );
};

export default SubmissionBody;
