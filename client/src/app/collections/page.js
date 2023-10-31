"use client";
import { AiOutlineReload } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import "../home.css";
import axiosInstance from "../hooks/axiosinstance";
import { useRouter, useSearchParams } from "next/navigation";
import Product from "../components/product";

export default function Products() {
  const router = useRouter();
  const params = useSearchParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [count, setcount] = useState(0);

  useEffect(() => {
    getProduct();
  }, [page, params]);

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
      setcount(data?.count);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container-fluid" id="best-seller">
        {products?.length ? (
          <div id="best-seller-row">
            <div
              className={`grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4`}
            >
              {products?.map((p) => (
                <Product image={`${p.photo[0].public_id}`} key={p._id} {...p} />
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < count && (
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
        ) : (
          <div>Coming Soon ....</div>
        )}
      </div>
    </>
  );
}
