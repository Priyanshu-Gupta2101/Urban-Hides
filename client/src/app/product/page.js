"use client";
import { AiOutlineReload } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import "../home.css";
import axiosInstance from "../hooks/axiosinstance";
import { Prices } from "../components/Prices";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

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
    if (!checked.length || !radio.length || !subcategory.length)
      getAllProducts();
  }, [checked.length, radio.length, subcategory.length]);

  useEffect(() => {
    if (checked.length || radio.length || subcategory.length) filterProduct();
  }, [checked, radio, subcategory]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axiosInstance.post(
        "/api/v1/product/product-filters",
        {
          checked,
          radio,
          subcategory,
        }
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    const selectedCategory = categories.find((cat) => cat.name === checked);

    const categorySubcategories = selectedCategory
      ? selectedCategory.subcategories
      : [];

    setSubcategories(categorySubcategories);
    setSubcategory("");
  }, [checked, categories]);

  return (
    <>
      <div className={`flex justify-around m-2`}>
        <div className="d-flex flex-column">
          <select
            className="p-2 m-2 border-2 border-grey-300"
            onChange={(e) => setRadio(e.target.value)}
          >
            <option value="" disabled>
              Select your option
            </option>
            {Prices?.map((p) => (
              <option key={`price-${p._id}`} value={p.array}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            name="categories-range"
            value={checked}
            className="p-2 m-2 border-2 border-grey-300"
            onChange={(e) => handleFilter(e.target.value, e.target.key)}
          >
            <option value="" disabled>
              Select your option
            </option>
            {categories.map((c) => (
              <option key={`category-${c._id}`} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="p-2 m-2 border-2 border-grey-300"
            disabled={!checked} // Disable if no category selected
          >
            <option value="" disabled>
              Select your option
            </option>
            {subcategories.map((subcat) => (
              <option key={subcat._id} value={subcat._id}>
                {subcat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="container-fluid" id="best-seller">
        <div id="best-seller-row">
          {/* <div
            className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
            id="best-seller-row"
          > */}
          <div
            className={`grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4`}
          >
            {products?.map((p) => (
              <div
                className="container bg-white p-2"
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
                        sizes="max-width"
                        alt={p.name}
                      />
                      <h6>{p.name}</h6>
                      <span className="line-through text-gray-500">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                      <span className="text-red-500">
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
