"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

import { FaAnglesRight } from "react-icons/fa6";

import ICategory from "@/interfaces/categoryResponse";

const App = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selected, setSelected] = useState<string>("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category");
      const categories: ICategory[] = response.data.data;

      setCategories(categories);
      setSelected(categories[0].value);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <main className="bg-white flex flex-col items-center justify-center">
      <div className="max-w-screen-xl py-40 min-h-screen flex flex-col items-start">
        <h1 className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-tr from-[#FF4FB8] to-[#FF9FFB]">
          [How Work Should Work]
        </h1>
        <div className="grid grid-cols-8 gap-4 mt-10">
          {categories.map((category) => (
            <button
              className={`bg-[#FF66FF] rounded-md py-4 px-8 flex flex-col items-center justify-center ${
                category.value !== selected && "bg-opacity-60"
              }`}
              key={category._id}
              onClick={() => setSelected(category.value)}
            >
              {category.icon && (
                <img
                  src={category.icon}
                  className="h-10 mb-4"
                  alt={category.title}
                />
              )}
              <p className="text-white text-center">{category.title}</p>
            </button>
          ))}
        </div>
        <div className="h-1 my-8 bg-gradient-to-r from-red-400 via-yellow-500 to-green-400" />
        <div className="flex flex-col gap-4 w-full">
          <div className="py-4 px-6 border border-gray-300 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-semibold">Product Designer</h3>
              <Link
                className="flex items-center justify-center gap-3 hover:text-[#FE66FF]"
                href="/listing/1"
              >
                <span className="text-3xl font-semibold">Apply</span>
                <FaAnglesRight />
              </Link>
            </div>
            <p className="text-lg mt-2 mb-4">
              We&apos;re looking for a mid-level product designer to join our
              team.
            </p>
            <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
              <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
                1000 $SALD
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
