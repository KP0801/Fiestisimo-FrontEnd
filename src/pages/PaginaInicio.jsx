import ChartComponent from "../Components/Administrador/Graficos/ChartComponent";
import ChartComponentLineal from "../Components/Administrador/Graficos/ChartComponentLineal";
import TopProductsChart from "../Components/Administrador/Graficos/TopProductsChart ";
const PaginaInicio = () => {
  const topProductsData = [
    { productName: "Postres", ventas: 25 },
    { productName: "Pasteles", ventas: 18 },
    { productName: "Arreglos", ventas: 30 },
    { productName: "Desayunos", ventas: 22 },
  ];

  const topProductsData2 = [
    { productName: "Pastel tres leches", ventas: 250 },
    { productName: "Arreglo de doce flores", ventas: 500 },
    { productName: "Desayuno Premium", ventas: 200 },
    { productName: "Postre Frances", ventas: 450 },
  ];

  return (
    <div className="w-full h-auto grid grid-cols-2 gap-10 cursor-pointer">
      <div>
        <p className="text-2xl text-gray-700 font-bold flex justify-center mb-5">
          Ventas de cada mes
        </p>
        <ChartComponent />
      </div>
      <div>
        <p className="text-2xl text-gray-700 flex font-bold justify-center mb-5">
          Seguimiento de Ventas
        </p>
        <ChartComponentLineal />
      </div>
      <div>
        <p className="text-2xl text-gray-700 flex font-bold justify-center mb-5">
          Productos mas vendidos
        </p>
        <TopProductsChart data={topProductsData} />
      </div>
      <div>
        <p className="text-2xl text-gray-700 flex font-bold justify-center mb-5">
          Productos con mayor precio
        </p>
        <TopProductsChart data={topProductsData2} />
      </div>
    </div>
  );
};

export default PaginaInicio;
