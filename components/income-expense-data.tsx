import IncomeExpenseCard from "./income-expense-card";

export default function IncomeExpenseData() {
  return (
    <div className="grid grid-cols-2 gap-3 mt-[30px] items-center w-full" >
      <IncomeExpenseCard title="Kirim" variant="smena-one" value={7000} type="income" />
      <IncomeExpenseCard title="Chiqim" variant="smena-one" value={3000} type="expense" />
      <IncomeExpenseCard title="Kirim" variant="smena-two" value={7000} type="income" />
      <IncomeExpenseCard title="Chiqim" variant="smena-two" value={3000} type="expense" />
    </div>
  );
}
