import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const TopProductsChart = ({ data }) => {
  return (
    <BarChart
      width={600}
      height={400}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="productName" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="ventas" fill="#8884d8" />
    </BarChart>
  );
};

export default TopProductsChart;
