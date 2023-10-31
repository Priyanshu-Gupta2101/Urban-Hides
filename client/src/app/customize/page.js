"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "./../hooks/axiosinstance";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";
import { useAuth } from "../context/auth";
import { useSearchParams } from "next/navigation";
import PayPalPayment from "../components/PayPalPayment";
import Link from "next/link";

const CustomizedOrderForm = () => {
  const [custom, setCustom] = useState(1);
  const params = useSearchParams();
  const [productId, setProductId] = useState(params.get("pid"));
  const [cart, setCart] = useState({
    product: productId,
    clothingDetails: {},
  });
  const [auth, setAuth] = useAuth();

  const [clothingDetails, setClothingDetails] = useState({
    neckround: "",
    chest: "",
    waistStomach: "",
    shoulder: "",
    vestLength: "",
    size: "",
    color: "",
  });

  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });

  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const discount = 20;
  const [user, setUser] = useState({});
  const [shipping, setShipping] = useState(35);
  const [product, setProduct] = useState([]);

  const fetchProfile = async () => {
    if (auth?.token !== "") {
      const { data } = await axiosInstance.get(`/api/v1/auth/profile/`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setUser(data);
      setAddress(data.address);
      setPhone(data.phone);
    }
  };

  const handleChangeClothingDetails = (e) => {
    const { name, value } = e.target;
    setClothingDetails({ ...clothingDetails, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = axiosInstance.post(
  //       "/api/v1/product/custom",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${auth?.token}`,
  //         },
  //       },
  //       {
  //         product: productId,
  //         user: auth?.user._id,
  //         clothingDetails: clothingDetails,
  //         buyer: buyerInfo,
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = () => {
    try {
      setCart({
        clothingDetails: clothingDetails,
      });
      setFlash({
        message: "Clothing details set",
        bg: "bg-green-500",
      });
    } catch (error) {
      console.log(error);
      setFlash({
        message: "Clothing details Not set",
        bg: "bg-green-500",
      });
    } finally {
      showFlash();
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      product.map((item) => {
        total += item.price * item.quantity;
      });

      return total;
    } catch (error) {
      console.log(error);
    }
  };
  const calculateDiscountedPrice = (originalPrice) => {
    const discountedPrice = originalPrice + (originalPrice * 20) / 100;
    return Number(discountedPrice.toFixed(2));
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/product/get-product-by-ID/${productId}`
      );
      if (data.success) {
        setProduct(data.product);
      } else {
        setFlash({
          message: "Something went wrong on line 115: 126",
          bg: "bg-red-500",
        });
      }
    } catch (error) {
      console.log(error);
      setFlash({
        message: "Something went wrong with product fetching",
        bg: "bg-red-500",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchProduct();
  }, [auth]);

  return (
    <div className="flex justify-center items-center w-5xl">
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 m-10 p-4 bg-white shadow-lg rounded-lg max-w-4xl">
        <Flash flash={flash} />
        <div className="mb-4">
          <h3 className="text-xl font-semibold">
            Clothing Details (in inches)
          </h3>
          <Link
            className="text-blue-500 text-md hover:underline"
            // onClick={openModal}
            href="/size-guide"
          >
            Checkout our Size Guide
          </Link>
          <label className="block mt-2 text-gray-600">Neckround:</label>
          <input
            type="text"
            name="neckround"
            value={clothingDetails.neckround}
            onChange={handleChangeClothingDetails}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />
          <label className="block mt-2 text-gray-600">Chest:</label>
          <input
            type="text"
            name="chest"
            value={clothingDetails.chest}
            onChange={handleChangeClothingDetails}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />
          <label className="block mt-2 text-gray-600">
            Waist/Stomach Measurements:
          </label>
          <input
            type="text"
            name="waistStomach"
            value={clothingDetails.waistStomach}
            onChange={handleChangeClothingDetails}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />
          <label className="block mt-2 text-gray-600">Shoulder:</label>
          <input
            type="text"
            name="shoulder"
            value={clothingDetails.shoulder}
            onChange={handleChangeClothingDetails}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />
          <label className="block mt-2 text-gray-600">Vest Length:</label>
          <input
            type="text"
            name="vestLength"
            value={clothingDetails.vestLength}
            onChange={handleChangeClothingDetails}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />
          <label className="block mt-2 text-gray-600">Size:</label>
          <input
            type="text"
            name="size"
            value={clothingDetails.size}
            onChange={handleChangeClothingDetails}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />

          <label className="block mt-2 text-gray-600">Color:</label>
          <input
            type="text"
            name="color"
            value={clothingDetails.color}
            onChange={handleChangeClothingDetails}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Buyer Information</h3>
          <label className="block mt-2 text-gray-600">Buyer Name:</label>
          <input
            type="text"
            id="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />
          <label className="block mt-2 text-gray-600">Email ID:</label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />
          <label className="block mt-2 text-gray-600">Phone No.:</label>
          <input
            type="tel"
            id="phone"
            value={user.phone}
            onChange={(e) => {
              setUser({ ...user, phone: e.target.value });
              setPhone(e.target.value);
            }}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />
          <label className="block mt-2 text-gray-600">Shipping Address:</label>
          <textarea
            id="address"
            defaultValue={user.address}
            onChange={(e) => {
              setUser({ ...user, address: e.target.value });
              setAddress(e.target.value);
            }}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none"
        >
          Submit Order
        </button>
      </div>
      <div className="p-12 bg-slate-100">
        <p className="text-slate-500">Price details</p>
        <hr className="my-2" />
        {product?.length > 0 ? (
          <div>
            <table className="w-full mb-2">
              <tbody>
                <tr>
                  <td className="py-2">Price</td>
                  <td className="text-right">
                    ${calculateDiscountedPrice(totalPrice())}
                  </td>
                </tr>
                <tr>
                  <td className="py-2">Delivery</td>
                  <td className="text-right text-green-500">
                    {totalPrice() > 500 ? "Free" : `$${shipping}`}
                  </td>
                </tr>
                <tr>
                  <td className="py-2">Discount</td>
                  <td className="text-right text-green-500">{discount}%</td>
                </tr>
                <tr className="border-y-2">
                  <td className="py-2 font-bold">Total</td>
                  <td className="text-right font-bold">
                    ${totalPrice() > 500 ? totalPrice() : totalPrice() + 35}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <div
              id="extra-info"
              className="mt-8 p-4 border border-gray-300 rounded"
            >
              <p className="text-2xl font-bold mb-4">Shipping Information</p>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={user.phone}
                  onChange={(e) => {
                    setUser({ ...user, phone: e.target.value });
                    setPhone(e.target.value);
                  }}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shipping Address
                </label>
                <textarea
                  id="address"
                  className="mt-1 p-2 w-full border rounded-md h-32"
                  defaultValue={user.address}
                  onChange={(e) => {
                    setUser({ ...user, address: e.target.value });
                    setAddress(e.target.value);
                  }}
                ></textarea>
              </div>
            </div> */}
          </div>
        ) : (
          <p className="text-2xl text-gray-600 my-4">Nothing to show</p>
        )}

        {auth.token ? (
          <div className="py-10">
            {product?.length !== 0 && user.address && user.phone && (
              <PayPalPayment
                custom={custom}
                token={auth.token}
                products={cart}
                total={totalPrice() > 500 ? totalPrice() : totalPrice() + 35}
                phone={user.phone}
                address={user.address}
              />
            )}
            {/* <Button
            value="Checkout"
            onClick={placeOrder}
            bg="bg-green-500"
            color="text-white"
          /> */}
          </div>
        ) : (
          <div>Login required</div>
        )}
      </div>
    </div>
  );
};

export default CustomizedOrderForm;
