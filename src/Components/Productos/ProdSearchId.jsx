import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaFacebookSquare, FaWhatsappSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import Alerta from "../Alerta";
import Spinner from "../Spinner";

const ProdSearchId = () => {
  const [prodId, setProdId] = useState([]);
  const [amount, setAmount] = useState(1);
  const [deadline, setDeadline] = useState(new Date());
  const [alerta, setAlerta] = useState({});
  const params = useParams();
  const { loading } = useAuth();

  useEffect(() => {
    const getProdId = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios(
          `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/products/${
            params.id
          }`,
          config
        );
        console.log("PROD POR ID", data.product);
        setProdId(data.product);
      } catch (error) {
        console.log(error);
      }
    };
    getProdId();
  }, [params.id]);

  const handleCantidadChange = (e) => {
    const nuevaCantidad = parseInt(e.target.value, 10);
    if (!isNaN(nuevaCantidad) && nuevaCantidad >= 1) {
      setAmount(nuevaCantidad);
    }
  };

  const handleReservacion = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/reservations/${
          params.id
        }`,
        {
          amount,
          deadline,
        },
        config
      );
      setAlerta({
        msg: "Reservacion Exitosa",
        error: false,
      });
      setAmount(1);
      setDeadline("");
      console.log(data);
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response.data.error,
        error: true,
      });
    }
  };

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${
    window.location.href
  }&text=${encodeURIComponent("¡Mira este producto increíble en Fiestisimo!")}`;

  const handleCompartirWhatsApp = () => {
    const mensaje =
      "Hola, estoy interesado/a en un producto y me gustaría obtener más información.";
    const telefonoAdministradora = "+504 9506-8789";

    const whatsappShareUrl = `https://api.whatsapp.com/send?phone=${telefonoAdministradora}&text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(whatsappShareUrl, "_blank");
  };

  if (loading) return <Spinner />;

  const { msg } = alerta;
  return (
    <div className="container mx-5 py-5 flex">
      {msg && <Alerta alerta={alerta} />}
      <div className="w-2/5">
        <img src={prodId.image} alt={prodId.name} className="w-full h-96" />
      </div>
      <div className="w-3/5 px-5">
        <div className="text-center">
          <p className="text-3xl text-gray-700 mb-5">
            {prodId.description}{" "}
            <span className="text-xl text-gray-800 font-black">
              <em>
                &quot; Recuerda que el tamaño, el diseño y los sabores de cada
                producto pueden ser solicitados y modificados al momento de
                hacer el pedido&apos;
              </em>
            </span>
          </p>
          <hr />
          <p className="text-3xl font-bold mt-3 uppercase">{prodId.name}</p>
        </div>
        <div className="mt-10 justify-start">
          <p className="text-2xl font-bold text-gray-800">L. {prodId.price}</p>
        </div>
        <div className="mt-10">
          <form onSubmit={handleReservacion}>
            <div className="flex justify-around">
              <div className="text-center">
                <label className="block text-gray-800 font-bold text-base mb-2">
                  Cantidad
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={handleCantidadChange}
                  className="border border-gray-300 p-3 w-28 text-center"
                />
              </div>
              <div className="text-center">
                <label className="block text-gray-800 font-bold text-base mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="border border-gray-300 p-3 w-full text-center"
                />
              </div>
              <button
                type="submit"
                className="text-white bg-sky-600 hover:bg-sky-800 py-4 px-12 font-bold flex items-center gap-5"
              >
                Agregar reservación
                <IoIosSend size={25} />
              </button>
            </div>
          </form>
        </div>
        <div className="mt-10 flex gap-5 justify-center">
          <a
            href={facebookShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-base text-gray-800 flex items-center gap-5"
          >
            Facebook <FaFacebookSquare size={15} color="black" />{" "}
          </a>
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-base text-gray-800 flex items-center gap-5"
          >
            Tuitear <FaSquareXTwitter size={15} color="black" />{" "}
          </a>
          <a
            onClick={handleCompartirWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-base text-gray-800 flex items-center gap-5 cursor-pointer"
          >
            WhatsApp <FaWhatsappSquare size={18} color="black" />{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProdSearchId;
