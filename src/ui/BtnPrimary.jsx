import { Link } from "react-router";

const BtnPrimary = ({ text, link }) => {
  return (
    <Link
      className="py-2 px-3.5  md:px-8 md:py-3 font-extrabold text-center rounded-lg hover:bg-red-600 text-white bg-red-700 md:text-lg transition-all duration-300"
      to={link}
    >
      {text}
    </Link>
  );
};
export default BtnPrimary;
