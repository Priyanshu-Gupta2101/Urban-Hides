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
      <p className="text-left text-2xl md:text-6xl my-8 ml-6">Dashboard</p>
      <hr className="mb-4 hidden md:block" />
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
    <div className="grid place-items-center py-32">
      <img src="/dashboard-nologin.png" alt="image" className="w-96" />
      <p className="text-base my-4">
        <a href="/login" className="text-blue-500">
          Login
        </a>{" "}
        or{" "}
        <a href="/signup" className="text-blue-500">
          Sign up
        </a>{" "}
        to view your dashboard.
      </p>
    </div>
  );
};
export default Dashboard;
