import { format } from "date-fns";
import { uz } from "date-fns/locale";

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

export const formatDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split("-");
  return `${day}.${month}.${year}`;
};


