import { useState, useEffect } from "react";
import axios from "axios";
import CardPoductos from "../Components/Productos/CardPoductos";
import Spinner from "../Components/Spinner";
import useAuth from "../hooks/useAuth";
const ProductosView = () => {
  const [productos, setProductos] = useState([]);
  const [check, setCheck] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const { cargando } = useAuth();

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = productos.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(productos.length / productsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getProductos = async () => {
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
          }/fiestisimo/products/all/products`,
          config
        );
        console.log("data de productos", data);
        setProductos(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getProductos();
  }, [check]);

  if (cargando)
    return (
      <>
        <Spinner />
      </>
    );

  return (
    <>
      <div className="w-full grid grid-cols-4 gap-5 h-auto">
        {currentProduct.map((prod) => (
          <div key={prod.id_product} className="col-span-1 mt-5">
            <CardPoductos
              prod={prod}
              setProductos={setProductos}
              productos={productos}
              setCheck={setCheck}
              check={check}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-10 pb-10">
        {/* ... */}
        <div className="flex justify-center mt-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`mx-1 px-2 py-1 rounded ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductosView;
