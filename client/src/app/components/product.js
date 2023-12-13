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
            className="p-2 "
            key={`product-${props._id}`}
        >
            <div className="w-60 relative">
                {isNewProduct(props.createdAt) && (
                    <span
                        className="bg-black text-white font-bold text-xs absolute top-2 left-2 px-1 py-1 rounded border border-black border-opacity-25"
                        style={{ zIndex: 2 }}
                    >
                        New
                    </span>
                )}
                <div className="best-seller">
                    <div className="flex flex-col items-center" 
            onClick={() => {
                router.push(`/product/${props.slug}`);
            }}
        >
                        <div className="max-w-xs max-h-80 overflow-hidden">
                            <img
                                className="img-fluid cursor-pointer"
                                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_PATH}/${props.photo[0].public_id}.jpg`}
                                fill="true"
                                priority="true"
                                alt={props.name}
                            />
                        </div>
                        <div className="my-4 flex flex-row justify-between w-full">
                            <p className="font-bold">{props.name}</p>
                            <span className="font-bold">${props.price}</span>
                        </div>
                    </div>
        <button className="bg-white text-black border-2 border-black p-2 w-full">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default Product;
