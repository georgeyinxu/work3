import { FaArrowDown } from "react-icons/fa";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

const TransactionCard = () => {
  const address = useAddress();

  return (
    <div className="bg-white rounded-2xl transaction-card">
      <div className="bg-gray-100 rounded-2xl text-gray-500 text-base p-4">
        <h6 className="">You pay</h6>
        <div className="flex items-center justify-between">
          <div>
            <input
              type="number"
              id="visitors"
              className="text-4xl bg-gray-100 rounded-lg block w-full"
              placeholder="0"
              required
            />
          </div>
          <div className="flex items-center">
            <img
              src="/images/sald-token.svg"
              className="w-20 h-20"
              alt="sald token"
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 rounded-md w-10 h-10 flex items-center justify-center -my-4 mx-auto border-4 border-white border-solid z-100 relative">
        <FaArrowDown />
      </div>
      <div className="bg-gray-100 rounded-2xl text-gray-500 text-base px-4 py-8">
        <h3 className="text-4xl text-black font-bold text-center">
          0xc54...401a
        </h3>
      </div>
      <div className="w-full">
        {address ? (
          <button
            style={{
              background:
                "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)",
              borderRadius: 16,
              paddingTop: 20,
              paddingBottom: 20,
              fontSize: 24,
              fontWeight: 600,
              color: "white",
              marginTop: 8,
              width: "100%",
            }}
          >
            Apply Now
          </button>
        ) : (
          <ConnectWallet
            theme="light"
            style={{
              background:
                "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)",
              borderRadius: 16,
              paddingTop: 20,
              paddingBottom: 20,
              fontSize: 24,
              marginTop: 8,
              width: "100%",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionCard;
