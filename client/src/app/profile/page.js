"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/hooks/axiosinstance";
import { useAuth } from "../context/auth";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";

function UserProfile() {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useAuth();
  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });

  const fetchProfile = async () => {
    if (auth.token) {
      const { data } = await axiosInstance.get(`/api/v1/auth/profile/`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setUser(data);
    } else {
      setFlash({
        message: "Login is required",
        bg: "bg-red-500",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded shadow">
      <Flash flash={flash} />
      <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
      <div className="mb-4">
        <p className="text-lg">
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Phone:</span> {user.phone}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Address:</span> {user.address}
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
