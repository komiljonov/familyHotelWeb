import { format } from "date-fns/format";
import { uz } from "date-fns/locale/uz";

const uzbekMonths = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabr",
];
export const formatUzbekDate = (dateString: string, tomorrow: boolean) => {
  const date = new Date(dateString);
  if (tomorrow) {
    date.setDate(date.getDate() + 1);
  }
  const day = format(date, "d", { locale: uz }); // 1, 2, 3...
  const monthIndex = date.getMonth(); // 0-indexed
  return `${day} - ${uzbekMonths[monthIndex]}`;
};
