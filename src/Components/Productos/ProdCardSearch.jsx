import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BsFillCartFill } from "react-icons/bs";
import Spinner from "../../Components/Spinner";
import useAuth from "../../hooks/useAuth";

const ProdCardSearch = () => {
  const { loading } = useAuth();
  const params = useParams();
  const [prodCat, setProdCat] = useState([]);

  useEffect(() => {
    const getProdCategory = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/products/category/${
            params.categoria
          }`,
          config
        );
        console.log("PROD POR CATE", data);
        setProdCat(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getProdCategory();
  }, [params.categoria]);

  if (loading) return <Spinner />;
  return (
    <>
      {prodCat.length > 0 ? (
        <div className="w-full h-auto grid grid-cols-4 gap-5 cursor-pointer">
          {prodCat.map((cate) => (
            <>
              <Link key={cate.id_product} to={`${cate.id_product}`}>
                <div className="bg-white shadow hover:shadow-lg w-full h-auto rounded-tr-xl rounded-tl-xl">
                  <img
                    src={cate.image}
                    alt={cate.name}
                    className="w-full h-72 rounded-tr-xl rounded-tl-xl"
                  />
                  <div className="mt-5 px-10 text-center">
                    <p className="text-black font-black text-xl mt-3 uppercase">
                      {cate.name}
                    </p>
                    <p className="text-gray-500 font-semibold text-lg mt-1">
                      {cate.category}
                    </p>
                  </div>
                  <div className="flex justify-around pb-5 items-center">
                    <p className="text-black font-semibold text-xl mt-3">
                      L. {cate.price}
                    </p>
                    <p>
                      <BsFillCartFill size={20} />
                    </p>
                  </div>
                </div>
              </Link>
            </>
          ))}
        </div>
      ) : (
        <>
          <Spinner />
        </>
      )}
    </>
  );
};

export default ProdCardSearch;
