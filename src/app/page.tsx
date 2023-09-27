"use client";

import React, { useState, useEffect } from "react";

import { ICategory } from "@/interfaces/CategoryResponse";
import { IListing } from "@/interfaces/ListingResponse";

import { fetchListings } from "@/utils/Listings";
import { fetchCategories } from "@/utils/Categories";
import ListingCard from "@/components/ListingCard";
import Category from "@/components/Loading/Category";
import ListingCardLoad from "@/components/Loading/ListingCard";

const App = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [listings, setListings] = useState<IListing[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const promises = [fetchCategories(), fetchListings()];

    Promise.all(promises).then((responses) => {
      const categories = responses[0] as ICategory[];
      const listings = responses[1] as IListing[];

      setCategories(categories);
      setListings(listings);
      setIsLoading(false);
    });
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
        {isLoading && <Category />}
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
          {isLoading && <ListingCardLoad />}
          {listings &&
            listings.map((listing) => {
              if (
                listing.category === selected ||
                categories[0]._id === selected
              ) {
                return (
                  <ListingCard listingDetails={listing} key={listing._id} />
                );
              }
            })}
        </div>
      </div>
    </main>
  );
};

export default App;
