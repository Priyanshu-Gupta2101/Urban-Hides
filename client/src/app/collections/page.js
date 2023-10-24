"use client";
import { AiOutlineReload } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import "../home.css";
import axiosInstance from "../hooks/axiosinstance";
import { useRouter, useSearchParams } from "next/navigation";

export default function Products() {
  const router = useRouter();
  const params = useSearchParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProduct();
  }, [page]);

  const getProduct = async () => {
    try {
      setLoading(true);

      const category = params.get("category");
      const subcategory = params.get("subcategory");

      const { data } = await axiosInstance.post(
        `/api/v1/product/product-subcategory`,
        {
          cat: category,
          subcat: subcategory,
          pg: page,
        }
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container-fluid" id="best-seller">
        <div id="best-seller-row">
          <div
            className={`grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 best-seller`}
          >
            {products?.map((p) => (
              <div
                className="container bg-white p-2"
                key={`product-${p._id}`}
                onClick={() => {
                  router.push(`/product/${p.slug}`);
                }}
              >
                <img
                  className="img-fluid cursor-pointer"
                  src={`${process.env.NEXT_PUBLIC_CLOUDINARY_PATH}/${p.photo[0].public_id}.jpg`}
                  alt={p.name}
                />
                <h6>{p.name}</h6>
                <h5>
                  {p.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h5>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
