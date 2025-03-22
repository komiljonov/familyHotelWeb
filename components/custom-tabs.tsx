"use client";

import { motion } from "framer-motion";
import { ITurns } from "@/lib/types/turn.types";

type Props = {
    tabs: ITurns[],
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    activeTab: string;
}

export default function ShiftTabs({ tabs, setActiveTab, activeTab }: Props) {

   
  return (
    <div className="relative w-full flex h-[48px] space-x-2 p-1 bg-gray-200 rounded-lg">
      {tabs.map((tab) => (
        <div
          key={tab?.id}
          className={`relative flex-1 text-center py-2 cursor-pointer select-none ${
            activeTab === tab?.id ? "text-gray-800 font-medium" : "text-gray-500"
          }`}
          onClick={() => setActiveTab(tab?.id)}
        >
          {activeTab === tab?.id && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-0 bg-white rounded-lg shadow"
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            />
          )}
          <span className="relative z-10">{tab?.name}</span>
        </div>
      ))}
    </div>
  );
}
