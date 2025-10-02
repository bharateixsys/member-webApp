// components/GaugeChart.js
"use client";
// import React from "react";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
//   Legend,
//   Label,
// } from "recharts";

// const COLORS = ["#FF6B6B", "#4ECDC4"]; // Paid = red, Remaining = teal

// // ✅ Your Chart Data from Screenshot
// const data = [
//   {
//     label: "Individual Deductible",
//     total: 7500,
//     paid: 41.92,
//     remaining: 7458.08,
//   },
//   {
//     label: "Family Deductible",
//     total: 15000,
//     paid: 41.92,
//     remaining: 14958.08,
//   },
//   {
//     label: "Individual OOP",
//     total: 9200,
//     paid: 51.03,
//     remaining: 9148.97,
//   },
//   {
//     label: "Family OOP",
//     total: 18400,
//     paid: 51.03,
//     remaining: 18348.97,
//   },
// ];

// export default function MonthlyTargetChart() {
//   return (
//     <div className="grid grid-cols-2 gap-6 p-4">
//       {data.map((item, index) => {
//         const chartData = [
//           { name: "Paid Amount", value: item.paid },
//           { name: "Remaining Amount", value: item.remaining },
//         ];
//         const percent = ((item.paid / item.total) * 100).toFixed(2);

//         return (
//           <div
//             key={index}
//             className="bg-white rounded-2xl shadow p-4 flex flex-col items-center"
//           >
//             <h3 className="text-md font-semibold mb-2 text-gray-700 text-center">
//               {item.label} (Total: ${item.total.toLocaleString()})
//             </h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={chartData}
//                   innerRadius={70}
//                   outerRadius={100}
//                   paddingAngle={2}
//                   dataKey="value"
//                 >
//                   {chartData.map((entry, i) => (
//                     <Cell key={i} fill={COLORS[i]} />
//                   ))}
//                   <Label
//                     value={`${percent}%`}
//                     position="center"
//                     fontSize="20"
//                     fontWeight="bold"
//                   />
//                 </Pie>
//                 <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
//                 <Legend verticalAlign="bottom" height={36} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#4F46E5", "#E5E7EB"]; // Paid = Indigo, Remaining = Gray

// ✅ Your data
const charts = [
  {
    title: "Individual Deductible",
    paid: 1500.92,
    remaining: 5999.08,
    total: 7500,
  },
  {
    title: "Family Deductible",
    paid: 5000.92,
    remaining: 10699.08,
    total: 15000,
  },
  {
    title: "Individual Out-of-Pocket",
    paid: 3000.03,
    remaining: 6009.97,
    total: 9200,
  },
  {
    title: "Family Out-of-Pocket",
    paid: 5000.05,
    remaining: 13399.95,
    total: 18400,
  },
];

const GaugeChart = ({ title, paid, remaining, total }) => {
  const percent = ((paid / total) * 100).toFixed(2);

  const data = [
    { name: "Paid", value: paid },
    { name: "Remaining", value: remaining },
  ];

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 m-4 w-[350px]">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={1}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [
              `$${value.toLocaleString()}`,
              name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Percentage */}
      <div className="text-center -mt-14">
        <p className="text-2xl font-bold text-indigo-600">
          {percent}%
        </p>
        <p className="text-gray-500 text-sm">of ${total.toLocaleString()}</p>
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-3 text-sm">
        <span className="text-indigo-600 font-medium">
          Paid: ${paid.toLocaleString()}
        </span>
        <span className="text-gray-500">
          Remaining: ${remaining.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default function DeductibleOutOfPocketGauge() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {charts.map((c, i) => (
        <GaugeChart key={i} {...c} />
      ))}
    </div>
  );
}



// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Label,
// } from "recharts";

// // ✅ Example Data
// const deductibleData = [
//   { label: "Individual", total: 7500, paid: 41.92, remaining: 7458.08 },
//   { label: "Family", total: 15000, paid: 41.92, remaining: 14958.08 },
// ];

// const oopData = [
//   { label: "Individual", total: 9200, paid: 51.03, remaining: 9148.97 },
//   { label: "Family", total: 18400, paid: 51.03, remaining: 18348.97 },
// ];

// // ✅ Colors
// const COLORS = ["#FF6B6B", "#4DB6AC"];

// // ✅ Reusable Donut Chart
// const DonutChart = ({ item }) => {
//   const data = [
//     { name: "Paid Amount", value: item.paid },
//     { name: "Remaining Amount", value: item.remaining },
//   ];

//   return (
//     <div style={{ width: "100%", height: 300 }}>
//       <h3 className="text-center font-semibold mb-2">
//         {item.label} (Total: ${item.total})
//       </h3>
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             innerRadius={70}
//             outerRadius={100}
//             label={({ name, value }) => `$${value.toFixed(2)}`}
//           >
//             {/* ✅ Center Label here */}
//             <Label
//               value={`Total: $${item.total}`}
//               position="center"
//               style={{ fontSize: "16px", fontWeight: "bold" }}
//             />
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index]} />
//             ))}
//           </Pie>
//           <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// // ✅ Main Component
// const CircleCharts = () => {
//   return (
//      <main className="mx-auto max-w-7xl px-4 py-8">
//     <div className="space-y-10 p-6">
//       {/* Deductibles */}
//       <div>
//         {/* <div className="mb-6">
//         <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
//           Individual/Family Year to Deductibles
//         </h1>
//         </div> */}

