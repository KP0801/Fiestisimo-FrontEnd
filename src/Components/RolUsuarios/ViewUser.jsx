import { useState } from "react";
import axios from "axios";
import Alerta from "../Alerta";
import { Howl } from "howler";

const ViewUser = ({ user, setCheck, check }) => {
  const [btn1, setBtn1] = useState(false);
  const [btn2, setBtn2] = useState(false);
  const [alerta, setAlerta] = useState({});
  const sound = new Howl({
    src: ["/audio/notificacion.mp3"],
  });

  const removeAccount = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/managementUser/${id}`,
        config
      );
      console.log(data);
      setBtn1(true);
      setCheck(!check);
      setAlerta({
        msg: data.message,
        error: false,
      });
      sound.play();
    } catch (error) {
      setAlerta({
        msg: error.response.data.message,
        error: true,
      });
    }
  };

  const newAdmin = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/managementUser/${id}`,
        config
      );
      console.log(data);
      setBtn2(true);
      setCheck(!check);
      setAlerta({
        msg: data.message,
        error: false,
      });
      sound.play();
    } catch (error) {
      setAlerta({
        msg: error.response.data.message,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  const handleClickRemove = async (id) => {
    await removeAccount(id);
  };

  const handleClickUp = async (id) => {
    await newAdmin(id);
  };

  return (
    <div className="p-3">
      {msg && <Alerta alerta={alerta} />}
      <img
        src="/assets/Perfil.jpg"
        alt={`Perfil${user.name}`}
        className="w-full h-auto rounded-tr-lg rounded-tl-lg shadow-md"
      />
      <div className="mt-3 text-center">
        <p className="text-gray-700 font-bold text-base mt-2">
          <span className="text-black font-bold text-base mt-2">Nombre: </span>{" "}
          {user.name}
        </p>
        <p className="text-gray-700 font-bold text-base mt-2">
          <span className="text-black font-bold text-base mt-2">Correo: </span>{" "}
          {user.email}
        </p>
        <p className="text-gray-700 font-bold text-base mt-2">
          <span className="text-black font-bold text-base mt-2">Tel: </span>{" "}
          {user.phone}
        </p>
      </div>
      <div className="mt-5 flex justify-around">
        <button
          onClick={() => handleClickRemove(user.id_user)}
          className="p-3 bg-red-600 text-white font-bold text-base hover:bg-red-800 rounded-md"
        >
          {!btn1 ? "Desactivar Cuenta" : "Cuenta Desactivada"}
        </button>
        <button
          onClick={() => handleClickUp(user.id_user)}
          className="p-3 bg-sky-600 text-white font-bold text-base hover:bg-sky-800 rounded-md"
        >
          {!btn2 ? "Hacer Administrador" : "Nuevo Administrador"}
        </button>
      </div>
    </div>
  );
};

export default ViewUser;
