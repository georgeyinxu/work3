"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaAnglesRight } from "react-icons/fa6";

import ICategory from "@/interfaces/CategoryResponse";
import IListing from "@/interfaces/ListingResponse";

import { fetchListings } from "@/utils/Listings";
import { fetchCategories } from "@/utils/Categories";

const App = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [listings, setListings] = useState<IListing[]>([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    const fetchAllData = async () => {
      setCategories(await fetchCategories());
      setListings(await fetchListings());
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    setSelected(categories.length > 0 ? categories[0]._id : "");
  }, [categories]);

  return (
    <main className="bg-white flex flex-col items-center justify-center">
      <div className="max-w-screen-xl py-40 min-h-screen flex flex-col items-start">
        <h1 className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-tr from-[#FF4FB8] to-[#FF9FFB]">
          [How Work Should Work]
        </h1>
        <div className="grid grid-cols-8 gap-4 mt-10">
          {categories &&
            categories.map((category) => (
              <button
                className={`bg-[#FF66FF] rounded-md py-4 px-8 flex flex-col items-center justify-center ${
                  category._id !== selected && "bg-opacity-60"
                }`}
                key={category._id}
                onClick={() => setSelected(category._id)}
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
        <hr className="w-full h-0.5 bg-gradient-to-r from-[#ff00c7] to-[#ff9bfb] rounded-full my-10" />
        <div className="flex flex-col gap-4 w-full">
          {listings &&
            listings.map((listing) => {
              if (
                listing.category === selected ||
                categories[0]._id === selected
              ) {
                return (
                  <div
                    className="py-6 px-8 border border-gray-300 rounded-lg"
                    key={listing._id}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-semibold">
                        {listing.title}
                      </h3>
                      <Link
                        className="flex items-center justify-center gap-3 hover:text-[#FE66FF] text-3xl"
                        href={`/listing/${listing._id}`}
                      >
                        <span className="font-semibold">Apply</span>
                        <FaAnglesRight />
                      </Link>
                    </div>
                    <p
                      className="text-lg mt-2 mb-4 line-clamp-5"
                      dangerouslySetInnerHTML={{ __html: listing.description }}
                    />
                    <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
                      <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
                        {listing.reward} $SALD
                      </span>
                    </button>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </main>
  );
};

export default App;
