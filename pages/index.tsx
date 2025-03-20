import EmployeesData from "@/components/employee-data";
import ExpensePieChart from "@/components/expense-chart";
import IncomePieChart from "@/components/income-chart";
import IncomeExpenseData from "@/components/income-expense-data";
import SelectBranchs from "@/components/select-branch";
import SelectDateRage from "@/components/select-date-range";
import { formatUzbekDate } from "@/lib/functions";
import { CalendarMonth } from "@mui/icons-material";
import { Button } from "@mui/material";
import { format } from "date-fns";
import React, { useState } from "react";

const Home = () => {
  const [branchs, setBranchs] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [dates, setDates] = useState<{
    start_date: string;
    end_date: string;
  }>();

  const handeSubmit = (start_date: string, end_date: string) => {
    setDates({ start_date, end_date });
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 px-4 py-4">
      <div className="mx-auto flex justify-center w-full max-w-[450px]">
        {dates?.start_date && dates?.end_date ? (
          <h2 className="text-md font-bold text-center ">
            Xodimlarning {formatUzbekDate(dates?.start_date, false).toLocaleLowerCase()} dan{" "}
            {formatUzbekDate(dates?.end_date, false)?.toLocaleLowerCase()} gacha bo&lsquo;lgan
            vaqtdagi statistikasi
          </h2>
        ) : (
          <h2 className="text-md font-bold text-center">
            Xodimlarning{" "}
            {formatUzbekDate(
              format(new Date(), "yyyy-MM-dd"),
              false
            ).toLocaleLowerCase()}{" "}
            dagi statistikasi
          </h2>
        )}
      </div>
      <div className="mx-auto flex justify-between w-full max-w-[450px]">
        <SelectBranchs
          selectedValues={branchs}
          setSelectedValues={setBranchs}
        />

        <Button onClick={() => setOpen(true)}>
          <CalendarMonth />
        </Button>
      </div>
      <SelectDateRage open={open} setOpen={setOpen} onSubmit={handeSubmit} />

      <IncomePieChart />

      <ExpensePieChart />

      <IncomeExpenseData />

      <div className="flex flex-col items-center gap-4 w-full">
        <h3 className="text-xl font-bold self-start">Xodimlar</h3>
        <EmployeesData />
      </div>
    </div>
  )
}

export default Home
