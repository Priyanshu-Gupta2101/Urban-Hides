"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axiosInstance from "@/app/hooks/axiosinstance";
import { useAuth } from "@/app/context/auth";

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useAuth();

  const fetchUsers = async () => {
    try {
      if (auth.token && auth.user.role === 1) {
        const { data } = await axiosInstance.get("/api/v1/auth/users", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [auth]);

  return (
    <div className="overflow-x-auto mt-20 mx-7 border border-gray-200 rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm leading-5 font-medium text-gray-900">
                      {user.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">
                  {user.email}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">
                  {user.phone}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">
                  {user.address}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">
                  {user.role === 0 ? "User" : "Admin"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <a href={`/admin/users/${user._id}`} className="text-blue-500">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsersPage;
