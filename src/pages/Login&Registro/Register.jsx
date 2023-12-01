import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { useState } from "react";
import Alerta from "../../Components/Alerta";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repitepassword, setRepitepassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let regexNombbre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let regexTel = /^\d{8}$/;
    let regexContra = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

    if ([name, email, phone, password, repitepassword].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatoios", error: true });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
      return;
    }

    if (!regexNombbre.test(name.trim())) {
      setAlerta({
        msg: 'El campo "nombre usuario" solo acepta letras y un espacio en blanco por cada nombre',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
      return;
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

    if (!regexTel.test(phone.trim())) {
      setAlerta({
        msg: 'El campo "telefono" es inválido, solo acepta un maximo de 8 numeros',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
      return;
    }

    if (!regexContra.test(password.trim())) {
      setAlerta({
        msg: "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
      return;
    }

    if (password != repitepassword) {
      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/registerUser/`,
        {
          name,
          email,
          phone,
          password,
        }
      );
      console.log("Respuesta Usuario", response);
      toast.success("Usuario Creado Exitosamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRepitepassword("");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.error,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <Link to="/" className="flex items-center gap-4 mt-10 mx-20">
        <AiFillHome size={30} />
        <p className="text-lg font-bold">Volver</p>
      </Link>
      <div className="container mx-auto md:w-2/3 lg:w-2/5 mb-10 mt-10">
        <h1 className="text-sky-600 font-black text-5xl capitalize">
          Registrate en nuestro Sitio{" "}
          <span className="text-slate-700">Pasteleria Fiestisimo</span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="my-20 bg-white p-10 shadow rounded-lg"
        >
          {msg && <Alerta alerta={alerta} />}
          <ToastContainer position="top-right" />
          <div className="my-5">
            <label
              className="uppercase text-gray-800 block text-xl font-bold"
              htmlFor="nombre"
            >
              Nombre Completo
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Escribe tu Nombre"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="nombre"
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-800 block text-xl font-bold"
              htmlFor="email"
            >
              Correo Electronico
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Escribe tu correo"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="email"
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-800 block text-xl font-bold"
              htmlFor="telefono"
            >
              Telefono
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Escribe tu telefono"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="telefono"
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-800 block text-xl font-bold"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Escribe tu Contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="password"
            />
          </div>

          <div className="my-5">
            <label
              className="uppercase text-gray-800 block text-xl font-bold"
              htmlFor="password2"
            >
              Repetir Contraseña
            </label>
            <input
              value={repitepassword}
              onChange={(e) => setRepitepassword(e.target.value)}
              type="password"
              placeholder="Repite tu Contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="password2"
            />
          </div>
          <input
            type="submit"
            value="Crear Cuenta"
            className="p-3 bg-sky-700 shadow w-full rounded-lg text-xl uppercase font-bold text-white hover:cursor-pointer hover:bg-sky-900 transition-colors"
          />
        </form>

        <nav className="lg:flex lg:justify-between ">
          <Link
            className="block text-center my-2 text-slate-500 uppercase text-sm"
            to="/login"
          >
            Ya tienes una Cuenta? Inicia Sesion
          </Link>
          <Link
            className="block text-center my-2 text-slate-500 uppercase text-sm"
            to="/recover-password"
          >
            Olvide mi Contrasena
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Register;
