import BtnPrimary from "../../ui/BtnPrimary";
import Container from "../../ui/Container";

const Error = () => {
  return (
    <Container>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mb-6 text-3xl md:text-5xl font-bold text-foreground">
            404 error
          </h1>

          <p className="mb-8 md:text-xl text-muted-foreground leading-relaxed">
            Sorry, the page you are looking for doesn't exist. Here are some
            helpful links
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BtnPrimary text={"Take me home"} link={"/"}></BtnPrimary>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Error;
