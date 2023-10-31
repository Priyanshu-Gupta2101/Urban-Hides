"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth";
import axiosInstance from "@/app/hooks/axiosinstance";

const OrderDetails = () => {
  const [auth, setAuth] = useAuth();
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId;
  const [order, setOrder] = useState({});

  const getOrderDetails = async () => {
    try {
      if (orderId && auth.token !== "") {
        const { data } = await axiosInstance.get(
          `/api/v1/auth/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setOrder(data.order);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [orderId, auth]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-4">Order Details</h1>
      {order ? (
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Order Information</h2>
            <p>Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
            <p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>
              Total Quantity:{" "}
              {order.products.reduce(
                (total, product) => total + product.quantity,
                0
              )}
            </p>
            <p>Total Amount: Rs. {order.total}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">User Information</h2>
            <p>Name: {order.buyer?.name}</p>
            <p>Email: {order.order_at_email}</p>
            <p>Address: {order.address}</p>
            <p>Phone: {order.phone}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Ordered Products</h2>
            {order.products?.map((product) => (
              <div
                key={product.product._id}
                className="mb-4 p-4 border border-gray-300"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_CLOUDINARY_PATH}/${product.product?.photo[0].public_id}.jpg`} // Replace with the actual image URL field in your data
                  alt={product.product.name}
                  className="max-w-full h-auto"
                  onClick={() => {
                    router.push(`/product/${product.product.slug}`);
                  }}
                />
                <p className="text-lg font-semibold">{product.product.name}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Size: {product.size}</p>
                <p>Color: {product.color}</p>
                <p>Price: Rs. {product.product.price}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OrderDetails;
