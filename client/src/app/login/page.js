"use client";
import Button from "../components/button";
import { useCart } from "../context/cart";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth";
import axiosInstance from "../hooks/axiosinstance";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const onSubmit = async (e) => {
    e.preventDefault();
    //fetch
    try {
      const { data } = await axiosInstance.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (data && data.success) {
        setAuth({
          ...auth,
          user: data["user"],
          token: data["token"],
        });

        getCartItem(data);
        localStorage.setItem("auth", JSON.stringify(data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      router.push("/");
    }
  };

  const getCartItem = async (resdata) => {
    if (resdata && resdata.success) {
      const { data } = await axiosInstance.get("/api/v1/product/get-cart", {
        headers: {
          Authorization: `Bearer ${resdata.token}`,
        },
      });
      setCart(data?.cart);
      localStorage.setItem("cart", JSON.stringify(data?.cart));
    }
  };

  return (
    <div className="h-full">
      <form
        onSubmit={onSubmit}
        className="grid place-items-center md:mx-64 md:my-32 py-12 m-7 shadow-2xl"
      >
        <p className="text-2xl py-4">Login to Urbanhides</p>
        <hr />
        <input
          className="p-1 my-4 border-2 border-slate-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-1 my-7 border-2 border-slate-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button value="Login" bg="bg-black" color="text-white" />
      </form>
    </div>
  );
};

export default Login;
