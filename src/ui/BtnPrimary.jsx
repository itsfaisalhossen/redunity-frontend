import { Link } from "react-router";

const BtnPrimary = ({ text, link }) => {
  return (
    // <Link
    //   className="py-2 px-3.5  md:px-8 md:py-3 font-extralight uppercase text-center rounded-lg hover:bg-red-600 text-white bg-red-700 md:text-sm transition-all duration-300"
    //   to={link}
    // >
    //   {text}
    // </Link>
    <Link
    // className="ru-submit"
      className="wfull bg-[linear-gradient(135deg,#e8002f_0%,#ff2d55_50%,#ff5577_100%)] text-white  group relative justify-center px-5 md:px-6 py-3 font-medium rounded-lg transition-all duration-300 hover:bg-red-700 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.3)] active:scale-95 flex items-center gap-2"
      to={link}
    >
      {text}
    </Link>
  );
};
export default BtnPrimary;
