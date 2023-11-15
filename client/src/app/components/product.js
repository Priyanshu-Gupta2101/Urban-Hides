import Image from "next/image";
import { useRouter } from "next/navigation";
const Product = (props) => {
  const router = useRouter();
  const isNewProduct = (createdAt) => {
    const currentDate = new Date();
    const twoWeeksAgo = new Date(currentDate - 14 * 24 * 60 * 60 * 1000);
    const createdAtDate = new Date(createdAt);
    return createdAtDate >= twoWeeksAgo;
  };

  const calculateDiscountedPrice = (originalPrice) => {
    const discountedPrice = originalPrice - (originalPrice * 20) / 100;
    return discountedPrice;
  };
  return (
    <div
      className="container bg-white p-2 "
      key={`product-${props._id}`}
      onClick={() => {
        router.push(`/product/${props.slug}`);
      }}
    >
      <div className=" relative ">
        {isNewProduct(props.createdAt) && (
          <span
            className="bg-[rgba(0,0,0,0)] text-black font-bold text-xs absolute top-2 left-2 px-1 py-1 rounded-full border border-black border-opacity-25 backdrop-blur-md"
            style={{ zIndex: 2 }}
          >
            New
          </span>
        )}
        <div className="best-seller">
          <div className="flex flex-col items-center">
            <img
              className="img-fluid cursor-pointer"
              src={`${process.env.NEXT_PUBLIC_CLOUDINARY_PATH}/${props.photo[0].public_id}.jpg`}
              fill="true"
              priority="true"
              alt={props.name}
            />
            <h6>{props.name}</h6>
            <span className="line-through text-gray-500">
              {props.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
            <span className="text-green-700">
              {calculateDiscountedPrice(props.price).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}{" "}
              (20% off)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
