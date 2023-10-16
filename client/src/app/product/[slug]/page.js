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
import ImageSlider from "@/app/components/ImageSlider";

const Product = () => {
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [auth, setAuth] = useAuth();
  const router = useRouter();
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });

  const [size, setSize] = useState("S");
  const [color, setColor] = useState("");
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Add to cart
  const addToCart = async () => {
    try {
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
      setFlash({
        message: "Item added to cart",
        bg: "bg-green-500",
      });
    } catch (err) {
      console.log(err);
      setFlash({
        message:
          "Error! Item could not be added to cart. Please refresh the page and try again.",
        bg: "bg-red-500",
      });
    }

    showFlash();
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
      console.log(product._id);
      await axiosInstance.post("/api/v1/review/create", {
        product: product._id,
        text: reviewText,
      });
      setReviewText(""); // Clear the review text input after posting
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/review/getAllReviews?productId=${product._id}`
      );
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  return (
    <div className="max-w-full h-4/6 px-6 md:px-44 py-8">
      <Flash flash={flash} />
      <div className="flex flex-wrap justify-evenly items-center">
        {product.photo?.length > 0 && (
          <ImageSlider
            props={product?.photo}
            className="rounded-xl md:min-w-350 md:max-w-xs self-center mt-4"
          />
        )}
        <div className="font-sans py-14">
          <p className="text-4xl py-2">{product.name}</p>
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
          <p className="text-3xl py-2">
            {product.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>

          <p className="text-xl py-2">Category : {product?.category?.name}</p>
          <p className="text-xl py-2">
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
                  className="bg-white text-black border-black border-2 rounded p-3.5 mr-2.5"
                  value={p}
                  onClick={(e) => {
                    console.log(e.target.value);
                    setColor(e.target.value);
                    setFlash({
                      message: "Color selected",
                      bg: "bg-green-500",
                    });

                    showFlash();
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <p className="text-2xl pt-2">Available sizes</p>
          <div className="sizes py-3.5">
            {product.size?.map((p) => {
              return (
                <button
                  key={p}
                  value={p}
                  className="bg-white text-black border-black  border-2 rounded p-3.5 mr-2.5"
                  onClick={(e) => {
                    setSize(e.target.value);
                    setFlash({
                      message: "Size selected",
                      bg: "bg-green-500",
                    });

                    showFlash();
                  }}
                >
                  {p}
                </button>
              );
            })}

            <button
              key="custom"
              value="Custom"
              className="bg-white text-black border-black  border-2 rounded p-3.5 mr-2.5"
              onClick={(e) => {
                router.push(`/customize?pid=${product._id}`);
              }}
            >
              Custom
            </button>
          </div>
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
          <label htmlFor="quantity" className="text-2xl mr-4">
            Features:
          </label>
          <ul className="list-disc ml-6">
            {product.features?.map((feature, index) => {
              return <li key={index}>{`${feature}`}</li>;
            })}
          </ul>

          <br />

          <label htmlFor="quantity" className="text-2xl mr-4">
            Description:
          </label>
          <br />
          <p>{product.description}</p>
          <br />
          <Button value="Add to cart" bg="bg-green-500" onClick={addToCart} />
        </div>
      </div>
      <div className="md:py-32">
        <p className="text-3xl">
          What people who bought this product have to say...
        </p>
        {/* reviews */}
        {reviews?.map((rev) => {
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
                The quality is premium. Absolutely loved it. Great website too.
              </div>
            </div>
          </div>;
        })}
        <form onSubmit={createReview} className="py-6 border-black">
          <p>Post a review. Let us know how you liked the jacket!</p>
          <textarea
            type="text"
            className="min-w-full border-slate-600 border-2 border-dotted rounded my-2"
            placeholder="What do you think?"
            value={reviewText} // Assuming you have 'reviewText' in your component state
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <Button value="Post Review" bg="bg-green-500" color="black" />
        </form>

        <hr />
        <div className="row container similar-products">
          <h4 className="categories-heading">Similar Products </h4>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div
            className={`grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 best-seller`}
          >
            {relatedProducts?.map((p) => (
              <div className="container bg-white p-2" key={p._id}>
                <img className="img-fluid" src={p.photo[0].url} alt="p.name" />
                <h6>{p.name}</h6>
                <h5>
                  {p.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h5>

                <button
                  className="inline-block align-center text-center"
                  onClick={() => router.push(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <br />

                <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
