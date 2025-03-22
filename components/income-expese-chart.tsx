"use client";

import { PieChart, Pie, Cell, Tooltip, PieLabelRenderProps } from "recharts";

const IncomeExpenseChart = ({type}: {type: string}) => {

  const data = [
    {
      name: "Kirim",
      value: 17000,
      color: "#1ACD81", // Green
      type: "smena-one",
    },
    {
      name: "Chiqim",
      value: 13000,
      color: "#EF5C44", // Red
      type: "smena-one",
    },
    {
      name: "Kirim",
      value: 17000,
      color: "#1ACD81", // Green
      type: "smena-two",
    },
    {
      name: "Chiqim",
      value:15000,
      color: "#EF5C44", // Red
      type: "smena-two",
    },
  ]
  const chartData = type
  ? data.filter((item) => item.type === type)
  : [
      {
        name: "Kirim",
        value: data.filter((item) => item.name === "Kirim").reduce((acc, curr) => acc + curr.value, 0),
        color: "#1ACD81",
      },
      {
        name: "Chiqim",
        value: data.filter((item) => item.name === "Chiqim").reduce((acc, curr) => acc + curr.value, 0),
        color: "#EF5C44",
      },
    ];

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
          {chartData?.reduce((total, entry) => total + entry.value, 0).toLocaleString()} 
        </text>
      </>
    );
  };

 

  return (
    <div className="flex flex-col items-center">
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

        <Tooltip />
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
