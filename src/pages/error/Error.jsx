import Lottie from "lottie-react";
import BtnPrimary from "../../ui/BtnPrimary";
import Container from "../../ui/Container";
import errorLottie from "../../animationLotties/404";

const Error = () => {
  return (
    <div className="dark:bg-primary-dark bg-primary">
      <Container>
        <div className="flex min-h-screen  flex-col items-center justify-center bg-background px-4">
          <div className="mx-auto dark:text-white w-full flex  flex-col gap-3 max-w-3xl text-center">
            <div className="flex mx-auto items-center justify-center w-52 md:w-100">
              <div className="w-full h-auto">
                <Lottie animationData={errorLottie} loop={true} />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl uppercase font-bold text-foreground">
              404 error
            </h1>

            <p className="md:text-lg text-muted-foreground leading-relaxed">
              Sorry, the page you are looking for doesn't exist. Here are some
              helpful links
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BtnPrimary text={"Take me home"} link={"/"}></BtnPrimary>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Error;
