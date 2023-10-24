import Spinner from "../components/spinner";

const LoadingProducts = (props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  );
};

export default LoadingProducts;
