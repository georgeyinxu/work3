"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { ICategory } from "@/interfaces/CategoryResponse";
import { IListing } from "@/interfaces/ListingResponse";

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
      <div className="max-w-screen-xl py-12 px-4 min-h-screen flex flex-col items-center md:items-start">
        <h1 className="font-extrabold text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-6xl bg-clip-text bg-gradient-to-tr from-[#FF4FB8] to-[#FF9FFB]">
          [How Work Should Work]
        </h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-4 mt-10">
          {categories &&
            categories.map((category) => (
              <button
                className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r"
                key={category._id}
                onClick={() => setSelected(category._id)}
              >
                <span
                  className={`block px-4 py-2 font-semibold rounded-full hover:bg-transparent hover:text-white transition text-xs sm:text-base ${
                    selected === category._id
                      ? "bg-transparent text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {category.title}
                </span>
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
                      <h3 className="text-xl sm:text-2xl md:text-3xl text-[#202020] font-semibold">
                        {listing.title}
                      </h3>
                      <Link
                        className="items-center justify-center gap-3 text-[#202020] hover:text-[#FE66FF] text-xl hidden md:flex"
                        href={`/listing/${listing._id}`}
                      >
                        <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
                          <span className="block text-white px-4 py-2 font-semibold rounded-full bg-transparent hover:bg-white hover:text-black transition">
                            Apply Now
                          </span>
                        </button>
                      </Link>
                    </div>
                    <p
                      className="text-sm sm:text-base md:text-lg my-4 line-clamp-5 text-[#202020]"
                      dangerouslySetInnerHTML={{ __html: listing.description }}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 items-center justify-center">
                      <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
                        <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition text-base">
                          {listing.reward} $SALD
                        </span>
                      </button>
                      <Link
                        className="items-center justify-center gap-3 text-[#202020] hover:text-[#FE66FF] text-xl flex md:hidden w-full"
                        href={`/listing/${listing._id}`}
                      >
                        <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r w-full">
                          <span className="block text-white px-4 py-2 font-semibold rounded-full bg-transparent hover:bg-white hover:text-black transition text-base md:text-lg">
                            Apply Now
                          </span>
                        </button>
                      </Link>
                    </div>
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
