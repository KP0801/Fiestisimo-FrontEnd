import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ChartComponentLineal = () => {
  const data = [
    { name: "Enero", ventas: 12 },
    { name: "Febrero", ventas: 19 },
    { name: "Marzo", ventas: 3 },
    { name: "Abril", ventas: 5 },
    { name: "Mayo", ventas: 2 },
  ];

  return (
    <LineChart
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
      <Line type="monotone" dataKey="ventas" stroke="#8884d8" />
    </LineChart>
  );
};

export default ChartComponentLineal;
