"use client";
import Button from "@/app/components/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/auth";
import { useRouter } from "next/navigation";
import axiosInstance from "./../../hooks/axiosinstance";

const CreateProduct = () => {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("1");
  const [isBestSelling, setBestSelling] = useState("1");
  const [frontimages, setFrontImages] = useState(null);
  const [backimages, setBackImages] = useState(null);
  const [auth, setAuth] = useAuth();
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

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
      const { data } = await axiosInstance.get(
        "http://127.0.0.1:8080/api/v1/category/get-category"
      );
      setCategories(data.category);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createProduct = async () => {
    const formData = new FormData();

    formData.append("category", category);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("shipping", shipping);
    formData.append("isBestSelling", isBestSelling);
    formData.append("front", frontimages);
    formData.append("back", backimages);
    formData.append("size", Array.from(selectedSizes));
    formData.append("color", Array.from(selectedColors));
    formData.append("features", Array.from(features));
    formData.append("subcategory", subcategory);

    try {
      const response = await axiosInstance.post(
        "http://127.0.0.1:8080/api/v1/product/create-product",
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

  const onSubmit = (e) => {
    e.preventDefault();
    createProduct();
  };

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

  useEffect(() => {
    // Find the selected category object based on its _id
    const selectedCategory = categories.find((cat) => cat._id === category);

    // Extract subcategories from the selected category
    const categorySubcategories = selectedCategory
      ? selectedCategory.subcategories
      : [];

    setSubcategories(categorySubcategories);
    setSubcategory(""); // Reset subcategory when the category changes
  }, [category, categories]);
  return (
    <div className="grid place-items-center py-12">
      <p className="text-4xl">Create product</p>
      <form
        className="md:w-96 my-4 [&>*]:my-4 p-6 shadow-2xl rounded"
        encType="multipart/form-data"
        onSubmit={onSubmit}
      >
        <label className="text-2xl">Select category</label>
        <br />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
        <br />
        {/* Subcategory select field */}
        <label className="text-2xl">Select subcategory</label>
        <br />
        <select
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          disabled={!category} // Disable if no category selected
        >
          <option value="" disabled>
            Select your option
          </option>
          {subcategories.map((subcat) => (
            <option key={subcat._id} value={subcat._id}>
              {subcat.name}
            </option>
          ))}
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
        <label>Add front image of product </label>
        <input type="file" accept="image/*" onChange={handleFrontChange} />
        <br />
        <label>Add back image of product </label>
        <input type="file" accept="image/*" onChange={handleBackChange} />
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

        <label>Is Best Selling?</label>
        <br />
        <select
          value={isBestSelling}
          onChange={(e) => setBestSelling(e.target.value)}
        >
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
        <Button value="Create product" bg="bg-black" color="text-white" />
      </form>
    </div>
  );
};

export default CreateProduct;
