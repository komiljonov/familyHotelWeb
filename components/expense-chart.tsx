"use client";

import { PieChart, Pie, Cell, Tooltip, PieLabelRenderProps } from "recharts";

const ExpensePieChart = () => {

  const data = [
    {
      name: "1 - smena",
      value: 17000,
      color: "blue", // Green
    },
    {
      name: "2 - smena",
      value: 23000,
      color: "red", // Red
    }
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
          Chiqimlar
        </text>
        <text
          x={centerX}
          y={Number(centerY) + 15}
          textAnchor="middle"
          fontSize="20"
          fontWeight="bold"
        >
          {data?.reduce((total, entry) => total + entry.value, 0).toLocaleString()} 
        </text>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80} // Avval 60 edi
          outerRadius={110} // Avval 80 edi
          dataKey="value"
          stroke="white"
          strokeWidth={4}
          cornerRadius={8}
          label={renderCenterText}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
      <div className="flex gap-3">
        {data?.map((item, index) => (
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

export default ExpensePieChart;
