import { IListing } from "@/interfaces/ListingResponse";
import Link from "next/link";

type Props = {
  listingDetails: IListing;
};

const ListingCard: React.FC<Props> = ({ listingDetails }) => {
  return (
    <div className="py-6 px-8 border border-gray-300 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-xl sm:text-2xl md:text-3xl text-[#202020] font-semibold">
          {listingDetails.title}
        </h3>
        <Link
          className="items-center justify-center gap-3 text-[#202020] hover:text-[#FE66FF] text-xl hidden md:flex"
          href={`/listing/${listingDetails._id}`}
        >
          <button className="p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r">
            <span className="block text-white px-4 py-2 font-semibold rounded-full bg-transparent hover:bg-white hover:text-black transition">
              Apply Now
            </span>
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 mt-2">
        <span className="bg-pink-100 text-pink-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded-lg text-center">
          {listingDetails.reward} $SALD
        </span>
        <span className="bg-pink-100 text-pink-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded-lg text-center">
          {listingDetails.location}
        </span>
        <span className="bg-pink-100 text-pink-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded-lg text-center">
          {listingDetails.jobType}
        </span>
      </div>
      <p
        className="text-sm sm:text-base md:text-lg my-4 line-clamp-5 text-[#202020]"
        dangerouslySetInnerHTML={{ __html: listingDetails.description }}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 items-center justify-center">
        <Link
          className="items-center justify-center gap-3 text-[#202020] hover:text-[#FE66FF] text-xl flex md:hidden w-full"
          href={`/listing/${listingDetails._id}`}
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
};

export default ListingCard;
