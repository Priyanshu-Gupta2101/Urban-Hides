"use client";
import React, { useState, useEffect } from "react";
import { categories } from "../../../db/categories.js";

import "../home.css";
import useCategory from "../hooks/useCategory";

const CategoriesList = () => {
  // const categories = useCategory()
  // const founddata =
  // const [categories, setCategories] = useState([]);

  // //get cat
  // const getCategories = async () => {
  //   try {
  //     const {data} = await axiosInstance.get("/api/v1/category/get-category");
  //     setCategories(data.category);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getCategories();
  // }, []);

  return (
    <div className="min-w-full border-2" style={{ marginTop: "50px" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((c) => {
          return (
            <div key={c.id} className="category justify-self-center p-0">
              <img src={c.image} alt="" className="img-fluid m-0" />
              <h4 className={`text-center`}>{c.name}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesList;
