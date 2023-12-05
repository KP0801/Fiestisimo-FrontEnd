import { MdFavoriteBorder } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import FormAdmin from "../Administrador/FormAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdFavorite } from "react-icons/md";
import Alerta from "../Alerta";
import useAuthUsers from "../../hooks/useAuthUsers";

const CardPoductos = ({ prod, setProductos, productos, setCheck, check }) => {
  const { authAdm } = useAuth();
  const { setCheck2, check2, authUsers } = useAuthUsers();
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editProd, setEditProd] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [alerta, setAlerta] = useState(false);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/products/${id}`,
        config
      );
      console.log(data.message);
      setProductos((prevProductos) =>
        prevProductos.filter((product) => product.id_product !== id)
      );
      toast.success(`${data.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (prod) => {
    setEditProd(prod);
    setEditMode(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
        <ToastContainer position="top-right" />
        {msg && <Alerta alerta={alerta} />}
        <Modal Visible={showModal} Close={() => closeModal()}>
          <div className="p-2 w-full h-screen">
            {editProd && (
              <FormAdmin
                editMode={editMode}
                prod={editProd}
                setProductos={setProductos}
                productos={productos}
                setCheck={setCheck}
                check={check}
              />
            )}
          </div>
        </Modal>
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
          {authAdm.role === "admin" ? (
            <>
              <div className="mt-5 flex justify-around">
                <div className="mb-10 flex items-center">
                  <button
                    className="px-2 py-2 text-white bg-red-500 hover:bg-red-600 text-base font-bold rounded-lg shadow-sm cursor-pointer flex gap-3"
                    onClick={() => handleDelete(prod.id_product)}
                  >
                    Eliminar
                    <AiFillDelete size={20} color="white" />
                  </button>
                </div>
                <div className="mb-10 flex items-center">
                  <button
                    onClick={() => handleEdit(prod)}
                    className="px-2 py-2 text-white bg-green-500 hover:bg-green-600 text-base font-bold rounded-lg shadow-sm cursor-pointer flex gap-3"
                  >
                    Editar
                    <AiFillEdit size={20} color="white" />
                  </button>
                </div>
              </div>
            </>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
};

export default CardPoductos;
