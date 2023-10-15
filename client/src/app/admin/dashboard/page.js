"use client";
import Card from "@/app/components/card";
import Link from "next/link";
import { useAuth } from "@/app/context/auth";
import axiosInstance from "@/app/hooks/axiosinstance";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Spinner from "@/app/components/spinner";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const delay = 3000;

  const redirectToPage = () => {
    router.push("/");
  };

  console.log(auth);

  const checkAdmin = () => {
    if (!auth?.user?.role) {
      const timeoutId = setTimeout(redirectToPage, delay);
      return () => clearTimeout(timeoutId);
    }

    setAuthorized(true);
  };

  useEffect(() => {
    checkAdmin();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <p className="text-left text-3xl font-bold my-8 ml-6">Take a look</p>
      <div className="grid grid-cols-1 md:grid-cols-3 mb-7 mx-4">
        {authorized && (
          <Link href="/admin/products">
            <Card
              text="Products"
              color="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400"
              img="/Product hunt-pana.png"
            />
          </Link>
        )}
        <Link href={`${authorized ? `/admin/orders` : `/orders`}`}>
          <Card
            text="Orders"
            color="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"
            img="/order.png"
          />
        </Link>
        {authorized && (
          <Link href="/admin/users">
            <Card
              text="Users"
              color="bg-gradient-to-r from-green-400 via-green-500 to-green-600"
              img="/user.png"
            />
          </Link>
        )}
        {authorized && (
          <Link href="/admin/manage-category">
            <Card
              text="Categories"
              color="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400"
              img="/category.png"
            />
          </Link>
        )}
        {authorized && (
          <Link href="/admin/manage-subcategory">
            <Card
              text="Subcategories"
              color="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400"
              img="/category.png"
            />
          </Link>
        )}
        {authorized && (
          <Link href="/">
            <Card
              text="Admins"
              color="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
              img="/admin.png"
            />
          </Link>
        )}
        <Link href="/contact">
          <Card
            text="Support"
            color="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 to-blue-400"
            img="/support.png"
          />
        </Link>
        {authorized && (
          <Link href="/products">
            <Card
              text="Analytics"
              color="bg-gradient-to-r from-purple-400 to-purple-600"
              img="/analysis.png"
            />
          </Link>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
