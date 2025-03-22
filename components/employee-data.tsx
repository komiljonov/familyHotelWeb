import { Box } from "@mui/material";
import EmployeeCard from "./employee-card";

const employees = [
  {
    name: "Ali Valiyev",
    income: 7000000,
    smena: "1-smena",
    variant: "smena-one",
    expense: 1200000,
  },
  {
    name: "Hasan Zokirov",
    income: 8500000,
    smena: "2-smena",
    variant: "smena-two",
    expense: 1500000,
  },
  {
    name: "Umar Ergashev",
    income: 9200000,
    smena: "1-smena",
    variant: "smena-one",
    expense: 1800000,
  },
];

export default function EmployeesData({ variant }: { variant: string }) {
  const data = variant
    ? employees.filter((item) => item.variant === variant)
    : employees;
  return (
    <div className="flex flex-col gap-3 w-full">
      {data?.map((employee, index) => (
        <EmployeeCard key={index} {...employee} />
      ))}
    </div>
  );
}
