"use client";
import Button from "@/app/components/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/auth";
import { useRouter } from "next/navigation";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";

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
  const [page, setPage] = useState(1);
  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}api/v1/product/create-product`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
        if (response.status === 201) {
            router.push("/admin/products");
        } else {
            throw data;
        }
    } catch (err) {
        setFlash({
            message: err.error,
            bg: "bg-red-500",
        });
        showFlash();
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
      const frontImage = document.getElementById("front");
      frontImage.src = URL.createObjectURL(evt.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onloadend = () => {
        setFrontImages(reader.result);
      };
    }
  };
  const handleBackChange = (evt) => {
    if (evt.target.files) {
      const backImage = document.getElementById("back");
      backImage.src = URL.createObjectURL(evt.target.files[0]);
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
    <div className="grid place-items-center py-8">
      <Flash flash={flash}/>
      <p className="text-4xl">Create Product</p>
      <form
        className="my-8 [&>*]:my-4 p-4 md:min-w-600 md:p-8 rounded"
        encType="multipart/form-data"
      >
        <div className="max-h-96 min-h-350 overflow-y-scroll border-y-2 py-4 pl-1">
          {page === 1 && (
            <>
              <p className="underline mb-4">Step 1</p>
              <label className="text-2xl">Select category</label>
              <br />
              <select
                className="my-4 p-2 rounded border bg-gray-100"
                value={category}
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
              <br />
              {/* Subcategory select field */}
              <label className="text-2xl">Select subcategory</label>
              <br />
              <select
                value={subcategory}
                className="my-4 p-2 rounded border bg-gray-100"
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
                className="p-2 rounded border bg-gray-100"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <textarea
                className="p-2 rounded my-4 border bg-gray-100"
                defaultValue={description}
                placeholder="Write description of product"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <br />
              <input
                type="number"
                className="p-2 rounded mb-4 border bg-gray-100"
                placeholder="Price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <br />
            </>
          )}
          {page === 2 && (
            <>
              <p className="underline">Step 2</p>
              <br />
              <img
                id="front"
                src="/front.jpg"
                className="w-40"
                alt="Front image of product"
              />
              <br />
              <label className="p-2 border-2 bg-slate-200 rounded">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFrontChange}
                  className="hidden"
                />
                Front image of product | Click to upload
              </label>
              <br />
              <img
                id="back"
                className="w-40 my-4"
                src="/back.jpg"
                alt="Back image of product"
              />
              <label className="p-2 border-2 bg-slate-200 rounded">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBackChange}
                  className="hidden"
                />
                Back image of product | Click to upload
              </label>
              <br />
            </>
          )}
          {page === 3 && (
            <>
              <p className="underline">Step 3</p>
              <input
                type="number"
                className="p-1 my-7 border-2 border-slate-400 rounded"
                name="quantity"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <br />
              <label>Shipping availiable?</label>
              <br />
              <select
                className="p-1 my-4"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
              <br />

              <label>Is Best Selling?</label>
              <br />
              <select
                className="p-1 my-4"
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
                    className="p-1 my-7 border-2 border-slate-400 rounded"
                    name="size"
                    placeholder="Small.."
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                  />
                </label>
                <br />
                <Button
                  value="Add"
                  onClick={(e) => {
                    e.preventDefault();
                    addSize();
                  }}
                  bg="bg-green-500"
                  color="text-white"
                />
                <Button
                  value="Clear All"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSizes([]);
                  }}
                  bg="bg-red-500"
                  color="text-white"
                />
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
                    className="p-1 my-7 border-2 border-slate-400 rounded"
                    name="color"
                    placeholder="Black, ..."
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                  />
                </label>
                <br />
                <Button
                  value="Add"
                  onClick={(e) => {
                    e.preventDefault();
                    addColor();
                  }}
                  bg="bg-green-500"
                  color="text-white"
                />
                <Button
                  value="Clear All"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColors([]);
                  }}
                  bg="bg-red-500"
                  color="text-white"
                />
              </div>
              <div>
                <strong>Selected Colors:</strong>
                <ul>
                  {selectedColors.map((color, index) => (
                    <li key={index}>{color}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
          {page === 4 && (
            <>
              <p className="underline">Step 4</p>
              <div>
                <h3 className="text-xl my-4">Product Features</h3>
                <label>
                  Enter a feature:
                  <br />
                  <input
                    type="text"
                    className="p-1 my-4 border-2 border-slate-400 rounded"
                    name="feature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                  />
                </label>
                <br />
                <Button
                  value="Add"
                  onClick={(e) => {
                    e.preventDefault();
                    addFeature();
                  }}
                  bg="bg-green-500"
                  color="text-white"
                />
              </div>
              <p className="my-4 text-xl">Added features</p>
              <ul className="list-inside list-disc">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <br />
            </>
          )}
        </div>
        <Button
          value="&larr; Back"
          onClick={(e) => {
            e.preventDefault();
            if (page > 1) {
              setPage(page - 1);
            }
          }}
          bg="bg-black"
          color="text-white"
        />
        <Button
          value="Next &rarr;"
          onClick={(e) => {
            e.preventDefault();
            if (page < 4) {
              setPage(page + 1);
            }
          }}
          bg="bg-black"
          color="text-white"
        />
        <Button
          value="Create product"
          onClick={onSubmit}
          bg="bg-black"
          color="text-white"
        />
      </form>
    </div>
  );
};

export default CreateProduct;
