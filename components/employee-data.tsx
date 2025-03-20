import { Box } from "@mui/material";
import EmployeeCard from "./employee-card";

const employees = [
  { name: "Ali Valiyev", income: 7000000, smena: "1-smena", expense: 1200000 },
  { name: "Hasan Zokirov", income: 8500000, smena: "2-smena", expense: 1500000 },
  { name: "Umar Ergashev", income: 9200000, smena: "1-smena", expense: 1800000 },
];

export default function EmployeesData() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {employees.map((employee, index) => (
        <EmployeeCard key={index} {...employee} />
      ))}
    </div>
  );
}
