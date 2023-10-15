"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/auth";
import axiosInstance from "@/app/hooks/axiosinstance";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const getOrders = async () => {
    try {
      const data = await axiosInstance.get(`/api/v1/auth/orders`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      console.log(data);
      setOrders(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserDetails = async () => {
    try {
      const data = await axiosInstance.get(`/api/v1/auth/user-details`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      console.log(data);
      setUser(data.data.user[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserDetails();
    getOrders();
  }, [auth]);

  return (
    <div className={`p-8 md:p-20`}>
      <p className="mb-10 text-6xl">Orders</p>

      <div className="grid overflow-x-scroll max-w-full py-12">
        <table className="border-2 border-black text-center">
          <tbody>
            <tr className="border-2 border-black">
              <th className="border-2 border-black p-4">Sr no.</th>
              <th className="border-2 border-black">Order ID</th>
              <th className="border-2 border-black">Order status</th>
              <th className="border-2 border-black">Ordered on</th>
              <th className="border-2 border-black">Quantity</th>
              <th className="border-2 border-black">Amount</th>
            </tr>
            {orders.map((order, index) => {
              return (
                <tr key={order._id}>
                  <td className="border-2 border-black p-2">{index + 1}</td>
                  <td className="border-2 border-black">{order._id}</td>
                  <td className="border-2 border-black">{order.status}</td>
                  <td className="border-2 border-black">
                    {order.createdAt.split("T")[0]}
                  </td>
                  <td className="border-2 border-black">
                    {order.products.length}
                  </td>
                  <td className="border-2 border-black">
                    Rs.{" "}
                    {order.products.reduce(
                      (total, curr) => total + curr.price,
                      0
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