//         <div className="mb-6">
//           <h1 className="text-2xl font-bold tracking-tight">Individual/Family Year to Deductibles</h1>
//           {/* <p className="text-slate-600 mt-1">A clean, modern card view built with Next.js + Tailwind.</p> */}
//         </div>
//         {/* <h2 className="text-lg font-bold mb-4">
//           Individual/Family Year to Deductibles
//         </h2> */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {deductibleData.map((item, i) => (
//             <DonutChart key={i} item={item} />
//           ))}
//         </div>
//       </div>

//       {/* Out-of-Pocket */}
//       <div>
//         {/* <div className="mb-6">
//         <h1 className="text-2xl font-bold tracking-tight">Individual/Family Year to Out-of-Pocket</h1>
//         </div> */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold tracking-tight">Individual/Family Year to Out-of-Pocket</h1>
//           {/* <p className="text-slate-600 mt-1">A clean, modern card view built with Next.js + Tailwind.</p> */}
//         </div>
//         {/* <h2 className="text-lg font-bold mb-4">
//           Individual/Family Year to Out-of-Pocket
//         </h2> */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {oopData.map((item, i) => (
//             <DonutChart key={i} item={item} />
//           ))}
//         </div>
//       </div>
//     </div>
//     </main>
//   );
// };

// export default CircleCharts;



// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
//   Legend,
//   Label,
// } from "recharts";

// const COLORS = ["#FF6B6B", "#4ECDC4"]; // Paid = red, Remaining = teal

// // ✅ Your Chart Data from Screenshot
// const data = [
//   {
//     label: "Individual Deductible",
//     total: 7500,
//     paid: 41.92,
//     remaining: 7458.08,
//   },
//   {
//     label: "Family Deductible",
//     total: 15000,
//     paid: 41.92,
//     remaining: 14958.08,
//   },
//   {
//     label: "Individual OOP",
//     total: 9200,
//     paid: 51.03,
//     remaining: 9148.97,
//   },
//   {
//     label: "Family OOP",
//     total: 18400,
//     paid: 51.03,
//     remaining: 18348.97,
//   },
// ];

// export default function MonthlyTargetChart() {
//   return (
//     <div className="grid grid-cols-2 gap-6 p-4">
//       {data.map((item, index) => {
//         const chartData = [
//           { name: "Paid Amount", value: item.paid },
//           { name: "Remaining Amount", value: item.remaining },
//         ];
//         const percent = ((item.paid / item.total) * 100).toFixed(2);

//         return (
//           <div
//             key={index}
//             className="bg-white rounded-2xl shadow p-4 flex flex-col items-center"
//           >
//             <h3 className="text-md font-semibold mb-2 text-gray-700 text-center">
//               {item.label} (Total: ${item.total.toLocaleString()})
//             </h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={chartData}
//                   innerRadius={70}
//                   outerRadius={100}
//                   paddingAngle={2}
//                   dataKey="value"
//                 >
//                   {chartData.map((entry, i) => (
//                     <Cell key={i} fill={COLORS[i]} />
//                   ))}
//                   <Label
//                     value={`${percent}%`}
//                     position="center"
//                     fontSize="20"
//                     fontWeight="bold"
//                   />
//                 </Pie>
//                 <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
//                 <Legend verticalAlign="bottom" height={36} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         );
//       })}
//     </div>
//   );
// }









// "use client";

// import { PieChart, Pie, Cell, Tooltip, Legend, Label } from "recharts";

// const COLORS_INDIVIDUAL = ["#f87171", "#fecaca"]; // Paid red, Remaining light red
// const COLORS_FAMILY = ["#60a5fa", "#bfdbfe"]; // Paid blue, Remaining light blue

// // Chart Data
// const chartData = {
//   deductibles: {
//     individual: [
//       { name: "Individual Paid", value: 41.92 },
//       { name: "Individual Remaining", value: 7458.08 },
//     ],
//     family: [
//       { name: "Family Paid", value: 41.92 },
//       { name: "Family Remaining", value: 14958.08 },
//     ],
//     total: 7500 + 15000,
//   },
//   outOfPocket: {
//     individual: [
//       { name: "Individual Paid", value: 51.03 },
//       { name: "Individual Remaining", value: 9148.97 },
//     ],
//     family: [
//       { name: "Family Paid", value: 51.03 },
//       { name: "Family Remaining", value: 18348.97 },
//     ],
//     total: 9200 + 18400,
//   },
// };

// // ✅ Custom label renderer
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   name,
//   value,
// }) => {
//   const RADIAN = Math.PI / 180;
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="black"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//       fontSize={11}
//     >
//       {`${name}: $${value} (${(percent * 100).toFixed(1)}%)`}
//     </text>
//   );
// };

