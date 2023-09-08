import { Tab } from "@headlessui/react";

const DeploymentTabs = () => {
  return (
    <Tab.Group>
      <Tab.List className="flex gap-2 my-4">
        <Tab className="flex items-center justify-center py-2 px-3 uppercase font-bold rounded-md text-[#7D7D7D] text-base transition">
          1H
        </Tab>
        <Tab className="flex items-center justify-center py-2 px-3 uppercase font-bold rounded-md text-[#7D7D7D] text-base transition">
          1D
        </Tab>
        <Tab className="flex items-center justify-center py-2 px-3 uppercase font-bold rounded-md text-[#7D7D7D] text-base transition">
          1W
        </Tab>
        <Tab className="flex items-center justify-center py-2 px-3 uppercase font-bold rounded-md text-[#7D7D7D] text-base transition">
          1M
        </Tab>
        <Tab className="flex items-center justify-center py-2 px-3 uppercase font-bold rounded-xl text-base transition bg-[#222222]/10 text-black">
          1Y
        </Tab>
      </Tab.List>
    </Tab.Group>
  );
};

export default DeploymentTabs;
