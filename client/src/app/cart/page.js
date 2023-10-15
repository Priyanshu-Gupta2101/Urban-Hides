"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { useRouter } from "next/navigation";
import axiosInstance from "../hooks/axiosinstance";
import Button from "../components/button";
import Spinner from "../components/spinner";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [carts, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const discount = 0;
  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });

  const fetchCart = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/product/get-cart", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log(data.cart[0].products);
      setCart(data.cart);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFromCart = async (pid) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/v1/product/remove-from-cart/${pid}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      console.log(data);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    address: "",
  });

  const placeOrder = async () => {
    try {
      if (!carts[0].products) {
        setFlash({
          message: "Product is required. Please fill it in.",
          bg: "bg-red-500",
        });
        showFlash();
        return;
      }
      const res = await axiosInstance.post(
        `/api/v1/auth/send-order`,
        {
          products: carts[0].products,
          user: user,
          total: totalPrice(),
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (res.data.success) {
        clearCart();
        fetchCart();
      }
      setFlash({
        message: "Order Placed",
        bg: "bg-green-500",
      });
      router.push("/cart");
    } catch (error) {
      console.log(error);
      setFlash({
        message: "Error! Order couldn't be placed",
        bg: "bg-red-500",
      });
    }
    showFlash();
  };
  const setUserDetails = () => {
    if (auth) {
      setUser({
        name: auth.user?.name,
        id: auth.user?._id,
        email: auth.user?.email,
        address: auth.user?.address,
        phone: auth.user?.phone,
      });
    }
  };

  const clearCart = async () => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/v1/product/clear-cart`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      carts[0]?.products.map((item) => {
        total += item.product.price * item.quantity;
      });
      return total.toFixed(2);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUserDetails();
    fetchCart();
  }, [auth]);

  if (!auth)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );

  return (
    <div className={`lg:p-12 m-8`}>
      <Flash flash={flash} />
      <div id="cart" className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div id="products" className="lg:col-span-2">
          <p className="text-6xl mb-6 py-4 text-center">Your cart</p>
          {carts?.length > 0 ? (
            carts[0]?.products.map((item, id) => {
              return (
                <div
                  key={item._id}
                  className="grid grid-cols-2 bg-slate-100 py-8 my-2 rounded"
                >
                  <div className="justify-self-center max-w-48">
                    <img
                      src={item.product.photo[0].url}
                      alt="Product"
                      className="w-48"
                    />
                  </div>
                  <div className="self-center">
                    <p className="font-bold text-3xl">{item.product.name}</p>
                    <p className="py-4 text-2xl">${item.product.price}</p>
                    <p className="my-4">
                      <span className="font-bold">Quantity:</span>{" "}
                      {item.quantity}
                    </p>
                    <p className="my-4">
                      <span className="font-bold">Size:</span> {item.size}
                    </p>
                    <p className="my-4">
                      <span className="font-bold">Color:</span> {item.color}
                    </p>
                    <br />
                    <Button
                      value="Remove"
                      bg="bg-red-500"
                      color="text-white"
                      border="border-none"
                      onClick={() => deleteFromCart(item.product._id)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-2xl text-center text-gray-600">
              You haven't added anything yet
            </p>
          )}
        </div>
        <div className="p-12 bg-slate-100">
          <p className="text-slate-500">Price details</p>
          <hr className="my-2" />
          {carts[0]?.products?.length > 0 ? (
            <div>
              <table className="w-full mb-2">
                <tbody>
                  <tr>
                    <td className="py-2">Price</td>
                    <td className="text-right">${totalPrice()}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Delivery</td>
                    <td className="text-right text-green-500">Free</td>
                  </tr>
                  <tr>
                    <td className="py-2">Discount</td>
                    <td className="text-right text-green-500">{discount}%</td>
                  </tr>
                  <tr className="border-y-2">
                    <td className="py-2 font-bold">Total</td>
                    <td className="text-right font-bold">
                      $
                      {(totalPrice() - (totalPrice() * discount) / 100).toFixed(
                        2
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div id="extra-info" className="mt-24">
                <p className="text-2xl font-bold">Shipping information</p>
                <p>
                  Name:{" "}
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </p>
                <p>
                  Phone:{" "}
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                  />
                </p>
                <p>
                  Email:{" "}
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </p>
                <p>Shipping address : </p>
                <textarea
                  className="h-40 w-60 border-2"
                  defaultValue={user.address}
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
          ) : (
            <p className="text-2xl text-gray-600 my-4">Nothing to show</p>
          )}
          <Button
            value="Checkout"
            onClick={placeOrder}
            bg="bg-green-500"
            color="text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