// // ✅ Center label (dynamic, uses Pie's viewBox)
// const CenterLabel = ({ viewBox, total }) => {
//   const { cx, cy } = viewBox;
//   return (
//     <text
//       x={cx}
//       y={cy}
//       textAnchor="middle"
//       dominantBaseline="middle"
//       fontSize={14}
//       fontWeight="bold"
//     >
//       {`Total: $${total}`}
//     </text>
//   );
// };

// // Reusable Double Donut Chart Component
// const DoubleDonutChart = ({ title, data }) => (
//   <div className="flex flex-col items-center p-4 shadow rounded-2xl bg-white">
//     <h2 className="text-lg font-semibold mb-2">{title}</h2>
//     <PieChart width={600} height={500}>
//       {/* Inner ring = Individual */}
//       <Pie
//         data={data.individual}
//         cx="50%"
//         cy="50%"
//         innerRadius={60}
//         outerRadius={90}
//         paddingAngle={2}
//         dataKey="value"
//         label={renderCustomizedLabel}
//       >
//         {data.individual.map((entry, index) => (
//           <Cell key={`ind-${index}`} fill={COLORS_INDIVIDUAL[index]} />
//         ))}
//         {/* ✅ dynamic center label here */}
//         <Label
//           content={<CenterLabel total={data.total} />}
//           position="center"
//         />
//       </Pie>

//       {/* Outer ring = Family */}
//       <Pie
//         data={data.family}
//         cx="50%"
//         cy="50%"
//         innerRadius={100}
//         outerRadius={130}
//         paddingAngle={2}
//         dataKey="value"
//         label={renderCustomizedLabel}
//       >
//         {data.family.map((entry, index) => (
//           <Cell key={`fam-${index}`} fill={COLORS_FAMILY[index]} />
//         ))}
//       </Pie>

//       <Tooltip formatter={(value, name) => [`$${value}`, name]} />
//       <Legend />
//     </PieChart>
//   </div>
// );

// export default function ChartView() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//       <DoubleDonutChart title="Deductibles" data={chartData.deductibles} />
//       <DoubleDonutChart title="Out-of-Pocket" data={chartData.outOfPocket} />
//     </div>
//   );
// }






// "use client";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   LabelList,
//   ResponsiveContainer,
// } from "recharts";

// export default function DeductibleCharts() {
//   // ✅ Your exact data from screenshot
//   const deductibleData = [
//     {
//       name: "Individual (Total: $7500)",
//       Paid: 41.92,
//       Remaining: 7458.08,
//       Total: 7500,
//     },
//     {
//       name: "Family (Total: $15000)",
//       Paid: 41.92,
//       Remaining: 14958.08,
//       Total: 15000,
//     },
//   ];

//   const oopData = [
//     {
//       name: "Individual (Total: $9200)",
//       Paid: 51.03,
//       Remaining: 9148.97,
//       Total: 9200,
//     },
//     {
//       name: "Family (Total: $18400)",
//       Paid: 51.03,
//       Remaining: 18348.97,
//       Total: 18400,
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//       {/* Deductibles */}
//       <div className="bg-white shadow-md rounded-xl p-4">
//         <h2 className="font-semibold mb-3">
//           Individual/Family Year to Deductibles
//         </h2>
//         <ResponsiveContainer width="100%" height={220}>
//           <BarChart
//             data={deductibleData}
//             layout="vertical"
//             margin={{ top: 10, right: 40, left: 60, bottom: 10 }}
//           >
//             <XAxis type="number" domain={[0, "dataMax"]} hide />
//             <YAxis type="category" dataKey="name" />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="Paid" stackId="a" fill="#f87171">
//               <LabelList dataKey="Paid" position="insideLeft" formatter={(v) => `$${v}`} />
//             </Bar>
//             <Bar dataKey="Remaining" stackId="a" fill="#60a5fa">
//               <LabelList dataKey="Remaining" position="insideRight" formatter={(v) => `$${v}`} />
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Out-of-pocket */}
//       <div className="bg-white shadow-md rounded-xl p-4">
//         <h2 className="font-semibold mb-3">
//           Individual/Family Year to Out-of-Pocket
//         </h2>
//         <ResponsiveContainer width="100%" height={220}>
//           <BarChart
//             data={oopData}
//             layout="vertical"
//             margin={{ top: 10, right: 40, left: 60, bottom: 10 }}
//           >
//             <XAxis type="number" domain={[0, "dataMax"]} hide />
//             <YAxis type="category" dataKey="name" />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="Paid" stackId="b" fill="#f87171">
//               <LabelList dataKey="Paid" position="insideLeft" formatter={(v) => `$${v}`} />
//             </Bar>
//             <Bar dataKey="Remaining" stackId="b" fill="#60a5fa">
//               <LabelList dataKey="Remaining" position="insideRight" formatter={(v) => `$${v}`} />
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }







// "use client";
// import { RadialBarChart, RadialBar, Legend } from "recharts";

// export default function GaugeChart() {
//   const totalAmount = 1000;
//   const paidAmount = 650;
//   const percentage = Math.round((paidAmount / totalAmount) * 100);

//   const data = [
//     {
//       name: "Paid",
//       value: percentage,
//       fill: "#4CAF50", // green
//     },
//   ];

//   return (
//     <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-2xl w-[350px]">
//       <h2 className="text-lg font-semibold mb-2">Payment Overview</h2>

