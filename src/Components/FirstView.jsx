import { dataSocialNetwork } from "../helpers/dataSocialNetwork";
import { Link } from "react-router-dom";
import GlobalCardProd from "../Components/GlobalCardProd";
import useAuthUsers from "../hooks/useAuthUsers";
const FirstView = () => {
  const { productosUser } = useAuthUsers();
  return (
    <>
      <div
        id="overview"
        className="p-5 mt-3 bg-gradient-to-r from-indigo-500 via-blue-500 to-red-400 lg:px-24 lg:py-52 "
      >
        <div className="items-center lg:grid lg:grid-cols-2 ">
          <div>
            <h1 className="text-4xl font-bold text-white lg:text-6xl lg:leading-snug">
              La mejor reposteria <br />Y experiencias
            </h1>
            <p className="mt-5 text-white">
              En reposteria Fiestisimo, nos apasiona transformar ingredientes
              frescos y amor en delicias irresistibles. Somos más que una simple
              repostería; somos narradores de historias dulces que celebran los
              momentos especiales de la vida.
            </p>
            <div className="flex justify-start gap-4 my-10">
              {dataSocialNetwork.map(({ id, icon, name, link }) => (
                <Link to={link} key={id} target="_blank" rel="noreferrer">
                  <img
                    src={`/svg/${icon}.svg`}
                    alt={name}
                    width="40"
                    height="40"
                  />
                </Link>
              ))}
            </div>
            <div className="flex justify-between">
              <Link to="/login">
                <button className="px-8 py-3 mr-10 text-white bg-pink-400 rounded-xl mb-5">
                  Empieza Ya
                </button>
              </Link>
              <Link
                to="/quienes-somos"
                className="px-5 mr-5 py-5 text-white border-2 rounded-xl"
              >
                ¿Quienes Somos?
              </Link>
            </div>
          </div>
          <div>
            <img
              src="/assets/PastelFondo.png"
              alt="OverFirst"
              width="800"
              height="700"
            />
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <p className="text-4xl text-yellow-600 font-semibold">Te ofrecemos </p>
        <div className="w-full grid grid-cols-4 gap-5 cursor-pointer">
          {productosUser.slice(0, 8).map((prod) => (
            <div key={prod.id_product} className="col-span-1 mt-5">
              <GlobalCardProd key={prod.id_product} prod={prod} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 text-center">
        <p className="text-3xl text-yellow-600">Tienda Online de Reposteria</p>
        <p className="text-lg">
          Bienvenido a la{" "}
          <b>tienda online de Productos de pasteleria y reposteria,</b>{" "}
          Fiestisima. Aqui podra encontrar cualquier producto de reposteria que
          guste, ademas de encoontrar una alta calidad en la preparcion y
          elaboracion de los mismos.
        </p>
      </div>
      <div className="mt-10 text-center">
        <p className="text-3xl text-yellow-600">Ingredientes de Reposteria</p>
        <p className="text-lg">
          Los ingredientes de reposteria y Panaderia ofrecidos en la tienda
          online son fabricados por las marcas que usan los profesionales.
        </p>
      </div>
      <div className="mt-20">
        <div className="text-center">
          <p className="text-3xl text-yellow-600 font-bold">Comprar</p>
        </div>
        <div className="mt-5 grid lg:grid-cols-3 gap-4">
          <div className="text-center hover:shadow-lg p-4 rounded-lg cursor-pointer">
            <img
              className="w-full h-80"
              src="/assets/PastelEspecial.jpg"
              alt="Pastel Especial"
            />
            <p className="mt-5 text-xl text-yellow-700 font-bold">
              Especiales de temporada
            </p>
          </div>
          <div className="text-center hover:shadow-lg p-4 rounded-lg cursor-pointer">
            <img
              src="/assets/PastelTradicional.jpg"
              alt="Pastel Tradicional"
              className="w-full h-80"
            />
            <p className="mt-5 text-xl text-yellow-700 font-bold">
              Pasteles Tradicionales
            </p>
          </div>
          <div className="text-center hover:shadow-lg p-4 rounded-lg cursor-pointer">
            <img
              className="w-full h-80"
              src="/assets/PastelFrio.jpg"
              alt="Pastel Frio"
            />
            <p className="mt-5 text-xl text-yellow-700 font-bold">
              Pasteles Frios
            </p>
          </div>
          <div className="text-center hover:shadow-lg p-4 rounded-lg cursor-pointer">
            <img
              className="w-full h-80"
              src="/assets/Exclusivos.jpg"
              alt="Pastel Exclusivos"
            />
            <p className="mt-5 text-xl text-yellow-700 font-bold">
              Linea Exclusiva
            </p>
          </div>
          <div className="text-center hover:shadow-lg p-4 rounded-lg cursor-pointer">
            <img
              className="w-full h-80"
              src="/assets/Panaderia.jpg"
              alt="Panaderia"
            />
            <p className="mt-5 text-xl text-yellow-700 font-bold">Panaderia</p>
          </div>
          <div className="text-center hover:shadow-lg p-4 rounded-lg cursor-pointer">
            <img
              className="w-full h-80"
              src="/assets/Postres.jpg"
              alt="Postres"
            />
            <p className="mt-5 text-xl text-yellow-700 font-bold">Postres</p>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <p className="text-4xl">
          Horario de entrega a domicilio 8:00AM a 3:00PM
        </p>
        <p className="mt-5 text-4xl font-bold">Envíos a nivel nacional</p>
      </div>
    </>
  );
};

export default FirstView;
