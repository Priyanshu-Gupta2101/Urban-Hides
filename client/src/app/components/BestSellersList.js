"use client";
import React, { useEffect, useState } from "react";
import Product from "./product";
import axiosInstance from "../hooks/axiosinstance";

export const BestSellersList = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const { data } = await axiosInstance.get(
      `/api/v1/product/best-sellers?skip=${0}&limit=${8}`
    );
    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {products.map((product) => (
        <Product
          image={`${product.photo[0].url}`}
          key={product._id}
          {...product}
        />
      ))}
    </>
  );
};
