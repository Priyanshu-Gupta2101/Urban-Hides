"use client";
import Button from "@/app/components/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/auth";
import axiosInstance from "../../hooks/axiosinstance";

const ManageSubCategory = () => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [auth] = useAuth();

  const createSubCategory = async (subcategory) => {
    setLoading(true);
    try {
      console.log(category);
      const { data } = await axiosInstance.post(
        "/api/v1/subcategory/create",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
        { categoryId: category, name: subcategory }
      );
      setSubcategory("");
      setCategory("");
      fetchCategories();
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSubCategory = async (categoryName, id) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/v1/subcategory/update/${id}`,
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

  const deleteSubCategory = async (cid, subid) => {
    setLoading(true);
    console.log(cid);
    try {
      const { data } = await axiosInstance.delete(
        `/api/v1/subcategory/delete/`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
        {
          categoryId: cid,
          subcategoryId: subid,
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
      <p className="text-3xl text-center">Manage Subcategory</p>
      <hr className="my-6 border-black" />
      <div className="grid place-items-center">
        <p className="text-center">Create new subcategory</p>
        <label className="text-2xl">Select category</label>
        <br />
        <select defaultValue="" onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            Select your option
          </option>
          {categories.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="border-2 border-black h-10 my-2.5"
        />
        <br />
        <Button
          value="Submit"
          bg="bg-black"
          onClick={() => createSubCategory(subcategory)}
          color="text-white"
        />
      </div>
      <hr className="my-6 border-black" />
      <div>
        <p className="text-4xl py-7 text-center">Categories</p>
        <p className="text-center text-gray-500 pb-4">
          Click on the name to edit the category or press delete to delete it.
        </p>
        <div className="grid grid-cols-3 gap-5 py-3 place-items-center">
          <p className="text-xl">Category</p>
          <p className="text-xl">SubCategory</p>
        </div>
        {categories.length > 0 &&
          categories.map((category) => {
            return (
              <div className="px-10 py-5">
                <p>{category.name}</p>
                <div
                  key={category._id}
                  className="grid grid-cols-3 gap-5 py-5 place-items-center"
                >
                  {category.subcategories &&
                    category.subcategories.length > 0 &&
                    category.subcategories.map((subcategory) => {
                      return (
                        <div key={subcategory._id}>
                          <input
                            type="text"
                            defaultValue={subcategory.name}
                            onChange={(e) =>
                              updateSubCategory(e.target.value, category._id)
                            }
                            className="text-center py-2 rounded"
                            key={subcategory._id}
                          />
                          <div>
                            {/* <Button value="Save Edit" bg="bg-black" color="text-white" /> */}
                            <Button
                              value="Delete"
                              onClick={() =>
                                deleteSubCategory(category._id, subcategory._id)
                              }
                              bg="bg-red-500"
                              color="text-white"
                              className="pl-4"
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ManageSubCategory;
