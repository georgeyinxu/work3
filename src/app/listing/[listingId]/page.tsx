"use client";

import React, { useState } from "react";
import WorkerView from "@/components/ListingDetails/WorkerView";
import DeployerView from "@/components/ListingDetails/DeployerView";

const JobDetails = () => {
  const [isWorker, setIsWorker] = useState(true);
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-screen-xl rounded-xl px-6 py-32 w-full">
        {isWorker ? <WorkerView /> : <DeployerView />}
      </div>
    </main>
  );
};

export default JobDetails;
