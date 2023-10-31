"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/auth";
import axiosInstance from "@/app/hooks/axiosinstance";
import { useRouter } from "next/navigation";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const router = useRouter();

  const getOrders = async () => {
    try {
      if (auth.token) {
        const { data } = await axiosInstance.get(`/api/v1/auth/orders`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setOrders(data.orders);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserDetails = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/auth/user-details`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setUser(data.user[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
    getOrders();
  }, [auth]);

  const viewOrderDetails = (orderId) => {
    // Redirect to a page to view the order details
    router.push(`/orders/${orderId}`);
  };

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
              <th className="border-2 border-black">Details</th>
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
                    {order.total?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                  <td className="border-2 border-black">
                    <button
                      onClick={() => viewOrderDetails(order._id)}
                      className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700"
                    >
                      View Details
                    </button>
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
