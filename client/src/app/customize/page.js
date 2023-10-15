"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "./../hooks/axiosinstance";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";
import { useAuth } from "../context/auth";
import { useSearchParams } from "next/navigation";

const CustomizedOrderForm = () => {
  const [auth, setAuth] = useAuth();
  const searchParams = useSearchParams();

  const productId = searchParams.get("pid");
  const [clothingDetails, setClothingDetails] = useState({
    neckround: "",
    chest: "",
    waistStomach: "",
    shoulder: "",
    vestLength: "",
  });
  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    shippingAddress: "",
  });
  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });

  const handleChangeClothingDetails = (e) => {
    const { name, value } = e.target;
    setClothingDetails({ ...clothingDetails, [name]: value });
  };

  const handleChangeBuyerInfo = (e) => {
    const { name, value } = e.target;
    setBuyerInfo({ ...buyerInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { data } = axiosInstance.post(
        "/api/v1/product/custom",
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
        {
          product: productId,
          user: auth?.user._id,
          clothingDetails: clothingDetails,
          buyer: buyerInfo,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const setBuyerDetails = () => {
    if (auth) {
      setBuyerInfo({
        name: auth.user?.name,
        email: auth.user?.email,
        address: auth.user?.address,
        phone: auth.user?.phone,
      });
    }
  };

  useEffect(() => {
    setBuyerDetails();
  }, [auth]);
  return (
    <div className="flex justify-center items-center w-5xl">
      <form
        className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 m-10 p-4 bg-white shadow-lg rounded-lg max-w-4xl"
        onSubmit={handleSubmit}
      >
        <Flash flash={flash} />
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Clothing Details</h3>
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
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Buyer Information</h3>
          <label className="block mt-2 text-gray-600">Buyer Name:</label>
          <input
            type="text"
            name="name"
            value={buyerInfo.name}
            onChange={handleChangeBuyerInfo}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />
          <label className="block mt-2 text-gray-600">Email ID:</label>
          <input
            type="email"
            name="email"
            value={buyerInfo.email}
            onChange={handleChangeBuyerInfo}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />
          <label className="block mt-2 text-gray-600">Phone No.:</label>
          <input
            type="tel"
            name="phone"
            value={buyerInfo.phone}
            onChange={handleChangeBuyerInfo}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />
          <label className="block mt-2 text-gray-600">Shipping Address:</label>
          <textarea
            name="shippingAddress"
            value={buyerInfo.shippingAddress}
            onChange={handleChangeBuyerInfo}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CustomizedOrderForm;