//       <RadialBarChart
//         width={300}
//         height={300}
//         innerRadius="70%"
//         outerRadius="100%"
//         barSize={20}
//         data={data}
//         startAngle={90}
//         endAngle={-270}
//       >
//         <RadialBar
//           minAngle={15}
//           clockWise
//           dataKey="value"
//           cornerRadius={10}
//         />
//         <Legend
//           iconSize={10}
//           layout="vertical"
//           verticalAlign="middle"
//           wrapperStyle={{ right: 20 }}
//         />
//       </RadialBarChart>

//       <div className="mt-[-180px] text-center">
//         <p className="text-3xl font-bold text-green-600">{percentage}%</p>
//         <p className="text-sm text-gray-500">
//           Paid: ₹{paidAmount} / ₹{totalAmount}
//         </p>
//       </div>
//     </div>
//   );
// }


// import React from "react";

// import {
//   CircularGauge,
//   CircularGaugeLabels,
//   CircularGaugePointers
// } from "@progress/kendo-react-gauges";

// const GaugeChart = ({ title, total, paid }) => {
//   const percentage = (paid / total) * 100;

//   return (
//     <div className="bg-white rounded-xl shadow p-6 border border-slate-200 flex flex-col items-center">
//       <h3 className="text-lg font-semibold text-slate-700 mb-4">{title}</h3>
//       <CircularGauge
//         style={{ width: 300, height: 300 }}
//         scale={{
//           min: 0,
//           max: total,
//           majorUnit: total / 5,
//         }}
//       >
//         <CircularGaugePointers>
//           <CircularGaugePointers pointer value={paid} color="#f87171" />
//         </CircularGaugePointers>
//         <CircularGaugeLabels />
//       </CircularGauge>
//       <p className="text-slate-600 mt-2">
//         Paid: ${paid} / ${total}
//       </p>
//     </div>
//   );
// };

// export default function GaugeCharts() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50">
//       <GaugeChart title="Individual Deductible" total={7500} paid={41.92} />
//       <GaugeChart title="Family Deductible" total={15000} paid={41.92} />
//     </div>
//   );
// }


// "use client";
// import React from "react";
// import {
//   Chart,
//   ChartTitle,
//   ChartLegend,
//   ChartSeries,
//   ChartSeriesItem,
//   ChartSeriesLabels,
// } from "@progress/kendo-react-charts";
// import "hammerjs";

// const DeductiblePieChart = ({ title, total, paid, remaining }) => {
//   const data = [
//     { category: "Paid", value: paid, color: "#f87171" },
//     { category: "Remaining", value: remaining, color: "#38bdf8" },
//   ];

//   return (
//     <div className="bg-white rounded-xl shadow p-6 border border-slate-200">
//       <h3 className="text-lg font-semibold text-slate-700 mb-4">{title}</h3>
//       <Chart style={{ height: 400, width: "100%" }}>
//         <ChartTitle text={`Total: $${total}`} />
//         <ChartLegend position="bottom" orientation="horizontal" />
//         <ChartSeries>
//           <ChartSeriesItem
//             type="pie"
//             data={data}
//             categoryField="category"
//             field="value"
//             colorField="color"
//           >
//             <ChartSeriesLabels
//               color="#333"
//               background="transparent"
//               content={(e) => `$${e.value}`}
//             />
//           </ChartSeriesItem>
//         </ChartSeries>
//       </Chart>
//     </div>
//   );
// };

// export default function PieCharts() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50">
//       <DeductiblePieChart
//         title="Individual Year to Deductibles"
//         total={7500}
//         paid={41.92}
//         remaining={7458.08}
//       />
//       <DeductiblePieChart
//         title="Family Year to Deductibles"
//         total={15000}
//         paid={41.92}
//         remaining={14958.08}
//       />
//     </div>
//   );
// }


// "use client";
// import React from "react";
// import {
//   Chart,
//   ChartTitle,
//   ChartLegend,
//   ChartSeries,
//   ChartSeriesItem,
//   ChartSeriesLabels,
// } from "@progress/kendo-react-charts";
// import "hammerjs";

// const DeductibleChart = ({ title, total, paid, remaining }) => {
//   const data = [
//     { category: "Paid", value: paid, color: "#f87171" },
//     { category: "Remaining", value: remaining, color: "#38bdf8" },
//   ];

//   return (
//     <div className="bg-white rounded-xl shadow p-6 border border-slate-200">
//       <h3 className="text-lg font-semibold text-slate-700 mb-4">{title}</h3>
//       <Chart style={{ height: 400, width: "100%" }}>
//         <ChartTitle text={`Total: $${total}`} />
//         <ChartLegend position="bottom" orientation="horizontal" />
//         <ChartSeries>
//           <ChartSeriesItem
//             type="donut"
//             data={data}
//             categoryField="category"
//             field="value"
//             colorField="color"
//             holeSize={50} // makes the donut hole bigger
//           >
//             <ChartSeriesLabels
//               color="#333"
//               background="transparent"
//               content={(e) => `$${e.value}`}
//             />
//           </ChartSeriesItem>
//         </ChartSeries>
//       </Chart>
//     </div>
//   );
// };

