"use client";

import React, { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import dynamic from "next/dynamic";
import Datepicker from "tailwind-datepicker-react";
import "react-quill/dist/quill.snow.css";
import { fetchCategories } from "@/utils/Categories";
import { ICategory } from "@/interfaces/CategoryResponse";
import axios from "axios";
import { fetchJobTypes, fetchLocations } from "@/utils/Common";
import { ILocation } from "@/interfaces/LocationResponse";
import { IJobType } from "@/interfaces/JobTypeResponse";

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
          setForm((prev) => ({ ...prev, type: jobTypes[0]._id }));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="bg-white p-8 rounded-xl">
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
            {locations.map((category, index) => (
              <option value={category} key={category + index}>
                {category}
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
              <option value={type._id} key={type._id}>
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
    </div>
  );
};

export default SubmissionBody;
