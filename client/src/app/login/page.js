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
    <div className="xl:grid grid-cols-2 py-44 items-center justify-items-center gap-0 xl:px-64">
      <form onSubmit={onSubmit} className="grid place-items-center">
        <p className="text-2xl py-4 text-center">Login to Urbanhides</p>
        <hr />
        <input
          className="p-1 my-4 border-2 border-slate-400 rounded-xl"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-1 my-7 border-2 border-slate-400 rounded-xl"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-slate-900 pb-4">
          Don't have an account?{" "}
          <a className="underline" href="/signup">
            Sign up
          </a>
        </p>
        <Button value="Login" bg="bg-black" color="text-white" />
      </form>
      <img
        src="https://designshack.net/wp-content/uploads/abstract-art-trend.png"
        alt="jacket-img"
        className="max-w-md hidden xl:block"
      />
    </div>
  );
};

export default Login;
