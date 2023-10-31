"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/hooks/axiosinstance";
import { useAuth } from "../context/auth";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";

function UserProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [auth, setAuth] = useAuth();
  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (auth.token) {
        const { data } = await axiosInstance.put(
          "/api/v1/auth/update",
          formData,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        if (data.success) {
          setFlash({
            message: "Profile updated",
            bg: "bg-green-500",
          });
        } else {
          setFlash({
            message: "Error at updating your profile",
            bg: "bg-red-500",
          });
        }
      }
    } catch (error) {
      console.error(error);
      setFlash({
        message: "Error has been made at the client or server side",
        bg: "bg-red-500",
      });
    } finally {
      showFlash();
    }
  };

  const fetchProfile = async () => {
    if (auth?.token !== "") {
      const { data } = await axiosInstance.get(`/api/v1/auth/profile/`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setFormData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });
    } else {
      setFlash({
        message: "Login is required",
        bg: "bg-red-500",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [auth]);

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white rounded shadow">
      <Flash flash={flash} />
      <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="text-lg font-semibold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="text-lg border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="text-lg font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="text-lg border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="text-lg font-semibold">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="text-lg border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="text-lg font-semibold">
            Address:
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="text-lg border p-2 w-full rounded h-32"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded text-lg hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UserProfile;
