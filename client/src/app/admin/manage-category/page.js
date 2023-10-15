"use client";
import Button from "@/app/components/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/auth";
import axiosInstance from "../../hooks/axiosinstance";

const ManageCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [auth] = useAuth();

  const createCategory = async (categoryName) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(
        "/api/v1/category/create-category",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
        {
          name: categoryName,
        }
      );

      console.log(data);
      setCategoryName("");
      fetchCategories();
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (categoryName, id) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/v1/category/update-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
        {
          name: categoryName,
        }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.delete(
        `/api/v1/category/delete-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(data);
      fetchCategories();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/category/get-category");
      console.log(data.category);
      setCategories(data.category);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="py-12">
      <p className="text-3xl text-center">Manage category</p>
      <hr className="my-6 border-black" />
      <div className="grid place-items-center">
        <p className="text-center">Create new category</p>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border-2 border-black h-10 my-2.5"
        />
        <br />
        <Button
          value="Submit"
          bg="bg-black"
          onClick={() => createCategory(categoryName)}
          color="text-white"
        />
      </div>
      <hr className="my-6 border-black" />
      <div>
        <p className="text-4xl py-7 text-center">Categories</p>
        <p className="text-center text-gray-500 pb-4">
          Click on the name to edit the category or press delete to delete it.
        </p>
        <div className="grid grid-cols-2 gap-5 py-3 place-items-center">
          <p className="text-2xl">Name</p>
          <p className="text-2xl">Action</p>
        </div>
        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <div
                key={category._id}
                className="grid grid-cols-2 gap-5 py-5 place-items-center"
              >
                <input
                  type="text"
                  defaultValue={category.name}
                  onChange={(e) => updateCategory(e.target.value, category._id)}
                  className="text-center py-2 rounded"
                />
                <div className="flex">
                  {/* <Button value="Save Edit" bg="bg-black" color="text-white" /> */}
                  <Button
                    value="Delete"
                    onClick={() => deleteCategory(category._id)}
                    bg="bg-red-500"
                    color="text-white"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ManageCategory;
