import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Alerta from "../../Components/Alerta";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RecoverPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let regexEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let regexContra = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

    if ([newPassword, email].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
    }

    if (!regexEmail.test(email.trim())) {
      setAlerta({
        msg: 'El campo "correo usuario" es inválido, ejem: alguien@algunlugar.es',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
      return;
    }

    if (!regexContra.test(newPassword.trim())) {
      setAlerta({
        msg: "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
      return;
    }

    try {
      const response = axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/login/`,
        {
          email,
          newPassword,
        }
      );
      console.log(response);
      toast.success("Contraseña restablecida Exitosamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setAlerta({});
      setEmail("");
      setNewPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const { msg } = alerta;

  return (
    <div className="container mx-auto md:w-2/3 lg:w-2/5 mb-10 mt-20">
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restablece tu contraseña y no pierdas{" "}
        <span className="text-slate-700">Tus Pedidos</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}
      <ToastContainer position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="my-20 bg-white p-10 shadow rounded-lg"
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-800 block text-xl font-bold"
            htmlFor="email"
          >
            Correo Usuario
          </label>
          <input
            type="email"
            placeholder="Escribe tu correo"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-800 block text-xl font-bold"
            htmlFor="nuevo-password"
          >
            Nuevo Password
          </label>
          <input
            type="password"
            placeholder="Escribe tu nueva contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="nuevo-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Guardar Nuevo Password"
          className="p-3 bg-sky-700 shadow w-full rounded-lg text-xl uppercase font-bold text-white hover:cursor-pointer hover:bg-sky-900 transition-colors"
        />
      </form>
      <Link
        className="block text-center my-2 text-slate-500 uppercase text-sm"
        to="/login"
      >
        Inicia Sesion
      </Link>
    </div>
  );
};

export default RecoverPassword;
