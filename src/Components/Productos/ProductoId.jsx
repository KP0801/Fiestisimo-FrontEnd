import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import Spinner from "../Spinner";

const ProductoId = () => {
  const [prodId, setProdId] = useState([]);
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

  if (loading) return <Spinner />;

  return (
    <div className="container mx-5 py-5 flex">
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
        <div className="mt-10 flex justify-around items-center">
          <p className="text-2xl font-bold text-gray-800">L. {prodId.price}</p>
          <button className="text-white bg-black hover:bg-gray-800 py-4 px-12 font-bold flex items-center gap-5">
            Agregar al Carrito
            <IoMdCart size={25} />
          </button>
        </div>
        <div className="mt-10 flex gap-5 justify-center">
          <p className="text-lg font-base text-gray-800 flex items-center gap-5">
            Compartir <FaFacebookSquare size={15} color="black" />{" "}
          </p>
          <p className="text-lg font-base text-gray-800 flex items-center gap-5">
            Tuitear <FaSquareXTwitter size={15} color="black" />{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductoId;
