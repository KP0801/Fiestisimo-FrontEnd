import { Link } from "react-router-dom";
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
        <Link
          to="https://instagram.com/fiestisimohn?igshid=MTNiYzNiMzkwZA=="
          target="_blank"
          className="flex items-center gap-3"
        >
          <img src="/svg/instagram.svg" alt="instagram" />
          <p className="text-lg font-bold text-white">Instagram</p>
        </Link>
        <Link
          to="https://www.tiktok.com/@fiestisimo?_r=1&_d=e7fj0g4d69lgab&sec_uid=MS4wLjABAAAAyoSe11e5rPQrgM-oe-YiqhwDptI_zL3Isqbw4UnOLRw2beZKxrwt1NF8_kmt69AK&share_author_id=6793794692179641349&sharer_language=es&source=h5_m&u_code=dmf750dgc8m97m&timestamp=1701717596&user_id=7049185627100087301&sec_user_id=MS4wLjABAAAAbMYBGglw5MbFljaJw1LU60SlvJ8CuGT1kp_Jiw_qLME6wNG0TVG24jditUooan8w&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7307969998344636165&share_link_id=de09d281-f3d5-4994-b7c1-5476605ac384&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b6880%2Cb5836&social_share_type=5"
          target="_blank"
          className="flex items-center gap-3 mt-5"
        >
          <img src="/svg/tiktok.svg" alt="tiktok" />
          <p className="text-lg font-bold text-white">TikTok</p>
        </Link>
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
