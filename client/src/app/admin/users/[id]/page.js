"use client";
import { useAuth } from "@/app/context/auth";
import { useState, useEffect } from "react";
import axiosInstance from "@/app/hooks/axiosinstance";

const User = (props) => {
  const [userDetails, setUserDetails] = useState({});
  const [auth, setAuth] = useAuth();

  const getUserDetails = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/auth/user-details`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      console.log(data);
      setUserDetails(data.user[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [auth]);
  return (
    <div>
      <div
        id="user-overview"
        className="grid place-items-center text-left my-6"
      >
        <img src="/profile.jpg" className="w-40 h-40 rounded-full" />
        <p className="font-bold text-xl">{userDetails.email}</p>
        <p className=" text-sm">Ph. {userDetails.phone}</p>
      </div>
      <table className="min-w-full text-center my-12 border-2 border-slate-400">
        <tbody>
          <tr>
            <td className="w-6/12 border-2 border-slate-400 py-4">
              <span className="text-4xl font-bold">9</span> <br />
              Purchases
            </td>
            <td className="w-6/12">
              <span className="text-4xl font-bold">Rs. 8700</span> <br />
              spent
            </td>
          </tr>
        </tbody>
      </table>
      <div className="p-12" id="order-history">
        <p className="text-3xl">Order history</p>
        <div className="grid overflow-x-scroll max-w-full py-12 rounded">
          <table className="border-2 border-black text-center">
            <tbody>
              <tr className="border-2 border-black">
                <th className="border-2 border-black py-6">Sr no.</th>
                <th className="border-2 border-black">Order ID</th>
                <th className="border-2 border-black">Ordered by</th>
                <th className="border-2 border-black">Ordered on</th>
                <th className="border-2 border-black">Quantity</th>
                <th className="border-2 border-black">Amount</th>
                <th className="border-2 border-black">Phone</th>
                <th className="border-2 border-black">Email</th>
              </tr>
              <tr>
                <td className="border-2 border-black py-6">1</td>
                <td className="border-2 border-black">12345</td>
                <td className="border-2 border-black">Priyanshu Gupta</td>
                <td className="border-2 border-black">12th July, 2023</td>
                <td className="border-2 border-black">3</td>
                <td className="border-2 border-black">Rs. 5000</td>
                <td className="border-2 border-black">987654321</td>
                <td className="border-2 border-black">anshu@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
