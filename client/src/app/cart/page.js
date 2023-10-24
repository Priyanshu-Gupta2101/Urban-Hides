"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { useRouter } from "next/navigation";
import axiosInstance from "../hooks/axiosinstance";
import Button from "../components/button";
import Spinner from "../components/spinner";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";
import { useCart } from "../context/cart";
import PayPalPayment from "../components/PayPalPayment";

const CartPage = () => {
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState(false);
  const discount = 20;
  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });

  const fetchProfile = async () => {
    if (auth.token) {
      const { data } = await axiosInstance.get(`/api/v1/auth/profile/`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setUser(data);
      setAddress(data.address);
      setPhone(data.phone);
    }
  };

  const fetchCart = async () => {
    try {
      if (auth.token) {
        const { data } = await axiosInstance.get("/api/v1/product/get-cart", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setCart(data?.cart);
        localStorage.setItem("cart", JSON.stringify(data?.cart));
      }
      setLoading(false);
      setChange(false);
    } catch (error) {
      console.log(error);
      setFlash({
        message: "Error at cart page while fetching cart",
        bg: "bg-red-500",
      });
    } finally {
      showFlash();
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
      setChange(true);
    } catch (error) {
      console.log(error);
    }
  };

  const [user, setUser] = useState({});

  const totalPrice = () => {
    try {
      let total = 0;
      cart[0]?.products?.map((item) => {
        total += item.product.price * item.quantity;
      });

      return total.toFixed(2);
    } catch (error) {
      console.log(error);
    }
  };
  const calculateDiscountedPrice = (originalPrice) => {
    const discountedPrice = originalPrice - (originalPrice * 20) / 100;
    return discountedPrice;
  };

  useEffect(() => {
    fetchProfile();
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
          {cart?.length > 0 ? (
            cart[0]?.products?.map((item, id) => {
              return (
                <div
                  key={item._id}
                  className="grid grid-cols-2 bg-slate-100 py-8 my-2 rounded"
                >
                  <div className="justify-self-center max-w-48">
                    <img
                      src={`${process.env.NEXT_PUBLIC_CLOUDINARY_PATH}/${item.product.photo[0].public_id}.jpg`}
                      alt="Product"
                      className="w-48"
                    />
                  </div>
                  <div className="self-center">
                    <p className="font-bold text-3xl">{item.product.name}</p>
                    <p className="text-2xl py-4">
                      <span className="line-through text-gray-500">
                        {item.product.price?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                      <br />
                      <span className="text-red-500">
                        {calculateDiscountedPrice(
                          item.product.price
                        )?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}{" "}
                        (20% off)
                      </span>
                    </p>
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
          {cart[0]?.products?.length > 0 ? (
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
                    onChange={(e) => {
                      setUser({ ...user, phone: e.target.value });
                      setPhone(e.target.value);
                    }}
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
                  onChange={(e) => {
                    setUser({ ...user, address: e.target.value });
                    setAddress(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
          ) : (
            <p className="text-2xl text-gray-600 my-4">Nothing to show</p>
          )}
          <div className="py-10">
            <PayPalPayment
              token={auth.token}
              products={cart[0]?.products}
              total={(totalPrice() - (totalPrice() * discount) / 100).toFixed(
                2
              )}
              phone={phone}
              address={address}
            />
            {/* <Button
            value="Checkout"
            onClick={placeOrder}
            bg="bg-green-500"
            color="text-white"
          /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
