import { useRouter } from "next/navigation";
import Image from "next/image";
const Product = (props) => {
  const router = useRouter();
  return (
    <div
      className={`d-flex col-xl-3 col-md-6 best-seller cursor-pointer`}
      onClick={() => {
        router.push(`/product/${props.slug}`);
      }}
    >
      <div className="container bg-white p-2 px-6">
        <img
          className="img-fluid"
          src={`${process.env.NEXT_PUBLIC_CLOUDINARY_PATH}/${props.image}.jpg`}
          alt={props.name}
        />
        <h6>{props.name}</h6>
        <h5>${props.price}</h5>
      </div>
    </div>
  );
};

export default Product;
