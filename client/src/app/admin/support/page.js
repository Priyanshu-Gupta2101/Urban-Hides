"use client";
import React, { useState } from "react";
import { RiMailLine, RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginBox() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg p-8 shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 flex items-center"
          >
            <RiMailLine className="mr-2" /> Email ID:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value="priyanshulahs@gmail.com"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            disabled
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 flex items-center"
          >
            <RiLockPasswordLine className="mr-2" /> Password:
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value="urbanpassword"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              disabled
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginBox;
