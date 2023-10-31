"use client";
import Card from "@/app/components/card";
import Link from "next/link";
import { useAuth } from "../context/auth";
import axiosInstance from "@/app/hooks/axiosinstance";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Spinner from "../components/spinner";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axiosInstance.get("/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return auth?.token ? (
    <div>
      <p className="text-left text-3xl font-bold my-8 ml-6">Take a look</p>
      <div className="grid grid-cols-1 md:grid-cols-3 mb-7 mx-4">
        <Link href="/orders">
          <Card
            text="Orders"
            color="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"
            img="/order.png"
          />
        </Link>
        <Link href="/contact">
          <Card
            text="Support"
            color="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 to-blue-400"
            img="/support.png"
          />
        </Link>
        <Link href="/profile">
          <Card
            text="Profile"
            color="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
            img="/user.png"
          />
        </Link>
      </div>
    </div>
  ) : (
    <div className="container h-screen flex justify-center items-center my-10">
      <p>
        You are not authorized to access this page. Goto{" "}
        <a href="/login" className="text-blue-500 hover:text-light-blue-700">
          Login page
        </a>{" "}
        to login or create a new account by{" "}
        <a href="/signup" className="text-blue-500 hover:text-light-blue-700">
          Sign up
        </a>
      </p>
    </div>
  );
};
export default Dashboard;
