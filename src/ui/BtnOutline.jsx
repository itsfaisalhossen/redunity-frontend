import { Link } from "react-router";

const BtnOutLine = ({ link, text }) => {
  return (
    <Link
      className="px-4 md:px-8 border-2 p-3 rounded-lg border-red-500 hover:bg-red-500 text-white transition-all duration-300"
      to={link}
    >
      {text}
    </Link>
  );
};
export default BtnOutLine;
