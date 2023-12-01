const GlobalCardProd = ({ prod }) => {
  return (
    <>
      <div className="bg-white shadow hover:shadow-2xl w-full h-auto rounded-tr-xl rounded-tl-xl">
        <img
          src={prod.image}
          alt={prod.name}
          className="w-full h-72 rounded-tr-xl rounded-tl-xl"
        />
        <div className="mt-5 px-10 text-center">
          <p className="text-black font-black text-xl mt-3 uppercase">
            {prod.name}
          </p>
          <p className="text-gray-500 font-semibold text-lg mt-1">
            {prod.category}
          </p>
          <>
            <div className="pb-5">
              <p className="text-black font-semibold text-xl mt-3 flex justify-center items-center">
                L. {prod.price}
              </p>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default GlobalCardProd;
