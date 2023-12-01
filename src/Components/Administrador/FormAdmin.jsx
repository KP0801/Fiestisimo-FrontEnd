import { useState, useEffect } from "react";
import axios from "axios";
import Alerta from "../Alerta";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FormAdmin = ({ editMode, prod, setCheck, check }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [ide, setIde] = useState("");
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    if (editMode) {
      setName(prod.name);
      setDescription(prod.description);
      setPrice(prod.price);
      setCategory(prod.category);
      setIde(prod.id_product);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setIde("");
    }
  }, [editMode, prod, ide]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, category, price].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    let regexNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexDescription = /^[\w\d\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/u;
    if (!regexNombre.test(name.trim())) {
      setAlerta({
        msg: "El campo 'nombre' solo acepta letras y espacios en blanco",
        error: true,
      });
      return;
    }

    if (!regexDescription.test(description.trim())) {
      setAlerta({
        msg: "El campo 'descriptio' solo acepta letras, numeros y espacios en blanco",
        error: true,
      });
      return;
    }

    let regexNumber = /^-?\d+(\.\d+)?$/;
    if (!regexNumber.test(price.trim())) {
      setAlerta({
        msg: "El campo 'Precio' solo acepta numeros",
        error: true,
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = new FormData();
      formData.append("name", name),
        formData.append("description", description);
      formData.append("price", price), formData.append("category", category);
      if (image !== null) {
        formData.append("image", image);
      }
      console.log("FORMDATA", formData);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/products/`,
        formData,
        config
      );
      console.log(data);
      setAlerta({
        msg: "Producto Agregado exitosamente",
        error: false,
      });

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage(null);
    } catch (error) {
      setAlerta({
        msg: error.response.data.error,
        error: true,
      });
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    if ([name, description, category].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    let regexNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexDescription = /^[\w\d\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/u;
    if (!regexNombre.test(name.trim())) {
      setAlerta({
        msg: "El campo 'nombre' solo acepta letras y espacios en blanco",
        error: true,
      });
      return;
    }

    if (!regexDescription.test(description.trim())) {
      setAlerta({
        msg: "El campo 'descriptio' solo acepta letras, numeros y espacios en blanco",
        error: true,
      });
      return;
    }

    let regexNumber = /^-?\d+(\.\d+)?$/;
    if (!regexNumber.test(price.trim())) {
      setAlerta({
        msg: "El campo 'Precio' solo acepta numeros",
        error: true,
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/products/edit/${ide}`,
        { name, description, price, category },
        config
      );
      console.log(data);
      toast.success("Producto Actualizado Exitosamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCheck(!check);
    } catch (error) {
      setAlerta({
        msg: error.response.data.error,
        error: true,
      });
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white rounded-lg shadow-md p-4 w-auto"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      {msg && <Alerta alerta={alerta} />}
      <ToastContainer position="top-right" />
      <p className="text-center mt-4 text-4xl font-black text-sky-800 mb-5">
        {editMode ? "Editar Producto" : "Agregar Producto "}
      </p>
      <div className="mt-3 block">
        <label htmlFor="" className="uppercase text-lg font-bold">
          nombre del producto
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          type="text"
          className="bg-gray-100 rounded-sm mt-3 w-full focus:outline-none focus:ring focus:ring-blue-200 border-gray-100 py-2 shadow-md"
        />
      </div>
      <div className="mt-3 block">
        <label htmlFor="" className="uppercase text-lg font-bold">
          descripcion del producto
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="bg-gray-100 rounded-sm mt-3 w-full focus:outline-none focus:ring focus:ring-blue-200 border-gray-100 py-2 shadow-md"
        />
      </div>
      <div className="mt-3 block">
        <label htmlFor="" className="uppercase text-lg font-bold">
          precio del producto
        </label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="text"
          className="bg-gray-100 rounded-sm mt-3 w-full focus:outline-none focus:ring focus:ring-blue-200 border-gray-100 py-2 shadow-md"
        />
      </div>
      <div className="mt-3 block">
        <label htmlFor="" className="uppercase text-lg font-bold">
          categoria del producto
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          className="bg-gray-100 rounded-sm mt-3 w-full focus:outline-none border-gray-100 py-3 shadow-md text-center focus:ring focus:ring-blue-200"
        >
          <option value="">- Selecciona una opcion -</option>
          <option value="Arreglos">Arreglos</option>
          <option value="Pasteles">Pasteles</option>
          <option value="Desayunos">Desayunos</option>
          <option value="Postres">Postres</option>
        </select>
      </div>
      {editMode ? (
        ""
      ) : (
        <div className="mt-8 block mb-5">
          <label
            htmlFor="imagenProducto"
            className="uppercase text-lg font-bold"
          >
            Imagen del producto
          </label>
          <input
            onChange={handleImage}
            type="file"
            id="imagenProducto"
            accept=".jpeg, .jpg, .png"
            className="hidden"
          />
          <label
            htmlFor="imagenProducto"
            className={
              image === null
                ? "cursor-pointer  bg-gray-100 rounded-lg mt-3 w-full py-2 px-4 text-center border border-gray-100 shadow-md hover:bg-gray-200 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 mx-5"
                : "cursor-pointer bg-green-500 rounded-lg mt-3 w-full py-2 px-4 text-center border border-gray-100 shadow-md hover:bg-green-700 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 mx-5 text-white"
            }
          >
            {!image ? "Seleccionar imagen" : "Imagen Cargada"}
          </label>
        </div>
      )}

      {editMode ? (
        <button
          onClick={handleSubmit2}
          className="mt-5 w-full py-3 px-4 bg-green-600 hover:bg-green-800 text-white text-lg font-bold rounded-md shadow mb-5"
          type="submit"
        >
          Editar Producto
        </button>
      ) : (
        <button
          className="mt-5 w-full py-3 px-4 bg-sky-600 hover:bg-sky-800 text-white text-lg font-bold rounded-md shadow mb-5"
          type="submit"
        >
          Agregar Producto
        </button>
      )}
    </form>
  );
};

export default FormAdmin;
