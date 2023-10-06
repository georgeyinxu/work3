"use client";

import React, { useEffect, useState } from "react";
import SubmissionBody from "@/components/Create/SubmissionBody";
import { useAddress, useBalance } from "@thirdweb-dev/react";
import { useRouter } from "next/navigation";
import BalanceCard from "@/components/Create/BalanceCard";
import AlertCard from "@/components/Alerts/AlertCard";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    reward: "0",
    date: new Date(),
    category: "",
    description: "",
  });
  const address = useAddress();
  const router = useRouter();
  const { data, isLoading } = useBalance(process.env.NEXT_PUBLIC_SALD_ADDR);

  // Redirect if the wallet is not connected
  // useEffect(() => {
  //   if (!address) {
  //     router.push("/");
  //   }
  // }, []);

  return (
    <main className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
      <div className="max-w-screen-xl rounded-xl px-6 py-12 w-full">
        <h3 className="text-2xl sm:text-3xl md:text-4xl uppercase font-semibold text-[#202020] text-center md:text-left">
          <span className="text-[#FF66FF]">NEW LISTING:</span> DRAFT
        </h3>
        <h5 className="text-md sm:text-lg md:text-xl text-[#202020] text-center md:text-left">
          Complete your submission, including relevant files, and then stake to
          submit
        </h5>
        <div className="flex items-center justify-end">
          <BalanceCard saldBalance={data?.displayValue} />
        </div>
        <div className="grid grid-cols-1 gap-8 mt-4">
          <SubmissionBody
            form={form}
            setForm={setForm}
            edit={false}
            saldBalance={data?.displayValue}
          />
        </div>
      </div>
    </main>
  );
};

export default Create;
