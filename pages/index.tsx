import ShiftTabs from "@/components/custom-tabs";
import EmployeesData from "@/components/employee-data";
import IncomeExpenseData from "@/components/income-expense-data";
import SelectBranchs from "@/components/select-branch";
import SelectDateRage from "@/components/select-date-range";
import { formatDate, formatUzbekDate } from "@/lib/functions";
import { CalendarMonth, Close } from "@mui/icons-material";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "@/lib/actions/stats.actions";
import { IStats } from "@/lib/types/stats.types";
import { fetchTurns } from "@/lib/actions/turns.action";
import { ITurns } from "@/lib/types/turn.types";
import { fetchEmployees } from "@/lib/actions/employee.action";
import { IEmployee } from "@/lib/types/employee.types";
import ErrorPage from "@/components/error-page";

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
  const [tabs, setTabs] = useState<ITurns[]>([]);

  const filterData = {
    turn: tab === "all" ? "" : tab,
    filial: branchs.join(","),
    start: dates?.start_date || "",
    end: dates?.end_date || "",
  };

  const { data: stats, isError: statsError } = useQuery<IStats>({
    queryKey: ["stats", Object.values(filterData)],
    queryFn: () => fetchStats(filterData),
    enabled: !!tab,
  });

  const { data: employees, isError: employeesError } = useQuery<IEmployee[]>({
    queryKey: ["employees", Object.values(filterData)],
    queryFn: () => fetchEmployees(filterData),
    enabled: !!tab,
  });

  const { data: turns } = useQuery<ITurns[]>({
    queryKey: ["turns"],
    queryFn: fetchTurns,
  });

  useEffect(() => {
    if (turns) {
      const tabs = [
        {
          name: "Jami",
          id: "all",
        },
        ...(turns as ITurns[]),
      ];
      setTabs(tabs);
      setTab(tabs[0]?.id);
    }
  }, [turns]);

  const handeSubmit = (start_date: string, end_date: string) => {
    setDates({ start_date, end_date });
  };

  return (
    <div className="w-full sm:hidden flex flex-col items-center gap-6 px-4 py-4 bg-white">
      <div className="mx-auto flex justify-between gap-3 items-center w-full max-w-[450px]">
        {dates?.start_date || dates?.end_date ? (
          <h2 className="text-md font-bold text-center ">
           {formatDate(dates?.start_date)} {dates?.end_date && "-"}  { dates?.end_date && formatDate(dates?.end_date)}
          </h2>
        ) : (
          <h2 className="text-md font-bold text-center">
            {format(new Date(), "dd.MM.yyyy")} 
          </h2>
        )}

        {dates?.start_date || dates?.end_date ? (
          <button
            onClick={() => setDates({ start_date: "", end_date: "" })}
            className="min-w-10 h-10 flex justify-center items-center rounded-md bg-[#EFF5FF] text-[#3774FA]"
          >
            <Close style={{ fontSize: "24px" }} />
          </button>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="min-w-10 h-10 flex justify-center items-center rounded-md bg-[#EFF5FF] text-[#3774FA]"
          >
            <CalendarMonth style={{ fontSize: "24px" }} />
          </button>
        )}
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
          <div className="h-[264px]">
            {statsError ? (
              <ErrorPage error="Statistikani yuklashda xatolik yuz berdi!" />
            ) : (
              <IncomeExpenseChart stats={stats as IStats} />
            )}
          </div>
          {statsError ? <ErrorPage error="Statistikani yuklashda xatolik yuz berdi!" /> : <IncomeExpenseData stats={stats as IStats} />}
          <div className="flex flex-col items-center gap-6 w-full">
            <h3 className="text-xl font-bold self-start">Xodimlar</h3>
            {employeesError ? <ErrorPage error="Xodimlarni yuklashda xatolik yuz berdi!" /> : <EmployeesData employees={employees as IEmployee[]} />}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Home;
