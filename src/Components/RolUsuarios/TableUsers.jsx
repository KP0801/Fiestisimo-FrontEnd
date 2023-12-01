import Modal from "../Modal";
import { useState } from "react";
import ViewUser from "./ViewUser";
import axios from "axios";
const TableUsers = ({ check, setCheck, currentUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});

  const getUser = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/fiestisimo/managementUser/user/${id}`,
        config
      );
      console.log("USUARIOS", data.user);
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const viewUser = async (id) => {
    await getUser(id), setShowModal(true);
  };

  return (
    <div className="flex justify-center">
      <Modal Visible={showModal} Close={() => setShowModal(false)}>
        <ViewUser user={user} check={check} setCheck={setCheck} />
      </Modal>
      {currentUser.length > 0 ? (
        <div className="w-full">
          <table className="w-full bg-white shadow-md table-auto">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="py-3 px-6">Nombre</th>
                <th className="py-3 px-6">Correo</th>
                <th className="py-3 px-6">Telefono</th>
                <th className="py-3 px-6">Rol</th>
                <th className="py-3 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentUser.map((user) => (
                <tr className="border-b" key={user.id_user}>
                  <td className="border px-6 py-4 text-sm font-semibold">
                    {user.name}
                  </td>
                  <td className="border px-6 py-4 text-sm font-semibold">
                    {user.email}
                  </td>
                  <td className="border px-6 py-4 text-sm font-semibold">
                    {user.phone}
                  </td>
                  <td className="border px-6 py-4 text-sm font-semibold">
                    {user.role}
                  </td>
                  <td className="border px-6 py-4 text-sm font-semibold text-center">
                    <button
                      onClick={() => viewUser(user.id_user)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-800 text-4xl font-bold">
          No hay usuarios
        </p>
      )}
    </div>
  );
};

export default TableUsers;
