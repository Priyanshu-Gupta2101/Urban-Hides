"use client";
import Link from "next/link";
import axiosInstance from "@/app/hooks/axiosinstance";
import { useAuth } from "@/app/context/auth";
import { useState, useEffect } from "react";
import Button from "@/app/components/button";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";

const Order = (props) => {
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useAuth();
  const [total, setTotal] = useState(0);
  const [buyer, setBuyer] = useState({
    name: "",
    phone: null,
    address: "",
    email: "",
  });
  const [status, setStatus] = useState("");
  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });

  const getOrderDetails = async () => {
    try {
      if (auth.token) {
        const { data } = await axiosInstance.get(
          `/api/v1/auth/order/${props.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setStatus(data.status);
        setOrder(data);
        setProducts(data.products);
        setBuyer({
          name: data.buyer.name,
          address: data.address,
          phone: data.phone,
          email: data.order_at_email,
        });
        setStatus(data.status);
        setTotal(data.total);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (status) => {
    try {
      if (auth.token) {
        const { data } = await axiosInstance.put(
          `/api/v1/auth/order-status/${props.params.id}`,
          {
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
      }

      setFlash({ message: "Order status updated", bg: "bg-green-500" });
    } catch (err) {
      console.log(err);
      setFlash({
        message:
          "Error! Order status could not be updated. Please refresh the page and try again.",
        bg: "bg-red-500",
      });
    }
    showFlash();
  };

  useEffect(() => {
    getOrderDetails();
  }, [auth]);
  return (
    <div className="p-12">
      <Flash flash={flash} />
      <p className="text-4xl font-bold">Order details</p>
      <div id="order-overview" className="text-slate-700 py-2">
        <p>Paypal Order ID. {order.order_id}</p>
        <p>Ordered on {new Date(order.createdAt).toLocaleDateString()}</p>
        <Link href={`/admin/users/${buyer._id}`}>
          Ordered by <span className="underline">{buyer.name}</span>
        </Link>
        <p>Shipping Address : {buyer.address}</p>
        <p>Phone : {buyer.phone}</p>
        <p>Email : {buyer.email}</p>
        <br />
        <span className="mr-2">
          Order status:{" "}
          <select
            className="border-2 border-gray-500 p-1"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Not processed">Not processed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancel">Cancel</option>
          </select>
        </span>
        <Button
          value="Update status"
          bg="bg-gray-300 hover:bg-gray-100"
          onClick={() => updateStatus(status)}
        />
      </div>
      <div id="order-details">
        <p className="my-4 text-2xl">Products ordered</p>
        <div className="grid overflow-x-scroll max-w-full py-5">
          <table className="border-2 border-black text-center">
            <tbody>
              <tr className="border-2 border-black">
                <th className="border-2 border-black py-6">Sr no.</th>
                <th className="border-2 border-black py-6">Product Name</th>
                <th className="border-2 border-black py-6">Product</th>
                <th className="border-2 border-black  ">Size</th>
                <th className="border-2 border-black  ">Color</th>
                <th className="border-2 border-black">Quantity</th>
                <th className="border-2 border-black  ">Cost</th>
              </tr>
              {products.map((product, index) => {
                return (
                  <tr key={product.product?._id}>
                    <td className="border-2 border-black py-6">{index + 1}</td>
                    <td className="border-2 border-black py-6">
                      {product.product?.name}
                    </td>
                    <td className="border-2 border-black py-6">
                      <img
                        className="img-fluid cursor-pointer"
                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_PATH}/${product.product?.photo[0].public_id}.jpg`}
                        fill="true"
                        priority="true"
                        sizes="max-width"
                        alt={product.product?.name}
                      />
                    </td>
                    <td className="border-2 border-black">{product.size}</td>
                    <td className="border-2 border-black">{product.color}</td>
                    <td className="border-2 border-black">
                      {product.quantity}
                    </td>
                    <td className="border-2 border-black">
                      {product.product?.price}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total = Rs. {total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
