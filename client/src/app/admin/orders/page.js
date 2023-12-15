"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/auth";
import axiosInstance from "@/app/hooks/axiosinstance";
import Link from "next/link";
import Spinner from "@/app/components/spinner";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      if (auth) {
        const data = await axiosInstance.get(`/api/v1/auth/all-orders`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setOrders(data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, [auth]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );

  return (
    <div className="p-8 md:p-20">
      <p className="mb-10 text-4xl">Orders</p>

      <div className="grid overflow-x-scroll max-w-full py-12">
      { orders.length > 0 ?         <table className="border-2 border-black text-center">
          <tbody>
            <tr className="border-2 border-black">
              <th className="border-2 border-black p-4">Sr no.</th>
              <th className="border-2 border-black">Order ID</th>
              <th className="border-2 border-black">Ordered by</th>
              <th className="border-2 border-black">Ordered on</th>
              <th className="border-2 border-black">Amount</th>
              <th className="border-2 border-black">Phone</th>
              <th className="border-2 border-black">Email</th>
              <th className="border-2 border-black">View details</th>
            </tr>
            {orders.map((order, index) => {
              return (
                <tr key={order._id}>
                  <td className="border-2 border-black p-2">{index + 1}</td>
                  <td className="border-2 border-black">{order._id}</td>
                  <td className="border-2 border-black">{order.buyer.name}</td>
                  <td className="border-2 border-black">
                    {order.createdAt.split("T")[0]}
                  </td>
                  <td className="border-2 border-black">${order.total}</td>
                  <td className="border-2 border-black">{order.phone}</td>
                  <td className="border-2 border-black">
                    {order.order_at_email}
                  </td>
                  <td className="border-2 border-black underline text-blue-500">
                    <Link href={`/admin/orders/${order._id}`}>View</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      : <p className="text-xl text-gray-600">No orders yet</p>
      }
      </div>
    </div>
  );
};

export default Orders;
