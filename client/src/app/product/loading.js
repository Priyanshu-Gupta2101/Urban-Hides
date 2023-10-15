import Spinner from "../components/spinner";

const LoadingProducts = (props) => {
  return (
    <div className="flex items-center justify-center h-screen fixed top-0">
      <Spinner />
    </div>
  );
};

export default LoadingProducts;