// export default function CircleCharts() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50">
//       <DeductibleChart
//         title="Individual Year to Deductibles"
//         total={7500}
//         paid={41.92}
//         remaining={7458.08}
//       />
//       <DeductibleChart
//         title="Family Year to Deductibles"
//         total={15000}
//         paid={41.92}
//         remaining={14958.08}
//       />
//     </div>
//   );
// }


// "use client";
// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LabelList,
// } from "recharts";

// const data = [
//   { name: "Deductible", total: 2500, paid: 1200 },
//   { name: "Out-of-Pocket", total: 4000, paid: 2000 },
// ];

// export default function DeductibleChart() {
//   return (
//     <div className="p-6 bg-slate-50 min-h-screen">
//       <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 max-w-7xl mx-auto">
//         <h2 className="text-xl font-semibold mb-6 text-slate-700 text-center">
//           Benefits Overview
//         </h2>

//         {/* Info Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
//           {data.map((item) => (
//             <div
//               key={item.name}
//               className="p-4 border border-slate-200 rounded-xl bg-slate-50 shadow-sm"
//             >
//               <h3 className="text-sm font-semibold text-slate-500 mb-2">
//                 {item.name}
//               </h3>
//               <p className="text-slate-700">
//                 <span className="font-bold text-blue-600">
//                   Paid: ${item.paid}
//                 </span>{" "}
//                 / <span className="text-slate-600">Total: ${item.total}</span>
//               </p>
//               <div className="w-full bg-slate-200 h-2 rounded mt-2">
//                 <div
//                   className="h-2 rounded bg-blue-500"
//                   style={{ width: `${(item.paid / item.total) * 100}%` }}
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Chart */}
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data} barSize={60}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />

//             {/* Total */}
//             <Bar dataKey="total" fill="#cbd5e1" radius={[8, 8, 0, 0]} />

//             {/* Paid */}
//             <Bar dataKey="paid" fill="#3b82f6" radius={[8, 8, 0, 0]}>
//               <LabelList dataKey="paid" position="top" />
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }


// "use client";
// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LabelList,
// } from "recharts";

// const data = [
//   {
//     name: "Individual (Total: $7500)",
//     paid: 41.92,
//     remaining: 7458.08,
//   },
//   {
//     name: "Family (Total: $15000)",
//     paid: 41.92,
//     remaining: 14958.08,
//   },
// ];

// const data2 = [
//   {
//     name: "Individual (Total: $9200)",
//     paid: 51.03,
//     remaining: 9148.97,
//   },
//   {
//     name: "Family (Total: $18400)",
//     paid: 51.03,
//     remaining: 18348.97,
//   },
// ];

// export default function BenefitChart() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50">
//       {/* Deductibles */}
//       <div className="bg-white rounded-xl shadow p-4 border border-slate-200">
//         <h3 className="text-md font-semibold text-slate-700 mb-4">
//           Individual/Family Year to Deductibles
//         </h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart
//             data={data}
//             layout="vertical"
//             margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
//           >
//             <XAxis type="number" domain={[0, 7500]} tickFormatter={(v) => `${v}`} />
//             <YAxis type="category" dataKey="name" width={200} />
//             <Tooltip />
//             <Legend />

//             {/* Paid */}
//             <Bar dataKey="paid" stackId="a" fill="#f87171">
//               <LabelList dataKey="paid" position="inside" formatter={(v) => `$${v}`} />
//             </Bar>

//             {/* Remaining */}
//             <Bar dataKey="remaining" stackId="a" fill="#38bdf8">
//               <LabelList dataKey="remaining" position="insideRight" formatter={(v) => `$${v}`} />
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Out of Pocket */}
//       <div className="bg-white rounded-xl shadow p-4 border border-slate-200">
//         <h3 className="text-md font-semibold text-slate-700 mb-4">
//           Individual/Family Year to Out-of-Pocket
//         </h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart
//             data={data2}
//             layout="vertical"
//             margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
//           >
//             <XAxis type="number" domain={[0, 9200]} tickFormatter={(v) => `${v}`} />
//             <YAxis type="category" dataKey="name" width={200} />
//             <Tooltip />
//             <Legend />

//             {/* Paid */}
//             <Bar dataKey="paid" stackId="a" fill="#f87171">
//               <LabelList dataKey="paid" position="inside" formatter={(v) => `$${v}`} />
//             </Bar>

//             {/* Remaining */}
//             <Bar dataKey="remaining" stackId="a" fill="#38bdf8">
//               <LabelList dataKey="remaining" position="insideRight" formatter={(v) => `$${v}`} />
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }







//kendo ui
// import React from "react";
// import {
//   Chart,
//   ChartSeries,
//   ChartSeriesItem,
//   ChartSeriesLabels,
//   ChartTitle,
// } from "@progress/kendo-react-charts";

// // ✅ Full Component in ONE file
// const CircleCharts = () => {
//   // Example data
//   const deductibleData = [
//     { label: "Individual", total: 7500, paid: 41.92, remaining: 7458.08 },
//     { label: "Family", total: 15000, paid: 41.92, remaining: 14958.08 },
//   ];

