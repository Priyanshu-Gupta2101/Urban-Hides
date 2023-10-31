"use client";
import { useAuth } from "@/app/context/auth";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/app/hooks/axiosinstance";

const User = (props) => {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      if (auth.token !== "" && id) {
        const { data } = await axiosInstance.post(
          `/api/v1/auth/user-orders`,
          {
            userId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        console.log(data.orders.email);
        setOrders(data.orders);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, [auth]);
  return (
    <div>
      <div
        id="user-overview"
        className="grid place-items-center text-left my-6"
      >
        <img src="/profile.jpg" className="w-40 h-40 rounded-full" />
        <p className="font-bold text-xl">{orders[0]?.order_at_email}</p>
        <p className=" text-sm">Ph. {orders[0]?.phone}</p>
        <p className=" text-sm">Address. {orders[0]?.address}</p>
      </div>
      <table className="min-w-full text-center my-12 border-2 border-slate-400">
        <tbody>
          <tr>
            <td className="w-6/12 border-2 border-slate-400 py-4">
              <span className="text-4xl font-bold">{orders.length}</span> <br />
              Purchases
            </td>
            <td className="w-6/12">
              <span className="text-4xl font-bold">
                {orders
                  .reduce((total, order) => total + order.total, 0)
                  .toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
              </span>{" "}
              <br />
              spent
            </td>
          </tr>
        </tbody>
      </table>
      <div className="p-12" id="order-history">
        <p className="text-3xl">Order history</p>

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
                        onClick={() =>
                          router.push(`/admin/orders/${order._id}`)
                        }
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
    </div>
  );
};

export default User;
