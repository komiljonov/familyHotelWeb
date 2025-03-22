"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
    tabs: {
        label: string;
        value: string
    }[],
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    activeTab: string;
}

export default function ShiftTabs({ tabs, setActiveTab, activeTab }: Props) {

    useEffect(() => {
        if (activeTab === "") {
            setActiveTab(tabs[0]?.value);
        }
    }, [ tabs, setActiveTab , activeTab ]);

  return (
    <div className="relative w-full flex space-x-2 p-1 bg-gray-200 rounded-lg">
      {tabs.map((tab) => (
        <div
          key={tab?.value}
          className={`relative flex-1 text-center py-2 cursor-pointer select-none ${
            activeTab === tab?.value ? "text-gray-800 font-medium" : "text-gray-500"
          }`}
          onClick={() => setActiveTab(tab?.value)}
        >
          {activeTab === tab?.value && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-0 bg-white rounded-lg shadow"
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            />
          )}
          <span className="relative z-10">{tab?.label}</span>
        </div>
      ))}
    </div>
  );
}
