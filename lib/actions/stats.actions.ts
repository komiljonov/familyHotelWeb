import { $api } from "../api/api";
import { IEmployeeFilter } from "../types/employee.types";

export const fetchStats = async (filters: IEmployeeFilter) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value.toString());
    }
  });

  const response = await $api.get(`/statistics?${params.toString()}`);
  return response.data;
};