//   const oopData = [
//     { label: "Individual", total: 9200, paid: 51.03, remaining: 9148.97 },
//     { label: "Family", total: 18400, paid: 51.03, remaining: 18348.97 },
//   ];

//   // 🔹 Reusable render function for each dataset
//   const renderCharts = (data, title) => (
//     <div className="bg-white shadow-md rounded-xl p-4">
//       <h2 className="text-lg font-bold mb-4">{title}</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {data.map((item, index) => {
//           const chartData = [
//             { category: "Paid Amount", value: item.paid, color: "#FF6B6B" },
//             { category: "Remaining Amount", value: item.remaining, color: "#4DB6AC" },
//           ];

//           return (
//             <div key={index} style={{ width: "100%", height: "350px" }}>
//               <Chart style={{ width: "100%", height: "100%" }}>
//                 <ChartTitle text={`${item.label} (Total: $${item.total})`} />
//                 <ChartSeries>
//                   <ChartSeriesItem
//                     type="donut"
//                     data={chartData}
//                     field="value"
//                     categoryField="category"
//                     colorField="color"
//                   >
//                     <ChartSeriesLabels
//                       visible={true}
//                       background="transparent"
//                       content={(e) => `$${e.value.toFixed(2)}`}
//                     />
//                   </ChartSeriesItem>
//                 </ChartSeries>
//               </Chart>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );

//   return (
//     <div className="space-y-8 p-6">
//       {renderCharts(deductibleData, "Individual/Family Year to Deductibles")}
//       {renderCharts(oopData, "Individual/Family Year to Out-of-Pocket")}
//     </div>
//   );
// };

// export default CircleCharts;




























// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Label,
//   LabelList,
// } from "recharts";

// // ✅ Example Data
// const deductibleData = [
//   { label: "Individual", total: 7500, paid: 4100.92, remaining: 3399.08 },
//   { label: "Family", total: 15000, paid: 41.92, remaining: 14958.08 },
// ];

// const oopData = [
//   { label: "Individual", total: 9200, paid: 51.03, remaining: 9148.97 },
//   { label: "Family", total: 18400, paid: 51.03, remaining: 18348.97 },
// ];

// // ✅ Colors
// const COLORS = ["#FF6B6B", "#4DB6AC"];

// // ✅ Reusable Multi-Ring Donut Chart
// const MultiDonutChart = ({ title, data }) => {
//   const individualData = [
//     { name: "Paid Amount", value: data[0].paid },
//     { name: "Remaining Amount", value: data[0].remaining },
//   ];
//   const familyData = [
//     { name: "Paid Amount", value: data[1].paid },
//     { name: "Remaining Amount", value: data[1].remaining },
//   ];

//   return (
//     <div style={{ width: "100%", height: 400 }}>
//       <h2 className="text-center font-bold mb-4">{title}</h2>
//       <ResponsiveContainer>
//         <PieChart>
//           {/* Inner Ring → Individual */}
//           <Pie
//             data={individualData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             innerRadius={60}
//             outerRadius={100}
//             label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
//           >
//             <Label
//               value={`Individual Total: $${data[0].total}`}
//               position="centerTop"
//               style={{ fontSize: "14px", fontWeight: "bold" }}
//             />
//             {individualData.map((entry, index) => (
//               <Cell key={`ind-${index}`} fill={COLORS[index]} />
//             ))}
//           </Pie>

//           {/* Outer Ring → Family */}
//           <Pie
//             data={familyData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             innerRadius={110}
//             outerRadius={150}
//             label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
//           >
//             <Label
//               value={`Family Total: $${data[1].total}`}
//               position="centerBottom"
//               style={{ fontSize: "14px", fontWeight: "bold" }}
//             />
//             {familyData.map((entry, index) => (
//               <Cell key={`fam-${index}`} fill={COLORS[index]} />
//             ))}
//           </Pie>

//           <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// // ✅ Main Component
// const CircleCharts = () => {
//   return (
//     <div className="space-y-10 p-6">
//       <MultiDonutChart
//         title="Individual/Family Year to Deductibles"
//         data={deductibleData}
//       />
//       <MultiDonutChart
//         title="Individual/Family Year to Out-of-Pocket"
//         data={oopData}
//       />
//     </div>
//   );
// };

// export default CircleCharts;






// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Label,
// } from "recharts";

// // ✅ Example Data
// const deductibleData = [
//   { label: "Individual", total: 7500, paid: 4100.92, remaining: 3399.08 },
//   { label: "Family", total: 15000, paid: 41.92, remaining: 14958.08 },
// ];

// const oopData = [
//   { label: "Individual", total: 9200, paid: 51.03, remaining: 9148.97 },
//   { label: "Family", total: 18400, paid: 51.03, remaining: 18348.97 },
// ];

// // ✅ Colors
// const COLORS = ["#FF6B6B", "#4DB6AC"];

// // ✅ Reusable Donut Chart
// const DonutChart = ({ item }) => {
//   const data = [
//     { name: "Paid Amount", value: item.paid },
//     { name: "Remaining Amount", value: item.remaining },
//   ];

