"use client";

import { IStats } from "@/lib/types/stats.types";
import { PieChart, Pie, Cell, Tooltip, PieLabelRenderProps } from "recharts";

const IncomeExpenseChart = ({ stats}: { stats: IStats}) => {

  const item = stats?.totals
  const chartData = [
    {
      name: "Kirim",
      value: item?.income_amount,
      color: "#1ACD81", // Green
      type: "smena-one",
    },
    {
      name: "Chiqim",
      value: item?.expense_amount,
      color: "#EF5C44", // Red
      type: "smena-one",
    },
  
  ]
 

  const renderCenterText = ({ cx, cy }: PieLabelRenderProps) => {
    const centerX = cx ?? 0; // Agar cx undefined bo‘lsa, 0 qiymatini oladi
    const centerY = cy ?? 0;

    return (
      <>
        <text
          x={centerX}
          y={Number(centerY) - 10}
          textAnchor="middle"
          fontSize="14"
          fill="#888"
        >
          Aylanma
        </text>
        <text
          x={centerX}
          y={Number(centerY) + 15}
          textAnchor="middle"
          fontSize="20"
          fontWeight="bold"
        >
          {(item?.income_amount - item?.expense_amount)?.toLocaleString()} 
        </text>
      </>
    );
  };

 

  return (
    <div className="flex flex-col items-center min-h-[264px]">
      <PieChart width={240} height={240}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={70} // Avval 60 edi
          outerRadius={110} // Avval 80 edi
          dataKey="value"
          stroke="white"
          strokeWidth={6}
          cornerRadius={10}
          label={renderCenterText}
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>

        <Tooltip formatter={(value) => `${value.toLocaleString()} UZS`} />
      </PieChart>
      <div className="flex gap-3">
        {chartData?.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            >
            </div>
              <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeExpenseChart;
