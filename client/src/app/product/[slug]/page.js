"use client";
import Star from "@/app/components/star";
import Button from "@/app/components/button";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../hooks/axiosinstance";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";
import "../../home.css";
import SizeChart from "@/app/components/SizeChart";
import ImageSlider from "@/app/components/ImageSlider";
import Link from "next/link";
import { useCart } from "@/app/context/cart";


const Product = () => {
  const [cart, setCart] = useCart();
  // const [reviewText, setReviewText] = useState("");
  // const [reviews, setReviews] = useState([]);
  const [auth, setAuth] = useAuth();
  const router = useRouter();
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("");
  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
        setColor(data?.product.color[0]);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Add to cart
  const addToCart = async () => {
    try {
      if (auth.token) {
        const { data } = await axiosInstance.post(
          "/api/v1/product/add-to-cart",
          {
            product: product._id,
            quantity: quantity,
            size: size,
            color: color,
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setCart([...cart, product]);
        localStorage.setItem("cart", JSON.stringify([...cart, product]));
        setFlash({
          message: "Item added to cart",
          bg: "bg-green-500",
        });
      } else {
        setFlash({
          message: "Login to add to cart",
          bg: "bg-blue-400",
        });
      }
    } catch (err) {
      console.log(err);
      setFlash({
        message:
          "Error! Item could not be added to cart. Please refresh the page and try again.",
        bg: "bg-red-500",
      });
    } finally {
      showFlash();
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const createReview = async () => {
    try {
      if (auth.token) {
        await axiosInstance.post(
          "/api/v1/review/create",
          {
            product: product._id,
            text: reviewText,
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        setFlash({
          message: "Created review successfully",
          bg: "bg-green-400",
        });
      } else {
        setFlash({
          message: "Login is required",
          bg: "bg-blue-400",
        });
      }
      // Clear the review text input after posting
    } catch (error) {
      console.error("Error creating review:", error);
    } finally {
      showFlash();
      setReviewText("");
    }
  };

  // const fetchReviews = async () => {
  //   try {
  //     const { data } = await axiosInstance.get(
  //       `/api/v1/review/getAllReviews?productId=${product._id}`
  //     );
  //     console.log(data);
  //     setReviews(data.docs);
  //   } catch (error) {
  //     console.error("Error fetching reviews:", error);
  //   }
  // };

  const handleSizeSelect = (size) => {
    setSize(size);
    setFlash({
      message: "Size selected",
      bg: "bg-green-500",
    });
    showFlash();
  };

  const handleColorSelect = (color) => {
    setColor(color);
    setFlash({
      message: "Color selected",
      bg: "bg-green-500",
    });
    showFlash();
  };

  const calculateDiscountedPrice = (originalPrice) => {
    const discountedPrice = originalPrice + (originalPrice * 20) / 100;
    return discountedPrice;
  };

  const isNewProduct = (createdAt) => {
    const currentDate = new Date();
    const twoWeeksAgo = new Date(currentDate - 14 * 24 * 60 * 60 * 1000);
    const createdAtDate = new Date(createdAt);
    return createdAtDate >= twoWeeksAgo;
  };

  useEffect(() => {
    if (params?.slug && !product._id) {
      getProduct();
    }
  }, [params?.slug, , product._id]);

  // useEffect(() => {
  //   if (product._id) {
  //     fetchReviews();
  //   }
  // }, [product._id]);

  return (
    <div className="mx-12 h-4/6 px-3 md:px-44 py-8">
      <Flash flash={flash} />
      <div className="flex flex-col lg:flex-row items-center justify-evenly content-start  ml-4">
        {product.photo?.length > 0 && (
          <ImageSlider
            props={product?.photo}
            className="rounded-xl md:min-w-350 md:max-w-xs self-center mt-4"
          />
        )}
        <div className="py-14">
          <p className="font-bold text-4xl py-2">{product.name}</p>
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
          <p className="py-2">
            <span className="text-xl line-through">
              {calculateDiscountedPrice(product.price)?.toLocaleString(
                "en-US",
                {
                  style: "currency",
                  currency: "USD",
                }
              )}
            </span>
            <br />
            <span className="text-2xl text-green-700">
              {product.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}{" "}
              (20% off)
            </span>
          </p>

          <p className="py-1 text-sm text-gray-500">Category : {product?.category?.name}</p>
          <p className="text-gray-500 text-sm">
            Subcategory :{" "}
            {product.category?.subcategories.find(
              (subcategory) => subcategory._id === product.subcategory
            )
              ? product.category.subcategories.find(
                  (subcategory) => subcategory._id === product.subcategory
                ).name
              : "N/A"}
          </p>
          <p className="text-2xl py-2">Available colors</p>
          <div className="grid grid-cols-4 gap-y-4 py-2 md:max-w-xs">
            {product.color?.map((p) => {
              return (
                <button
                  key={p}
                  className={`border-2 rounded p-3 ${
                    color === p
                      ? "bg-black text-white border-white"
                      : "bg-white text-black border-black"
                  }`}
                  value={p}
                  onClick={() => handleColorSelect(p)}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <p className="text-2xl pt-2">Available sizes</p>
          <div className="sizes py-3.5">
            {product.size?.map((p) => (
              <button
                key={p}
                value={p}
                className={`p-3.5 mr-2.5 rounded border-2 ${
                  size === p
                    ? "bg-black text-white border-white"
                    : "bg-white text-black border-black"
                }`}
                onClick={() => handleSizeSelect(p)}
              >
                {p}
              </button>
            ))}
            {/* <button
              key="custom"
              value="Custom"
              className="bg-white text-black border-black  border-2 rounded p-3.5 mr-2.5"
              onClick={(e) => {
                router.push(`/customize?pid=${product._id}`);
              }}
            >
              Custom
            </button> */}
          </div>

          <br />

          <Link
            className="text-blue-500 text-md hover:underline"
            // onClick={openModal}
            href="/size-guide"
          >
            Checkout our Size Guide
          </Link>

          {/* {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                className="absolute inset-0 bg-gray-900 opacity-50"
                onClick={closeModal}
              ></div>
              <div className="bg-white p-8 rounded-lg z-10 relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  onClick={closeModal}
                >
                  &times;
                </button>
                <SizeChart />
              </div>
            </div>
          )} */}

          <br />
          <label htmlFor="quantity" className="text-2xl mr-4">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mb-8 w-12 font-xl"
            name="quantity"
          />
          <br />
          <Button value="Add to cart" bg="bg-green-500" onClick={addToCart} />
        </div>
      </div>
      <div id="details">
        <label htmlFor="quantity" className="text-2xl md:text-4xl mr-4">
          Product Features:
        </label>
        <ul className="list-disc ml-6 my-6">
          {product.features?.map((feature, index) => {
            return <li key={index}>{`${feature}`}</li>;
          })}
        </ul>

        <br />

        <label htmlFor="quantity" className="text-2xl md:text-4xl mr-4">
          Product Description:
        </label>
        <br />
        <p className="my-6">{product.description}</p>
        <br />
      </div>
      <div className="md:py-32">
        {/* <p className="text-3xl">
          What people who bought this product have to say...
        </p>
        {reviews?.map((rev) => (
          <div
            id="reviews"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6"
          >
            <div
              id="review"
              className="font-sans my-2.5 p-4 bg-slate-200 rounded max-h-96 overflow-scroll"
            >
              <div id="user-detail" className="w-full flex">
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  className="min-w-pfp mr-2.5 self-center rounded-full"
                  alt="pfp"
                  width="32px"
                />
                <h4 className="m-2">John Doe</h4>
              </div>
              <div id="review-content" className="mt-2.5">
                {rev.text}
              </div>
            </div>
          </div>
        ))}
        <form onSubmit={createReview} className="py-6 border-black">
          <p>Post a review. Let us know how you liked the leather product!</p>
          <textarea
            type="text"
            className="min-w-full border-slate-600 border-2 border-dotted rounded my-2"
            placeholder="What do you think?"
            value={reviewText} // Assuming you have 'reviewText' in your component state
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <Button value="Post Review" bg="bg-green-500" color="black" />
        </form> */}

        <hr />
        <div className="row container similar-products">
          <h4 className="categories-heading">Similar Products </h4>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div
            className={`grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4`}
          >
            {relatedProducts?.map((p) => (
              <div
                className="container bg-white"
                key={`product-${p._id}`}
                onClick={() => {
                  router.push(`/product/${p.slug}`);
                }}
              >
                <div className="relative">
                  {isNewProduct(p.createdAt) && (
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
                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_PATH}/${p.photo[0].public_id}.jpg`}
                        fill="true"
                        priority="true"
                        sizes="(max-width: 300px)"
                        alt={p.name}
                      />
                      <h6>{p.name}</h6>
                      <span className="line-through text-gray-500">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                      <span className="text-green-500">
                        {calculateDiscountedPrice(p.price).toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "USD",
                          }
                        )}{" "}
                        (20% off)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
