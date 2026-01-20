import Lottie from "lottie-react";
import Loader from "../animationLotties/Loader.json";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="h-44 w-44">
        <div className="w-full h-full">
          <Lottie animationData={Loader} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
