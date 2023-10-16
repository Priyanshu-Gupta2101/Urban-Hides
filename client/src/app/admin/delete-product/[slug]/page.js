"use client";
import Button from "@/app/components/button";
import { useAuth } from "@/app/context/auth";
import axiosInstance from "@/app/hooks/axiosinstance";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const UpdateProduct = (props) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState(categories[0]?._id);
  const [categoryName, setCategoryName] = useState(categories[0]?.name);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("1");
  const [photo, setPhoto] = useState(null);
  const [auth, setAuth] = useAuth();

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://urban-hides.vercel.app/api/v1/category/get-category"
      );
      const data = await response.json();
      console.log(data.category);
      setCategories(data.category);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProduct = async (slug) => {
    try {
      const data = await axiosInstance.get(
        `/api/v1/product/get-product/${slug}`
      );
      console.log(data.data.product);
      setName(data.data.product.name);
      setDescription(data.data.product.description);
      setPrice(data.data.product.price);
      setQuantity(data.data.product.quantity);
      setShipping(data.data.product.shipping);
      setCategory(data.data.product.category._id);
      setCategoryName(data.data.product.category.name);
      setID(data.data.product._id);
      setPhoto(data.data.product.photo[0].url);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProduct(props.params.slug);
  }, []);

  const deleteProduct = async (id) => {
    const formData = new FormData();

    try {
      console.log(auth?.token);
      const response = await fetch(
        `https://urban-hides.vercel.app/api/v1/product/delete-product/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = (id) => {
    deleteProduct(id);
  };

  return (
    <div className="grid place-items-center py-12">
      <p className="text-4xl">Delete product {props.params.slug}</p>
      <form
        className="md:w-96 my-4 [&>*]:my-4 p-6 shadow-2xl rounded"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(id);
        }}
      >
        <p className="text-2xl">Category: {categoryName}</p>
        <p className="text-2xl">Name: {name}</p>
        <p className="text-2xl">Description: {description}</p>
        <p className="text-2xl">Price: {price}</p>
        <p className="text-2xl">Quantity: {quantity}</p>
        <p className="text-2xl">Shipping: {shipping ? `Yes` : `No`}</p>
        <div>
          <img src={photo} />
        </div>
        <Button
          value="Confirm Delete Product"
          bg="bg-red-900"
          color="text-white"
        />
      </form>
    </div>
  );
};

export default UpdateProduct;
