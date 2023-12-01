import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
const Description = () => {
  return (
    <div className="mx-5 mt-10 mb-10">
      <Link to="/" className="flex items-center gap-4">
        <AiFillHome size={30} />
        <p className="text-lg font-bold">Volver</p>
      </Link>
      <div className="relative mt-5">
        <img
          src="/assets/Somos.jpg"
          alt="Quienes Somos?"
          className="w-full h-96 lg:h-96"
        />
        <p className="text-4xl font-bold absolute top-5 left-14 p-4 text-white shadow-lg">
          ¿Quienes Somos?
        </p>
        <Link
          to="/"
          className="text-lg font-bold absolute top-20 left-14 p-4 text-white shadow-lg"
        >
          Inicio
        </Link>
      </div>
      <div className="mt-8 grid lg:grid-cols-2 mx-20 gap-4">
        <div className="text-center">
          <p className="text-4xl text-yellow-700 font-bold">Sobre Nosotros</p>
          <div className="p-4 border border-l-slate-600 border-r-slate-600 border-t-green-800 border-b-green-800 mt-5 border-r-4 border-l-4">
            <p className="text-lg text-black">
              Fiestisima es una tienda online en colaboracion con productos CA,
              que es conocida por ser la distribuidora de productos numero uno
              en el ambito de las pastelelrias, lo cual permite a los usuarios
              poder disfrutar de los mejores pasteles, panes, etc.
            </p>
          </div>
          <div className="mt-5">
            <p className="text-2xl text-yellow-700 font-semibold">
              ¿Por que Fiestisimo?
            </p>
            <p className="text-lg text-black mt-2">
              Con Fiestisio queremos ofrecer productos de hosteleria de la mejor
              calidad a todo tipo de consumidores, gracias a internet. Compre
              sano, sabroso y de calidad a un precio asequible.
            </p>
          </div>
          <div className="mt-5">
            <p className="text-2xl text-yellow-700 font-semibold">
              Nuestros Productos
            </p>
            <p className="text-lg text-black mt-2">
              Nuestros productos son de la mas alta calidad, lo mejor que se
              encuentra en el pais, nos diferenciamos de nuestra competencia por
              la aceptacion de nuestros productos al publico en general, la
              mayoria de los productos que ofrecemos no pueden encontrarse en
              supermercados.
            </p>
          </div>
          <div className="mt-5">
            <p className="text-2xl text-yellow-700 font-semibold">
              Nuestros Precios
            </p>
            <p className="text-lg text-black mt-2">
              Nuestros precios son los mas asequibles que podras encontrar en el
              mercado de reposteria, ademas de ofrecer la mejor calidad en el
              producto en general.{" "}
            </p>
          </div>
        </div>
        <div>
          <img
            src="/assets/Reposteria.jpg"
            alt="Reposteria"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Description;
