"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = () => {
  const data = {
    labels: ["1-smena", "2-smena"],
    datasets: [
      {
        data: [5000, 4000], // Daromad va xarajat summalari
        backgroundColor: ["#4CAF50", "#FF5722"], // Yashil - daromad, qizil - xarajat
        hoverBackgroundColor: ["#45A049", "#E64A19"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className="w-72 h-72 mt-4">
      <h2 className="text-[20px] font-bold">Chiqimlar</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ExpensePieChart;
