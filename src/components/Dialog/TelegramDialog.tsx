import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { addTelegram } from "@/utils/Common";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean | undefined;
};

const TelegramDialog: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  const [telegramHandle, setTelegramHandle] = useState("");
  const [success, setSuccess] = useState(false);
  const address = useAddress();

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
                  Please add your telegram handle first!
                </Dialog.Title>
                <div className="mt-2">
                  <label
                    htmlFor="telegram"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Telegram Handle (without an @ at the front)
                  </label>
                  <input
                    type="text"
                    id="telegram"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={telegramHandle}
                    onChange={(e) => setTelegramHandle(e.target.value)}
                    required
                  />
                  {success && (
                    <div
                      className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:text-green-400 mt-2"
                      role="alert"
                    >
                      <span className="font-medium">Updated!</span> Please
                      continue using the application.
                    </div>
                  )}
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
                  {address ? (
                    <button
                      className={`p-1 rounded-full from-[#ff00c7] to-[#ff9bfb] bg-gradient-to-r disabled:opacity-60`}
                      onClick={() =>
                        addTelegram(telegramHandle, address!, setSuccess)
                      }
                      disabled={success || telegramHandle.length === 0}
                    >
                      <span className="block text-white px-4 py-2 font-semibold rounded-full bg-transparent hover:bg-white hover:text-black transition">
                        Add Telegram Handle!
                      </span>
                    </button>
                  ) : (
                    <ConnectWallet
                      theme="light"
                      style={{
                        background:
                          "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)",
                        borderRadius: 40,
                        paddingLeft: 36,
                        paddingRight: 36,
                        paddingTop: 16,
                        paddingBottom: 16,
                        justifyContent: "center",
                      }}
                    />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TelegramDialog;
