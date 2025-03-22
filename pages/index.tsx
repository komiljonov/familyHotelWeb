import ShiftTabs from "@/components/custom-tabs";
import EmployeesData from "@/components/employee-data";
import IncomeExpenseData from "@/components/income-expense-data";
import SelectBranchs from "@/components/select-branch";
import SelectDateRage from "@/components/select-date-range";
import { formatUzbekDate } from "@/lib/functions";
import { CalendarMonth } from "@mui/icons-material";
import { format } from "date-fns";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Komponentlarni dinamik import qilish
const IncomeExpenseChart = dynamic(
  () => import("@/components/income-expese-chart"),
  {
    ssr: false, // Faqat clientda yuklanadi
  }
);

const Home = () => {
  const [branchs, setBranchs] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [dates, setDates] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [tab, setTab] = useState<string>("");

  const handeSubmit = (start_date: string, end_date: string) => {
    setDates({ start_date, end_date });
  };

  const tabs = [
    {
      label: "Jami",
      value: "",
    },
    {
      label: "1 - smena",
      value: "smena-one",
    },
    {
      label: "2 - smena",
      value: "smena-two",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-6 px-4 py-4">
      <div className="mx-auto flex justify-between gap-3 items-center w-full max-w-[450px]">
        {dates?.start_date && dates?.end_date ? (
          <h2 className="text-md font-bold text-center ">
            Xodimlarning {format(new Date(dates?.start_date), "dd.MM.yyyy")} -{" "}
            {format(new Date(dates?.end_date), "dd.MM.yyyy")} dagi statistikasi
          </h2>
        ) : (
          <h2 className="text-md font-bold text-center">
            Xodimlarning {format(new Date(), "dd.MM.yyyy")} dagi statistikasi
          </h2>
        )}

        <button
          onClick={() => setOpen(true)}
          className="min-w-10 h-10 flex justify-center items-center rounded-md bg-[#EFF5FF] text-[#3774FA]"
        >
          <CalendarMonth style={{ fontSize: "24px" }} />
        </button>
      </div>

      <SelectBranchs selectedValues={branchs} setSelectedValues={setBranchs} />

      <SelectDateRage open={open} setOpen={setOpen} onSubmit={handeSubmit} />

      <ShiftTabs tabs={tabs} activeTab={tab} setActiveTab={setTab} />

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 1 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="w-full flex flex-col items-center gap-4"
        >
          <IncomeExpenseChart type={tab} />
          <IncomeExpenseData variant={tab} />
          <div className="flex flex-col items-center gap-6 w-full">
            <h3 className="text-xl font-bold self-start">Xodimlar</h3>
            <EmployeesData variant={tab} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Home;
