import { useState, useEffect } from "react";
import axios from "axios";

const ReservacionesFin = () => {
  const [resFin, setResFin] = useState([]);
  useEffect(() => {
    const getReservaciones = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/fiestisimo/reservations/finalizada`,
          config
        );
        console.log("RESERVACIONES FIN DE USUARIO", data);
        setResFin(data);
      } catch (error) {
        console.log(error);
      }
    };
    getReservaciones();
  }, []);

  return (
    <div className="container">
      {resFin.length > 0 ? (
        <table className="w-full bg-white shadow-md table-auto">
          <thead className="bg-sky-700 text-white">
            <tr>
              <th className="py-3 px-6">Nombre del Producto</th>
              <th className="py-3 px-6">Categoria de Producto</th>
              <th className="py-3 px-6">Fecha de reservacion</th>
              <th className="py-3 px-6">Total a pagar</th>
            </tr>
          </thead>
          <tbody>
            {resFin.map((res) => (
              <tr className="border-b" key={res.reservationId}>
                <td className="border px-6 py-4 text-sm font-semibold">
                  {res.productName}
                </td>
                <td className="border px-6 py-4 text-sm font-semibold text-center">
                  {res.category}
                </td>
                <td className="border px-6 py-4 text-sm font-semibold text-center">
                  {new Date(res.deadline).toLocaleDateString("es-ES")}
                </td>
                <td className="border px-6 py-4 text-sm font-semibold text-center">
                  {res.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10 text-gray-800 font-bold text-xl uppercase">
          No hay reservaciones canceladas
        </p>
      )}
    </div>
  );
};

export default ReservacionesFin;
