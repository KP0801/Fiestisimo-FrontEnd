const Footer = () => {
  return (
    <div
      id="footer"
      className="mt-20 grid lg:grid-cols-3 bg-gray-800 h-auto gap-8 p-8 mb-2"
    >
      <div>
        <p className="text-lg text-white font-bold cursor-pointer">
          Política de Cambio
        </p>
        <p className="text-lg text-white font-bold mt-5 cursor-pointer">
          Política de Devolución
        </p>
      </div>
      <div>
        <div className="flex items-center gap-3">
          <img src="/svg/instagram.svg" alt="instagram" />
          <p className="text-lg font-bold text-white">Instagram</p>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <img src="/svg/tiktok.svg" alt="tiktok" />
          <p className="text-lg font-bold text-white">TikTok</p>
        </div>
      </div>
      <div>
        <p className="text-lg font-bold text-white block">
          © 2023, Reposteria Fiestisimo
        </p>
        <p className="text-lg font-bold text-white mt-5">
          Tecnología de Shopify
        </p>
      </div>
    </div>
  );
};

export default Footer;
