import { Box } from "@mui/material";
import EmployeeCard from "./employee-card";
import { IEmployee } from "@/lib/types/employee.types";


export default function EmployeesData({employees}: {employees: IEmployee[]}) {
 
  return (
    <div className="flex flex-col gap-3 w-full">
      {employees?.sort((a, b) => b.total_income - a.total_income)?.map((employee, index) => (
        <EmployeeCard key={index} employee={employee as IEmployee} />
      ))}
    </div>
  );
}
