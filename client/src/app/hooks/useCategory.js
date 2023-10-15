import { useState, useEffect } from "react";
import axiosInstance from "./axiosinstance";

export default async function useCategory() {
  const [categories, setCategories] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
      const {data} = await axiosInstance.get("/api/v1/category/get-category");
      setCategories(data.category);

      console.log(categories)
      
    } catch (error) {
      console.log(error);
    }
  };

  return categories;
}
