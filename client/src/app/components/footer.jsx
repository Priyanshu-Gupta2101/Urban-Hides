import React, { useState } from "react";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";
import axiosInstance from "../hooks/axiosinstance";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";
import Link from "next/link";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });

  const handleCleanUp = () => {
    setEmail("");
    setMessage("");
    setFlash({
      message: "",
      bg: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/api/v1/subscribe", { email });
      setMessage("Successfully subscribed to the newsletter!");
      setFlash({
        message: message,
        bg: "bg-green-500",
      });
      handleCleanUp();
    } catch (error) {
      setMessage(
        "Could not subscribe to the newsletter. Please try again later."
      );
      setFlash({
        message: message,
        bg: "bg-red-500",
      });

      handleCleanUp();
    }

    showFlash();
  };

  return (
    <div className="footer bg-gray-100 py-10 px-4">
      <Flash flash={flash} />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row lg:flex-row gap-6">
          <div className="text-gray-600 basis-1/2">
            <h1 className="text-lg font-semibold mb-4">About</h1>
            <span>
              Welcome to UrbanHides, where leather craftsmanship meets style.
              With our expertise, we offer a diverse collection of meticulously
              crafted leather jackets. Personalize your own custom jacket and
              join our leather-loving community today
            </span>
          </div>
          <div className="text-gray-600 basis-1/6">
            <h1 className="text-lg font-semibold mb-4">Categories</h1>
            <div className="flex justify-center flex-col">
              <Link href="/">Women</Link>
              <Link href="/">Men</Link>
              <Link href="/">Kids</Link>
              <Link href="/">Accessories</Link>
            </div>
          </div>

          <div className="text-gray-600 basis-1/6">
            <h1 className="text-lg font-semibold mb-4">Links</h1>
            <div className="flex justify-center flex-col">
              <Link href="/faq">FAQ</Link>
              <Link href="/size-guide">Size Guide</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/policy">Policy</Link>
            </div>
          </div>
          <div className="text-gray-600 basis-1/4">
            <h1 className="text-lg font-semibold mb-4">
              Stay Updated with Our Newsletter
            </h1>
            <span>
              Join our community for exclusive updates delivered straight to
              your inbox.
            </span>
            <form onSubmit={handleSubmit} className="pt-2">
              <div className="flex items-center max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="py-2 px-4 w-full rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex gap-3 flex-col md:flex-row lg:flex-row justify-between mt-8">
          <div className="flex flex-center">
            <Link href="/">
              <span>
                <img className="h-9 w-auto" src="/UH_Logo.svg" alt="" />
              </span>
            </Link>

            <span className="text-black-500 font-bold text-xl">
              <Link href="/">UrbanHides</Link>
            </span>
          </div>
          <div className="flex flex-center">
            <span className="text-gray-600 text-sm ml-4">
              © Copyright 2023. All Rights Reserved
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <FaCcVisa className="text-blue-500 text-4xl" />
            <FaCcMastercard className="text-red-500 text-4xl" />
            <FaCcAmex className="text-green-500 text-4xl" />
            <FaCcPaypal className="text-blue-700 text-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
