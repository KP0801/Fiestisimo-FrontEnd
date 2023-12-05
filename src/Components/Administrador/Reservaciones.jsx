import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal";
import Alerta from "../Alerta";
import { IoEyeSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

const Reservaciones = () => {
  const [reser, setReser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [actualizar, setActualizar] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [alerta, setAlerta] = useState({});
  const [check, setCheck] = useState(false);
  const [cliente, setCliente] = useState(null);
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [nombre, setNombre] = useState("");
  const [tel, setTel] = useState("");
  const [modal1, setModal1] = useState(false);

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
          `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/reservations/all`,
          config
        );
        console.log("RESERVACIONES DE USUARIO", data);
        setReser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getReservaciones();
  }, [check]);

  console.log("RESER ADMIN", reser);

  const handleEdit = (res) => {
    setActualizar(res);
    setShowModal(true);
    setEditMode(true);
    setDeadline(new Date(res.deadline).toISOString().split("T")[0]);
    setStatus(res.status);
    setId(res.reservationId);
  };

  const handleCliwnt = (res) => {
    setCliente(res);
    setModal1(true);
    setProducto(res.productName);
    setPrecio(res.price);
    setCantidad(res.amount);
    setNombre(res.user.name);
    setTel(res.user.phone);
  };

  const ActualizarEstados = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];
    if (deadline < currentDate) {
      setAlerta({
        msg: "La fecha de actualización no puede ser anterior a la fecha actual.",
        error: true,
      });
      return;
    }
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/reservations/${id}`,
        { status, deadline },
        config
      );
      console.log(data);
      setAlerta({
        msg: "Reservacion Actualizada",
        error: false,
      });
      setCheck(!check);
    } catch (error) {
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
      <Modal Visible={showModal} Close={() => setShowModal(false)}>
        {actualizar && (
          <div className="p-2 w-full h-auto gap-5">
            <form onSubmit={ActualizarEstados}>
              <div className="flex justify-around">
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="bg-gray-100 rounded-sm mt-3 px-4 focus:outline-none focus:ring focus:ring-blue-200 border-gray-100 py-2 shadow-md"
                />
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-gray-100 rounded-sm mt-3 px-4 focus:outline-none focus:ring focus:ring-blue-200 border-gray-100 py-2 shadow-md"
                >
                  <option value="">Selecciona...</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="finalizado">Finalizado</option>
                  <option value="en preparacion">En Preparación</option>
                  <option value="cancelada">Cancelada</option>
                </select>
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 rounded-md text-white py-2 px-6 text-base font-semibold shadow"
                >
                  Editar
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
      <Modal Visible={modal1} Close={() => setModal1(false)}>
        {cliente && (
          <div className="p-2 w-full h-auto gap-5 bg-white shadow-md rounded-md">
            <p className="text-lg font-bold uppercase text-sky-700 text-center mb-5">
              Informacion de la reservacion
            </p>
            <div className="mt-3 text-center">
              <p className="text-gray-700 font-bold text-base">
                Nombre de cliente:{" "}
                <span className="text-sky-800">{nombre}</span>
              </p>
            </div>
            <div className="mt-3 text-center">
              <p className="text-gray-700 font-bold text-base">
                Telefono de cliente: <span className="text-sky-800">{tel}</span>
              </p>
            </div>
            <div className="mt-3 text-center">
              <p className="text-gray-700 font-bold text-base">
                Nombre de producto:{" "}
                <span className="text-sky-800">{producto}</span>
              </p>
            </div>
            <div className="mt-3 text-center">
              <p className="text-gray-700 font-bold text-base">
                Cantidad de producto:{" "}
                <span className="text-sky-800">{cantidad}</span>
              </p>
            </div>
            <div className="mt-3 text-center">
              <p className="text-gray-700 font-bold text-base">
                Total a pagar: <span className="text-sky-800">{precio}</span>
              </p>
            </div>
          </div>
        )}
      </Modal>
      {reser.length > 0 ? (
        <table className="w-full bg-white shadow-md table-auto">
          <thead className="bg-sky-700 text-white">
            <tr>
              <th className="py-3 px-6">Nombre del Producto</th>
              <th className="py-3 px-6">Categoria de Producto</th>
              <th className="py-3 px-6">Fecha de reservacion</th>
              <th className="py-3 px-6">Total a pagar</th>
              <th className="py-3 px-6">Estado</th>
              <th className="py-3 px-6">Accion</th>
            </tr>
          </thead>
          <tbody>
            {reser.map((res) => (
              <tr
                className={`border-b ${
                  res.status === "cancelada" ? "bg-red-300" : ""
                } ${res.status === "finalizado" ? "bg-purple-300" : ""} ${
                  res.status === "en preparacion" ? "bg-green-300" : ""
                }`}
                key={res.reservationId}
              >
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
                <td className="border px-6 py-4 text-sm font-semibold text-cente flex justify-around items-center gap-3">
                  <CiEdit
                    className=" hover:text-sky-500 hover:underline cursor-pointer"
                    onClick={() => handleEdit(res)}
                    size={25}
                  />
                  <IoEyeSharp
                    className=" hover:text-sky-500 hover:underline cursor-pointer"
                    onClick={() => handleCliwnt(res)}
                    size={25}
                  />
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

export default Reservaciones;
