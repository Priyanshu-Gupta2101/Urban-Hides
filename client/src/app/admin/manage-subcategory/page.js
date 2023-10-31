"use client";
import Button from "@/app/components/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/auth";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";

const ManageSubCategory = () => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [auth] = useAuth();
  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });

  const createSubCategory = async (subcategory) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}api/v1/subcategory/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ categoryId: category, name: subcategory }),
        }
      );
      const data = await response.json();
      setSubcategory("");
      fetchCategories();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSubCategory = async (categoryName, id) => {
    try {
      const repsonse = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}api/v1/subcategory/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ name: categoryName }),
        }
      );
      const data = await repsonse.json();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSubCategory = async (cid, subid) => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}api/v1/subcategory/delete/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ categoryId: cid, subcategoryId: subid }),
        }
      );

      const data = await res.json();

      if (data.success) {
        fetchCategories();
        setLoading(false);

        setFlash({
          message: "Subcategory deleted successfully",
          bg: "bg-green-500",
        });
      } else {
        setFlash({
          message: "Subcategory deleted unsuccessfully",
          bg: "bg-green-500",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      showFlash();
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}api/v1/category/get-category`
      );
      const data = await response.json();

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
      <Flash flash={flash} />
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
