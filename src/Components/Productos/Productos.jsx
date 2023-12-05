import CardPoductos from "./CardPoductos";
import { useState, useEffect } from "react";
import axios from "axios";
import { dataCategories } from "../../helpers/dataCategories";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const getProductos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/fiestisimo/products/cheap/products`,
          config
        );
        console.log("data de productos", data);
        setProductos(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getProductos();
  }, []);

  console.log(dataCategories);

  return (
    <div className="h-auto">
      <div className="mt-5 mb-5">
        <p className="text-4xl text-sky-900 font-black text-center mt-5 mb-16">
          Comprar
        </p>
        <div>
          <div className="grid grid-cols-4 gap-4">
            {dataCategories.map(({ link, name, id }) => (
              <motion.div
                key={id}
                className="col-span-1"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <p className="text-xl font-bold uppercase text-center mb-3">
                  {name}
                </p>
                <Link to={`productos/${name}`} key={id}>
                  <motion.img
                    src={link}
                    alt={name}
                    className="w-full h-60 hover:opacity-80 shadow-lg"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-24 mb-5">
        <p className="text-4xl text-sky-900 font-black text-center mt-5">
          Productos de tú interés
        </p>
      </div>
      <div className="w-full grid grid-cols-4 gap-5">
        {productos.map((prod) => (
          <div key={prod.id_product} className="col-span-1 mt-5">
            <CardPoductos key={prod.id_product} prod={prod} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
