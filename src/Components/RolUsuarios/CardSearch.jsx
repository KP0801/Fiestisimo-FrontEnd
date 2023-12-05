import { MdFavoriteBorder } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import Alerta from "../Alerta";
import useAuthUsers from "../../hooks/useAuthUsers";
import useAuth from "../../hooks/useAuth";
const CardSearch = ({ prod }) => {
  const { authAdm } = useAuth();
  const { setCheck2, check2, authUsers } = useAuthUsers();
  const [isFavorite, setIsFavorite] = useState(false);
  const [alerta, setAlerta] = useState(false);

  const handleFav = async (id) => {
    await addFavorites(id), setIsFavorite(!isFavorite);
    setCheck2(!check2);
  };

  const handleDel = async (id) => {
    await deleteFavorites(id), setIsFavorite(!isFavorite), setCheck2(!check2);
  };

  const addFavorites = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/favoriteProducts/${
          authUsers.id
        }/${id}`,
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response.data.error,
        error: true,
      });
    }
  };

  const deleteFavorites = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/favoriteProducts/${
          authUsers.id
        }/${id}`,
        config
      );
      console.log(data);
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
    <>
      <div className="bg-white shadow-xl hover:shadow-2xl w-full h-auto rounded-tr-xl rounded-tl-xl">
        {msg && <Alerta alerta={alerta} />}
        <Link to={authAdm.role === "admin" ? `` : `productos/${prod.category}`}>
          <img
            src={prod.image}
            alt={prod.name}
            className="w-full h-72 rounded-tr-xl rounded-tl-xl"
          />
        </Link>
        <div className="mt-5 px-10 text-center">
          <p className="text-black font-black text-xl mt-3 uppercase">
            {prod.name}
          </p>
          <p className="text-gray-500 font-semibold text-lg mt-1">
            {prod.category}
          </p>
          <>
            <div className="pb-5">
              <p className="text-black font-semibold text-xl mt-3 flex justify-between items-center">
                L. {prod.price}
                {!isFavorite ? (
                  <MdFavoriteBorder
                    size={25}
                    className="text-red-400 hover:text-red-600 cursor-pointer"
                    onClick={() => handleFav(prod.id_product)}
                  />
                ) : (
                  <MdFavorite
                    size={25}
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleDel(prod.id_product)}
                  />
                )}
              </p>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default CardSearch;
