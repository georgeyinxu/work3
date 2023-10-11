import { IListing } from "@/interfaces/ListingResponse";
import { IWallet } from "@/interfaces/WalletResponse";
import { checkTelegram, short } from "@/utils/Common";
import { getDetails } from "@/utils/Deployer";
import { Dialog, Transition } from "@headlessui/react";
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import DeploymentTabs from "../ListingDetails/DeploymentTabs";
import UserDeployments from "../ListingDetails/UserDeployments";
import { BiMessageDetail } from "react-icons/bi";
import { createRoom } from "@/utils/Room";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenTele: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean | undefined;
  listingDetails: IListing;
};

const UserDialog: React.FC<Props> = ({
  setIsOpen,
  setIsOpenTele,
  isOpen,
  listingDetails,
}) => {
  const [teleAvailable, setTeleAvailable] = useState(false);
  const [wallet, setWallet] = useState<IWallet | null>(null);
  const [deployerWallet, setDeployerWallet] = useState<IWallet | null>(null);
  const address = useAddress();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    // Open Telegram Modal
    setIsOpenTele(true);
  }

  const handleCreateRoom = () => {
    if (address && listingDetails) {
      createRoom(listingDetails.from, address, listingDetails._id);
    }
  };

  useEffect(() => {
    async function fetchAllData() {
      if (address && listingDetails.from) {
        const { telegram, wallet } = await checkTelegram(address);
        const { deployerWallet } = await getDetails(listingDetails.from);

        setTeleAvailable(telegram);
        setWallet(wallet);
        setDeployerWallet(deployerWallet);
      }
    }

    console.log("listingDetails", listingDetails);
    console.log("address", address);

    fetchAllData();
  }, [listingDetails, address]);

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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  User Profile
                </Dialog.Title>
                <div className="mt-2">
                  <div className="flex justify-start items-center gap-4">
                    <img
                      src="https://sothebys-com.brightspotcdn.com/dims4/default/6a8c506/2147483647/strip/true/crop/1000x1000+0+0/resize/684x684!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F8e%2F9c%2F972bfa1645c08ca0919ea68aabfe%2F4609.png"
                      className={"w-12 h-12 md:w-16 md:h-16 rounded-full"}
                      alt={"pudgy"}
                    />
                    <div className="flex flex-col justify-between items-start">
                      <h3
                        className={
                          "text-xl sm:text-2xl md:text-3xl text-[#2E2E2E] font-bold"
                        }
                      >
                        {short(listingDetails.from)}
                      </h3>
                      <span className="text-gray-500 font-bold">TVL: 58%</span>
                    </div>
                    {teleAvailable ? (
                      <Link href={`https://t.me/${deployerWallet?.telegram}`}>
                        <img
                          src="/images/icons/telegram-logo.webp"
                          className={"w-6 h-6 md:w-8 md:h-8 rounded-full"}
                          alt={"telegram"}
                        />
                      </Link>
                    ) : (
                      <button onClick={openModal}>
                        <img
                          src="/images/icons/telegram-logo.webp"
                          className={"w-6 h-6 md:w-8 md:h-8 rounded-full"}
                          alt={"telegram"}
                        />
                      </button>
                    )}
                    <div>
                      <button>
                        <BiMessageDetail
                          onClick={handleCreateRoom}
                          color="#000"
                          size={32}
                        />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center">
                      <UserDeployments />
                    </div>
                    <hr className="w-full h-0.5 bg-gray-50 rounded-full" />
                    <div className="flex items-center justify-center md:justify-end">
                      <DeploymentTabs />
                    </div>
                    <h3 className="text-[#222222] text-2xl font-semibold">
                      Stats
                    </h3>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                      <div>
                        <p className="text-sm text-[#7D7D7D]">
                          Total Deployment
                        </p>
                        <div className="flex items-center md:justify-center">
                          <h3 className="text-[#222222] text-2xl md:text-3xl font-semibold">
                            $1.1B
                          </h3>
                          <img
                            src="/images/sald-token.svg"
                            className="w-10 h-10 md:w-12 md:h-12"
                            alt="sald token"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-[#7D7D7D]">Member Since</p>
                        <h3 className="text-[#222222] text-2xl md:text-3xl font-semibold mt-1.5">
                          8 June 2023
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    className={`p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r`}
                    onClick={closeModal}
                  >
                    <span className="block text-black px-4 py-2 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white transition">
                      Close
                    </span>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UserDialog;
