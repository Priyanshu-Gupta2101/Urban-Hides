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
  const [front, setFrontImages] = useState(null);
  const [back, setBackImages] = useState(null);
  const [auth, setAuth] = useAuth();
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const [newSize, setNewSize] = useState("");

  // Function to add a new size to the list
  const addSize = () => {
    if (newSize.trim() !== "") {
      setSelectedSizes([...selectedSizes, newSize]);
      setNewSize("");
    }
  };

  const [newColor, setNewColor] = useState("");

  // Function to add a new color to the list
  const addColor = () => {
    if (newColor.trim() !== "") {
      setSelectedColors([...selectedColors, newColor]);
      setNewColor("");
    }
  };

  // Initialize state to store the list of features
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");

  // Function to add a new feature to the list
  const addFeature = () => {
    if (newFeature.trim() !== "") {
      setFeatures([...features, newFeature]);
      setNewFeature("");
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

  const fetchProduct = async (slug) => {
    try {
      const data = await axiosInstance.get(
        `/api/v1/product/get-product/${slug}`
      );
      setName(data.data.product.name);
      setDescription(data.data.product.description);
      setPrice(data.data.product.price);
      setQuantity(data.data.product.quantity);
      setShipping(data.data.product.shipping);
      setCategory(data.data.product.category._id);
      setID(data.data.product._id);
      setFrontImages(data.data.product.photo[0].url);
      setBackImages(data.data.product.photo[1].url);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProduct(props.params.slug);
  }, []);

  const handleFrontChange = (evt) => {
    if (evt.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onloadend = () => {
        setFrontImages(reader.result);
      };
    }
  };
  const handleBackChange = (evt) => {
    if (evt.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onloadend = () => {
        setBackImages(reader.result);
      };
    }
  };

  const updateProduct = async (id) => {
    const formData = new FormData();

    formData.append("category", category);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("shipping", shipping);
    formData.append("front", front);
    formData.append("back", back);
    formData.append("size", Array.from(selectedSizes));
    formData.append("color", Array.from(selectedColors));
    formData.append("features", Array.from(features));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}api/v1/product/update-product/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();

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
        <br />
        <label>Add front image of product </label>
        <input
          type="file"
          accept="image/*"
          value={front}
          onChange={handleFrontChange}
        />
        <br />
        <label>Add back image of product </label>
        <input
          type="file"
          accept="image/*"
          value={back}
          onChange={handleBackChange}
        />
        <br />
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
        <div>
          <label>
            Enter a size:
            <br />
            <input
              type="text"
              className="p-1 my-7 border-2 border-slate-400"
              name="size"
              placeholder="Small.."
              onChange={(e) => setNewSize(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={addSize}>
            Add
          </button>
        </div>
        <div>
          <button type="button" onClick={() => setSelectedSizes([])}>
            Clear All
          </button>
        </div>
        <div>
          <strong>Selected Sizes:</strong>
          <ul>
            {selectedSizes.map((size, index) => (
              <li key={index}>{size}</li>
            ))}
          </ul>
        </div>
        <br />

        <div>
          <label>
            Enter a color:
            <br />
            <input
              type="text"
              className="p-1 my-7 border-2 border-slate-400"
              name="color"
              placeholder="Black, ..."
              onChange={(e) => setNewColor(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={addColor}>
            Add
          </button>
        </div>
        <div>
          <button type="button" onClick={() => setSelectedColors([])}>
            Clear All
          </button>
        </div>
        <div>
          <strong>Selected Colors:</strong>
          <ul>
            {selectedColors.map((color, index) => (
              <li key={index}>{color}</li>
            ))}
          </ul>
        </div>
        <br />

        <div>
          <h3>Product Features</h3>
          <label>
            Enter a feature:
            <br />
            <input
              type="text"
              className="p-1 my-7 border-2 border-slate-400"
              name="feature"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={addFeature}>
            Add
          </button>
        </div>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <br />
        <Button value="Update product" bg="bg-black" color="text-white" />
      </form>
    </div>
  );
};

export default UpdateProduct;
