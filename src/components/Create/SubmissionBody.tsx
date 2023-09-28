"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import dynamic from "next/dynamic";
import Datepicker from "tailwind-datepicker-react";
import "react-quill/dist/quill.snow.css";
import { fetchCategories } from "@/utils/Categories";
import { ICategory } from "@/interfaces/CategoryResponse";
import { fetchJobTypes, fetchLocations } from "@/utils/Common";
import { IJobType } from "@/interfaces/JobTypeResponse";
import { FileInfo } from "@/interfaces/FileInfo";
import axios from "axios";
import { postListing } from "@/utils/Deployer";

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
    location: string;
    type: string;
    description: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      title: string;
      reward: string;
      date: Date;
      category: string;
      location: string;
      type: string;
      description: string;
    }>
  >;
};

const SubmissionBody: React.FC<Props> = ({ form, setForm }) => {
  const [show, setShow] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [jobTypes, setJobTypes] = useState<IJobType[]>([]);
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (html: string) => {
    setForm({ ...form, description: html });
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);
      data.set("title", form.title);
      data.set("category", form.category);
      data.set("reward", form.reward);
      data.set("date", form.date.toISOString());
      data.set("description", form.description);
      data.set("type", form.type);
      data.set("location", form.location);

      const res = await fetch("/api/test", {
        method: "POST",
        body: data,
      });

      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
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
    defaultDate: new Date(),
    language: "en",
  };

  const handleDateChange = (selectedDate: Date) => {
    setForm({ ...form, date: selectedDate });
  };

  useEffect(() => {
    const promises = [fetchCategories(), fetchLocations(), fetchJobTypes()];

    Promise.all(promises)
      .then((responses) => {
        // Setting categories
        let categories = responses[0];
        categories = categories.filter(
          (category: ICategory) => category.title !== "View All"
        );
        setCategories(categories);

        // Setting locations
        const locations = responses[1];
        setLocations(locations);

        // Setting job types
        const jobTypes = responses[2];
        setJobTypes(jobTypes);

        // Setting the states for form
        if (categories.length > 0) {
          setForm((prev) => ({ ...prev, category: categories[0]._id }));
        }

        if (locations.length > 0) {
          setForm((prev) => ({ ...prev, location: locations[0] }));
        }

        if (jobTypes.length > 0) {
          setForm((prev) => ({ ...prev, type: jobTypes[0].title }));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="bg-white p-8 rounded-xl">
      <form onSubmit={onSubmit}>
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
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select Location
            </label>
            <select
              id="location"
              name="location"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleChange}
            >
              {locations.map((location, index) => (
                <option value={location} key={location + index}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Job Type
            </label>
            <select
              id="type"
              name="type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleChange}
            >
              {jobTypes.map((type) => (
                <option value={type.title} key={type._id}>
                  {type.title}
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
            onChange={(e) => setFile(e.target.files?.[0])}
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
        <div className="flex items-center justify-end my-4">
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
        </div>
      </form>
    </div>
  );
};

export default SubmissionBody;
