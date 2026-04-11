import { Link } from "react-router";

const BtnOutLine = ({ link, text }) => {
  return (
    <Link
    to={link}
      className="px-5 md:px-6 py-2.5 md:py-3 font-medium rounded-lg justify-center text-center border-2 border-red-500/50 hover:bg-red-500 text-red-500 hover:text-white transition-all duration-300"
    >
      {text}
    </Link>
  );
};
export default BtnOutLine;
