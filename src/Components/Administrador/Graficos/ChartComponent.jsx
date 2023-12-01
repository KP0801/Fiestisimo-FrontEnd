import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ChartComponent = () => {
  const data = [
    { name: "Enero", ventas: 12 },
    { name: "Febrero", ventas: 19 },
    { name: "Marzo", ventas: 3 },
    { name: "Abril", ventas: 5 },
    { name: "Mayo", ventas: 2 },
  ];

  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="ventas" fill="#8884d8" />
    </BarChart>
  );
};

export default ChartComponent;
