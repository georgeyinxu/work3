import { IListing } from "@/interfaces/ListingResponse";
import { deleteListing } from "@/utils/Listings";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean | undefined;
  listingDetails: IListing;
};

const DeleteListing: React.FC<Props> = ({
  setIsOpen,
  isOpen,
  listingDetails,
}) => {
  const [deleteListingText, setDeleteListingText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Confirm deletion of listing
                </Dialog.Title>
                <div className="mt-2">
                  <label
                    htmlFor="delete"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Please type in{" "}
                    <span className="font-bold">{listingDetails.title}</span> to
                    delete the listing
                  </label>
                  <input
                    type="text"
                    id="delete"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={deleteListingText}
                    onChange={(e) => setDeleteListingText(e.target.value)}
                    required
                  />
                </div>
                <button
                  className="p-1 rounded-full from-red-400 via-red-500 to-red-600 bg-gradient-to-r mt-4 float-right disabled:opacity-40"
                  disabled={
                    deleteListingText !== listingDetails.title || isLoading
                  }
                  onClick={() =>
                    deleteListing(
                      listingDetails._id,
                      listingDetails.title,
                      listingDetails.description,
                      new Date(listingDetails.date),
                      listingDetails.jobId,
                      setIsLoading
                    )
                  }
                >
                  <span className="hover:text-black flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-full hover:bg-white bg-transparent text-white transition">
                    {isLoading ? "Loading" : "Delete Listing"}
                  </span>
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteListing;
