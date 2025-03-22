import { IStats } from "@/lib/types/stats.types";
import IncomeExpenseCard from "./income-expense-card";

export default function IncomeExpenseData({ stats}: { stats: IStats}) {
  const item = stats?.totals
  const data = [
    {
      title: "Kirim",
      variant: "smena-one",
      value: item?.income_amount,
      type: "income",
      order_count: item?.income_count,
    },
    {
      title: "Chiqim",
      variant: "smena-one",
      value: item?.expense_amount,
      type: "expense",
      order_count: item?.expense_count,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-[30px] items-center w-full">
      {data?.map((item, index) => (
        <IncomeExpenseCard key={index} {...item} />
      ))}
    </div>
  );
}
