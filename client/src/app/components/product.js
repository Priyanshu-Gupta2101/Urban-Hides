import { useRouter } from "next/navigation";
import { useState } from "react";

const Product = (props) => {
    const router = useRouter();
    const isNewProduct = (createdAt) => {
        const currentDate = new Date();
        const twoWeeksAgo = new Date(currentDate - 14 * 24 * 60 * 60 * 1000);
        const createdAtDate = new Date(createdAt);
        return createdAtDate >= twoWeeksAgo;
    };
    const [photo, setPhoto] = useState(0);

    const calculateDiscountedPrice = (originalPrice) => {
        const discountedPrice = originalPrice - (originalPrice * 20) / 100;
        return discountedPrice;
    };

    return (
        <div className="p-2 " key={`product-${props._id}`}>
            <div className="relative w-60">
                {isNewProduct(props.createdAt) && (
                    <span
                        className="absolute left-2 top-2 rounded border border-black border-opacity-25 bg-black px-1 py-1 text-xs font-bold text-white"
                        style={{ zIndex: 2 }}
                    >
                        New
                    </span>
                )}
                <div className="best-seller">
                    <div
                        className="flex flex-col items-center"
                        onClick={() => {
                            router.push(`/product/${props.slug}`);
                        }}
                    >
                        <div className="min-h-[30vh] max-h-[30vh] overflow-hidden">
                            <img
                                className="img-fluid cursor-pointer"
                                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_PATH}/${props.photo[photo].public_id}.jpg`}
                                fill="true"
                                priority="true"
                                alt={props.name}
                                onMouseEnter={() => setPhoto(photo + 1)}
                                onMouseLeave={() => setPhoto(photo - 1)}
                            />
                        </div>
                        <div className="my-4 flex w-full flex-row justify-between">
                            <p className="font-bold">{props.name}</p>
                            <span className="font-bold">${props.price}</span>
                        </div>
                    </div>
                    <button className="w-full border-2 border-black bg-white p-2 text-black duration-500 hover:bg-black hover:text-white">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
