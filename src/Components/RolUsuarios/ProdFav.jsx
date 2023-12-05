import useAuthUsers from "../../hooks/useAuthUsers";
import CardPoductos from "../Productos/CardPoductos";
const ProdFav = () => {
  const { favoritos } = useAuthUsers();
  return (
    <>
      {favoritos.length > 0 ? (
        <div className="grid grid-cols-4 gap-3">
          <>
            {favoritos.map((fav) => (
              <div key={fav.id_product} className="col-span-1">
                <CardPoductos prod={fav} />
              </div>
            ))}
          </>
        </div>
      ) : (
        <div className="text-center w-full flex justify-center">
          <p className="text-gray-800 font-bold text-2xl uppercase">
            Lista de favoritos vacia
          </p>
        </div>
      )}
    </>
  );
};

export default ProdFav;
