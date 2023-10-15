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
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [auth, setAuth] = useAuth();

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/category/get-category");
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
      setID(data.data.product._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProduct(props.params.slug);
  }, []);

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      setPhoto(evt.target.files[0]);
    }
  };

  const updateProduct = async (id) => {
    console.log(id);
    const formData = new FormData();

    formData.append("category", category);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("shipping", shipping);
    if (photo) formData.append("photo", photo, photo.name);

    try {
      console.log(auth?.token);
      const response = await axiosInstance.put(
        `http://127.0.0.1:8080/api/v1/product/update-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
        {
          formData,
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
    updateProduct(id);
  };

  return (
    <div className="grid place-items-center py-12">
      <p className="text-4xl">Update product {props.params.slug}</p>
      <form
        className="md:w-96 my-4 [&>*]:my-4 p-6 shadow-2xl rounded"
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(id);
        }}
      >
        <label className="text-2xl">Select category</label>
        <br />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
        <br />
        <input
          className="p-1 my-7 border-2 border-slate-400"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <textarea
          className="p-1 my-7 border-2 border-slate-400"
          defaultValue={description}
          placeholder="Write description of product"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <input
          type="number"
          className="p-1 my-7 border-2 border-slate-400"
          placeholder="Price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <label>Update image of product </label>
        <input type="file" onChange={handleFileChange} />
        <br />
        <input
          type="number"
          className="p-1 my-7 border-2 border-slate-400"
          name="quantity"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <br />
        <label>Shipping availiable?</label>
        <br />
        <select value={shipping} onChange={(e) => setShipping(e.target.value)}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
        <br />
        <Button value="Update product" bg="bg-black" color="text-white" />
      </form>
    </div>
  );
};

export default UpdateProduct;