//   return (
//     <div style={{ width: "100%", height: 300 }}>
//       <h3 className="text-center font-semibold mb-2">
//         {item.label} (Total: ${item.total})
//       </h3>
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             innerRadius={70}
//             outerRadius={100}
//             label={({ name, value }) => `$${value.toFixed(2)}`}
//           >
//             {/* ✅ Center Label here */}
//             <Label
//               value={`Total: $${item.total}`}
//               position="center"
//               style={{ fontSize: "16px", fontWeight: "bold" }}
//             />
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index]} />
//             ))}
//           </Pie>
//           <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// // ✅ Main Component
// const CircleCharts = () => {
//   return (
//     <div className="space-y-10 p-6">
//       {/* Deductibles */}
//       <div>
//         <h2 className="text-lg font-bold mb-4">
//           Individual/Family Year to Deductibles
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {deductibleData.map((item, i) => (
//             <DonutChart key={i} item={item} />
//           ))}
//         </div>
//       </div>

//       {/* Out-of-Pocket */}
//       <div>
//         <h2 className="text-lg font-bold mb-4">
//           Individual/Family Year to Out-of-Pocket
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {oopData.map((item, i) => (
//             <DonutChart key={i} item={item} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CircleCharts;

// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Label,
//   LabelList,
// } from "recharts";

// // ✅ Data
// const deductibleData = [
//   { name: "Individual Paid", value: 41.92, color: "#FF6B6B" },
//   { name: "Individual Remaining", value: 7458.08, color: "#4DB6AC" },
//   { name: "Family Paid", value: 41.92, color: "#FF8A65" },
//   { name: "Family Remaining", value: 14958.08, color: "#81C784" },
// ];

// const oopData = [
//   { name: "Individual Paid", value: 51.03, color: "#FF6B6B" },
//   { name: "Individual Remaining", value: 9148.97, color: "#4DB6AC" },
//   { name: "Family Paid", value: 51.03, color: "#FF8A65" },
//   { name: "Family Remaining", value: 18348.97, color: "#81C784" },
// ];

// // ✅ Reusable Donut Chart with Totals in center
// const DonutChart = ({ title, data }) => {
//   // Split data
//   const individualData = data.slice(0, 2);
//   const familyData = data.slice(2);

//   const individualTotal = individualData.reduce((a, b) => a + b.value, 0);
//   const familyTotal = familyData.reduce((a, b) => a + b.value, 0);

//   return (
//     <div style={{ width: "100%", height: 400 }}>
//       <h2 className="text-center font-bold mb-4">{title}</h2>
//       <ResponsiveContainer>
//         <PieChart>
//           {/* Inner Ring → Individual */}
//           <Pie
//             data={individualData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             innerRadius={50}
//             outerRadius={90}
//           >
//             {individualData.map((entry, index) => (
//               <Cell key={index} fill={entry.color} />
//             ))}
//             {/* ✅ Total inside inner ring */}
//             <Label
//               value={`$${individualTotal.toFixed(0)}`}
//               position="centerTop"
//               style={{ fontSize: "14px", fontWeight: "bold" }}
//             />
//           </Pie>

//           {/* Outer Ring → Family */}
//           <Pie
//             data={familyData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             innerRadius={100}
//             outerRadius={140}
//           >
//             {familyData.map((entry, index) => (
//               <Cell key={index} fill={entry.color} />
//             ))}
//             {/* ✅ Total inside outer ring */}
//             <Label
//               value={`$${familyTotal.toFixed(0)}`}
//               position="centerBottom"
//               style={{ fontSize: "14px", fontWeight: "bold" }}
//             />
//             {/* Optional: show labels outside to avoid overlap */}
//             <LabelList
//               dataKey="name"
//               position="outside"
//               formatter={(val, entry) => `${entry.payload.name}: $${entry.payload.value.toFixed(2)}`}
//             />
//           </Pie>

//           <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// // ✅ Main Component
// const CircleCharts = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
//       <DonutChart
//         title="Individual/Family Year to Deductibles"
//         data={deductibleData}
//       />
//       <DonutChart
//         title="Individual/Family Year to Out-of-Pocket"
//         data={oopData}
//       />
//     </div>
//   );
// };

// export default CircleCharts;


// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Label,
//   LabelList,
// } from "recharts";

// // ✅ Data
// const deductibleData = [
//   { name: "Individual Paid", value: 41.92, color: "#FF6B6B" },
//   { name: "Individual Remaining", value: 7458.08, color: "#4DB6AC" },
//   { name: "Family Paid", value: 41.92, color: "#FF8A65" },
//   { name: "Family Remaining", value: 14958.08, color: "#81C784" },
// ];

// const oopData = [
//   { name: "Individual Paid", value: 51.03, color: "#FF6B6B" },
//   { name: "Individual Remaining", value: 9148.97, color: "#4DB6AC" },
//   { name: "Family Paid", value: 51.03, color: "#FF8A65" },
//   { name: "Family Remaining", value: 18348.97, color: "#81C784" },
// ];

// // ✅ Reusable Donut Chart with Totals + Labels
// const DonutChart = ({ title, data }) => {
//   const individualData = data.slice(0, 2);
//   const familyData = data.slice(2);

//   const individualTotal = individualData.reduce((a, b) => a + b.value, 0);
//   const familyTotal = familyData.reduce((a, b) => a + b.value, 0);

//   // ✅ Format labels nicely
//   const formatLabel = (val, entry, total) => {
//     const percent = ((entry.value / total) * 100).toFixed(1);
//     return `${entry.name}: $${val.toFixed(2)} (${percent}%)`;
//   };

//   return (
//     <div style={{ width: "100%", height: 450 }}>
//       <h2 className="text-center font-bold mb-4">{title}</h2>
//       <ResponsiveContainer>
//         <PieChart>
//           {/* Inner Ring → Individual */}
//           <Pie
//             data={individualData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             innerRadius={60}
//             outerRadius={100}
//           >
//             {individualData.map((entry, i) => (
//               <Cell key={i} fill={entry.color} />
//             ))}
//             {/* ✅ Total label */}
//             <Label
//               value={`Individual $${individualTotal.toFixed(0)}`}
//               position="centerTop"
//               style={{ fontSize: "14px", fontWeight: "bold" }}
//             />
//             <LabelList
//               position="outside"
//               formatter={(val, entry) =>
//                 formatLabel(val, entry, individualTotal)
//               }
//             />
//           </Pie>

//           {/* Outer Ring → Family */}
//           <Pie
//             data={familyData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             innerRadius={110}
//             outerRadius={150}
//           >
//             {familyData.map((entry, i) => (
//               <Cell key={i} fill={entry.color} />
//             ))}
//             {/* ✅ Total label */}
//             <Label
//               value={`Family $${familyTotal.toFixed(0)}`}
//               position="centerBottom"
//               style={{ fontSize: "14px", fontWeight: "bold" }}
//             />
//             <LabelList
//               position="outside"
//               formatter={(val, entry) => formatLabel(val, entry, familyTotal)}
//             />
//           </Pie>

//           <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// // ✅ Main Component
// const CircleCharts = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
//       <DonutChart
//         title="Individual/Family Year to Deductibles"
//         data={deductibleData}
//       />
//       <DonutChart
//         title="Individual/Family Year to Out-of-Pocket"
//         data={oopData}
//       />
//     </div>
//   );
// };

// export default CircleCharts;

// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Label,
//   LabelList,
// } from "recharts";

// // ✅ Data
// const deductibleData = [
//   { name: "Individual Paid", value: 41.92, color: "#FF6B6B" },
//   { name: "Individual Remaining", value: 7458.08, color: "#4DB6AC" },
//   { name: "Family Paid", value: 41.92, color: "#FF8A65" },
//   { name: "Family Remaining", value: 14958.08, color: "#81C784" },
// ];

// const oopData = [
//   { name: "Individual Paid", value: 51.03, color: "#FF6B6B" },
//   { name: "Individual Remaining", value: 9148.97, color: "#4DB6AC" },
//   { name: "Family Paid", value: 51.03, color: "#FF8A65" },
//   { name: "Family Remaining", value: 18348.97, color: "#81C784" },
// ];

// // ✅ Reusable Donut Chart
// const DonutChart = ({ title, data }) => {
//   const individualData = data.slice(0, 2);
//   const familyData = data.slice(2);

//   const individualTotal = individualData.reduce((a, b) => a + b.value, 0);
//   const familyTotal = familyData.reduce((a, b) => a + b.value, 0);

//   // ✅ Format labels → "Paid: $41.92"
//   const formatLabel = (val, entry) => `${entry.name}: $${val.toFixed(2)}`;

//   return (
//     <div style={{ width: "100%", height: 450 }}>
//       <h2 className="text-center font-bold mb-4">{title}</h2>
//       <ResponsiveContainer>
//         <PieChart>
//           {/* Inner Ring → Individual */}
//           <Pie
//             data={individualData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             innerRadius={60}
//             outerRadius={100}
//           >
//             {individualData.map((entry, i) => (
//               <Cell key={i} fill={entry.color} />
//             ))}
//             <Label
//               value={`Individual $${individualTotal.toFixed(0)}`}
//               position="centerTop"
//               style={{ fontSize: "14px", fontWeight: "bold" }}
//             />
//             <LabelList
//               position="outside"
//               formatter={(val, entry) => formatLabel(val, entry)}
//             />
//           </Pie>

//           {/* Outer Ring → Family */}
//           <Pie
//             data={familyData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             innerRadius={110}
//             outerRadius={150}
//           >
//             {familyData.map((entry, i) => (
//               <Cell key={i} fill={entry.color} />
//             ))}
//             <Label
//               value={`Family $${familyTotal.toFixed(0)}`}
//               position="centerBottom"
//               style={{ fontSize: "14px", fontWeight: "bold" }}
//             />
//             <LabelList
//               position="outside"
//               formatter={(val, entry) => formatLabel(val, entry)}
//             />
//           </Pie>

//           <Tooltip formatter={(val) => `$${val.toFixed(2)}`} />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// // ✅ Main Component
// const CircleCharts = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
//       <DonutChart
//         title="Individual/Family Year to Deductibles"
//         data={deductibleData}
//       />
//       <DonutChart
//         title="Individual/Family Year to Out-of-Pocket"
//         data={oopData}
//       />
//     </div>
//   );
// };

// export default CircleCharts;

