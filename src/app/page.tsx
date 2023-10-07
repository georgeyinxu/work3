"use client";

import React, { useState, useEffect } from "react";
import {
  useAddress,
  useNetwork,
  useNetworkMismatch,
  ChainId,
} from "@thirdweb-dev/react";

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
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const address = useAddress();
  const [, switchNetwork] = useNetwork();
  const isMismatched = useNetworkMismatch();

  useEffect(() => {
    if (isMismatched && switchNetwork) {
      switchNetwork(ChainId.Mumbai);
    }
  }, [address]);

  useEffect(() => {
    const promises = [fetchListings(currentPage, selected)];

    Promise.all(promises).then((responses) => {
      const listingsData = responses[0] as {
        listingsData: IListing[];
        totalPages: number;
      };
      const pagesData = listingsData.totalPages;
      const listingItems = listingsData.listingsData;

      setListings(listingItems);
      setTotalPages(pagesData);

      if (listingItems.length === 0) {
        setCurrentPage(1);
      }
    });
  }, [selected, currentPage]);

  useEffect(() => {
    setIsLoading(true);
    const promises = [fetchCategories()];

    Promise.all(promises).then((responses) => {
      const categories = responses[0] as ICategory[];
      setCategories(categories);
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setSelected(categories.length > 0 ? categories[0]._id : "");
  }, [categories]);

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <li>
          <button
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    return buttons;
  };

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
            categories &&
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
      <nav className="mb-4">
        <ul className="inline-flex -space-x-px text-base h-10">
          {renderPaginationButtons()}
        </ul>
      </nav>
    </main>
  );
};

export default App;
