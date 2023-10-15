"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useCategory from "../hooks/useCategory";
import SearchBar from "./searchBar";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { useAuth } from "../context/auth";
import axiosInstance from "@/app/hooks/axiosinstance";

export const Navbar2 = () => {
  const [auth, setAuth] = useAuth();
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  const signedIn = async () => {
    setAuthorized(true);
    try {
      console.log(auth?.token);
      const res = await axiosInstance.get(`/api/v1/auth/user-auth`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setAuthorized(true);
      console.log(res);
    } catch (error) {
      console.error("Auth error", error);
    }
  };

  const action = () => {
    if (authorized) {
      localStorage.removeItem("auth");
      setAuthorized(false);
    }
    router.push("/login");
  };

  useEffect(() => {
    signedIn();
  }, [auth]);

  const categories = useCategory();
  return (
    <nav
      className={`  flex justify-between items-center h-20  border-b-2 px-10 `}
    >
      <ul className="flex md:flex-row flex-col items-center gap-5">
        <li
          className="cursor-pointer lg:hidden"
          onClick={() =>
            (document.getElementById("sidebar").style.width = "250px")
          }
        >
          <BsLayoutTextSidebarReverse />
        </li>
        <li className="hidden lg:block">
          <div>
            <a className="text-xl" href="/">
              UrbanHides
            </a>
          </div>
        </li>
        <li className="hidden lg:block">
          <a className="hover:text-gray-500" href="/product">
            Products
          </a>
        </li>
        <li className="hidden lg:block">
          <a className="hover:text-gray-500" href="/dashboard">
            Dashboard
          </a>
        </li>
        <li className="hidden lg:block">
          <a className="hover:text-gray-500" href="/">
            About
          </a>
        </li>
        <li className="hidden lg:block">
          <a className="hover:text-gray-500" href="/contact">
            Contact
          </a>
        </li>
      </ul>
      <div className="flex flex-row gap-5 hidden md:flex">
        <SearchBar />
        <button
          onClick={action}
          href="/login"
          className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
        >
          {authorized ? "Logout" : "Login"}
        </button>
        <button onClick={() => router.push("/cart")}>
          <AiOutlineShoppingCart size="1.5rem" />
        </button>
      </div>
    </nav>
  );
};
