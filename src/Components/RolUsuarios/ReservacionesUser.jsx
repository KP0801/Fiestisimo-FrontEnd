import { useState, useEffect } from "react";
import axios from "axios";
import Alerta from "../Alerta";

const ReservacionesUser = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [check, setCheck] = useState(false);
  const [alerta, setAlerta] = useState({});
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
          `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/reservations/`,
          config
        );
        console.log("RESERVACIONES DE USUARIO", data);
        setReservaciones(data);
      } catch (error) {
        console.log(error);
      }
    };
    getReservaciones();
  }, [check]);

  const cancelarRes = async (id) => {
    await deleteRes(id);
  };

  const deleteRes = async (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/reservations/${id}`,
        config
      );
      console.log(data);
      setAlerta({
        msg: "Reservacion Cancelada",
        error: false,
      });
      setCheck(!check);
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response.data.error,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="container">
      {msg && <Alerta alerta={alerta} />}
      {reservaciones.length > 0 ? (
        <table className="w-full bg-white shadow-md table-auto">
          <thead className="bg-sky-700 text-white">
            <tr>
              <th className="py-3 px-6">Nombre del Producto reservado</th>
              <th className="py-3 px-6">Categoria de Producto</th>
              <th className="py-3 px-6">Fecha de reservacion</th>
              <th className="py-3 px-6">Total a pagar</th>
              <th className="py-3 px-6">Estado</th>
              <th className="py-3 px-6">Accion</th>
            </tr>
          </thead>
          <tbody>
            {reservaciones.map((res) => (
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
                <td className="border px-6 py-4 text-sm font-semibold text-center uppercase">
                  {res.status}
                </td>
                <td className="border px-6 py-4 justify-center flex">
                  <button
                    onClick={() => cancelarRes(res.reservationId)}
                    className="text-white bg-red-500 hover:bg-red-600 font-semibold py-2 px-4 rounded-sm shadow cursor-pointer"
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10 text-gray-800 font-bold text-xl uppercase">
          No hay reservaciones pendientes
        </p>
      )}
    </div>
  );
};

export default ReservacionesUser;
