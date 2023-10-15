"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "../../hooks/axiosinstance";
import { useCart } from "@/app/context/cart";
import "@/app/home.css";

const CategoryProduct = () => {
  const params = useParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid mt-3 category">
      <h4 className="text-center">Category - {category?.name}</h4>
      <h6 className="text-center">{products?.length} result found </h6>
      <div
        className={`grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 best-seller`}
      >
        {products?.map((p) => (
          <div className="container bg-white p-2" key={p._id}>
            <img
              src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
              className="img-fluid"
              alt={p.name}
            />
            <h6>{p.name}</h6>
            <h6>
              {p.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h6>
            <br />
            <p className="card-text ">{p.description.substring(0, 60)}...</p>

            <button
              className="inline-block align-center text-center"
              onClick={() => router.push(`/product/${p.slug}`)}
            >
              More Details
            </button>
            <br />
            <button
              className="inline-block align-center text-center"
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
      {/* <div className="m-2 p-3">
                {products && products.length < total && (
                <button
                    className="btn btn-warning"
                    onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                    }}
                >
                    {loading ? "Loading ..." : "Loadmore"}
                </button>
                )}
            </div> */}
    </div>
  );
};

export default CategoryProduct;
