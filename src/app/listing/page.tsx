"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Job = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      router.push("/");
    }
  }, [isMounted]);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <h1 className="text-6xl">OOPS GO BACK HOME!</h1>
    </div>
  );
};

export default Job;
