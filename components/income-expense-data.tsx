import IncomeExpenseCard from "./income-expense-card";

export default function IncomeExpenseData() {
  const data = [
    {
      title: "Kirim",
      variant: "smena-one",
      value: 7000,
      type: "income",
      order_count: 23
    },
    {
      title: "Chiqim",
      variant: "smena-one",
      value: 3000,
      type: "expense",
      order_count: 23
    },
    {
      title: "Kirim",
      variant: "smena-two",
      value: 7000,
      type: "income",
      order_count: 23
    },
    {
      title: "Chiqim",
      variant: "smena-two",
      value: 3000,
      type: "expense",
      order_count: 23
    }
  ]
  return (
    <div className="grid grid-cols-2 gap-3 mt-[30px] items-center w-full" >
      {
        data.map((item, index) => (
          <IncomeExpenseCard key={index} {...item} />
        ))
      }
    </div>
  );
}
