import { useLocation } from "react-router-dom";
import useAuthUsers from "../../hooks/useAuthUsers";
import CardSearch from "./CardSearch";

const ResultsSearch = () => {
  const location = useLocation();

  const { productosUser } = useAuthUsers();

  const productsFilteres = productosUser.filter(
    (prod) =>
      prod && prod.name.toLowerCase().includes(location.state.toLowerCase())
  );

  return (
    <div className="">
      <p className="text-md text-gray-700 text-2xl font-bold uppercase py-5 mx-5">
        Se encontraron <span>{productsFilteres.length}</span> resultados :
      </p>
      <div className="grid grid-cols-4 mt-5 gap-5">
        {productsFilteres.map((prod) => (
          <div className="col-span-1" key={prod.id_product}>
            <CardSearch prod={prod} key={prod.id_product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsSearch;
