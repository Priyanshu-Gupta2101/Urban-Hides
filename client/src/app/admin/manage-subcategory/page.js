"use client";
import Button from "@/app/components/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/auth";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";
import { AiFillDelete } from "react-icons/ai";

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
        <p className="text-center text-2xl">Create new subcategory</p>
        <label className="my-4">Select category</label>
        <br />
        <select
          defaultValue=""
          className="p-1 bg-gray-100 border-2 border-black"
          onChange={(e) => setCategory(e.target.value)}
        >
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
          className="border-2 border-black h-10 my-4"
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
        <div className="overflow-x-scroll">
          <p className="text-4xl py-7 text-center">Subcategories</p>
          <p className="text-center text-gray-500 pb-4">
            To change a subcategory, delete it and create a new one.
          </p>
          <table className="table-auto md:table-fixed w-full text-center my-4">
            <tbody>
              <tr className="md:text-xl">
                <th className="py-4 border">Category name</th>
                <th className="border">SubCategory 1</th>
                <th className="border">SubCategory 2</th>
                <th className="border">SubCategory 3</th>
                <th className="border">SubCategory 4</th>
              </tr>
              {categories?.length > 0 &&
                categories.map((category) => {
                  return (
                    <tr>
                      <td className="py-8 font-bold border">{category.name}</td>
                      {category.subcategories?.length > 0 &&
                        category.subcategories.map((subcategory) => {
                          return (
                            <td className="border">
                              <span className="px-4 float-none">{subcategory.name}</span>
                              <span className="float-right mr-2.5">
                              <AiFillDelete 
                              className="cursor-pointer"
                                onClick={() =>
                                  deleteSubCategory(
                                    category._id,
                                    subcategory._id
                                  )
                                }
                              />
                              </span>
                            </td>
                          );
                        })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageSubCategory;
