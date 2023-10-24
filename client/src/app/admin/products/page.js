"use client";
import { AiOutlineReload } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { BestSellersList } from "@/app/components/BestSellersList";
import "../../home.css";
import axiosInstance from "@/app/hooks/axiosinstance";
import { Prices } from "@/app/components/Prices";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/button";

export default function Products() {
  const router = useRouter();
  // const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState("");
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/category/get-category");
      setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(...data?.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    setChecked(value);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    console.log("Checking");
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axiosInstance.post(
        "/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      console.log("HERE");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`flex justify-around m-2`}>
        {/* <form>
          <select
            name="price-range"
            id=""
            className="p-2 m-2 border-2 border-grey-300"
          >
            <option value="10-19">$10-$19</option>
            <option value="20-29">$20-$29</option>
            <option value="30-39">$30-$39</option>
          </select>
        </form> */}
        <div className="d-flex flex-column">
          <select
            className="p-2 m-2 border-2 border-grey-300"
            onChange={(e) => setRadio(e.target.value)}
          >
            {Prices?.map((p) => (
              <option key={p._id} value={p.array}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            name="categories-range"
            id=""
            className="p-2 m-2 border-2 border-grey-300"
            onChange={(e) => handleFilter(e.target.value, e.target.key)}
          >
            {categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="container-fluid" id="best-seller">
        <div id="best-seller-row">
          <Link href="/admin/create-product">
            <Button value="Create Product" bg="bg-black" color="text-white" />
          </Link>
          {/* <div
            className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
            id="best-seller-row"
          > */}
          <div
            className={`grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 best-seller`}
          >
            {products?.map((p) => (
              <div className="container bg-white p-2" key={p._id}>
                <img
                  className="img-fluid"
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

                <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    router.push(`update-product/${p.slug}`);
                  }}
                >
                  Update
                </button>
                <br />
                <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    router.push(`delete-product/${p.slug}`);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
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
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
