import IncomeExpenseCard from "./income-expense-card";

export default function IncomeExpenseData({ variant }: { variant: string }) {
  const data = [
    {
      title: "Kirim",
      variant: "smena-one",
      value: 7000,
      type: "income",
      order_count: 23,
    },
    {
      title: "Chiqim",
      variant: "smena-one",
      value: 3000,
      type: "expense",
      order_count: 23,
    },
    {
      title: "Kirim",
      variant: "smena-two",
      value: 7000,
      type: "income",
      order_count: 23,
    },
    {
      title: "Chiqim",
      variant: "smena-two",
      value: 3000,
      type: "expense",
      order_count: 23,
    },
  ];

  const chartData = variant
    ? data.filter((item) => item.variant === variant)
    : [
        {
          title: "Kirim",
          value: data
            .filter((item) => item.title === "Kirim")
            .reduce((acc, curr) => acc + curr.value, 0),
          order_count: data
            .filter((item) => item.title === "Chiqim")
            .reduce((acc, curr) => acc + curr.order_count, 0),
          color: "#1ACD81",
          type: "income",
          variant: "",
        },
        {
          title: "Chiqim",
          value: data
            .filter((item) => item.title === "Chiqim")
            .reduce((acc, curr) => acc + curr.value, 0),
          order_count: data
            .filter((item) => item.title === "Chiqim")
            .reduce((acc, curr) => acc + curr.order_count, 0),
          color: "#EF5C44",
          type: "expense",
          variant: "",
        },
      ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-[30px] items-center w-full">
      {chartData.map((item, index) => (
        <IncomeExpenseCard key={index} {...item} />
      ))}
    </div>
  );
}
