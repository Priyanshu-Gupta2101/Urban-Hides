"use client";
import Button from "../components/button";
import { useCart } from "../context/cart";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth";
import axiosInstance from "../hooks/axiosinstance";
import showFlash from "../utils/showFlash";
import Flash from "../components/flash";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
    const [flash, setFlash] = useState({
        "message": "",
        "bg": ""
    });

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
        router.push("/");
      }
    } catch (error) {
      console.error(error);
        setFlash({
            "message": "Invalid credentials",
            "bg": "bg-red-500"
        });
        showFlash();
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
    <div className="xl:grid grid-cols-2 py-24 items-center justify-items-center gap-0 xl:px-64">
      <Flash flash={flash} />
      <form onSubmit={onSubmit} className="grid place-items-center">
        <p className="text-3xl my-8 text-center">Login to UrbanHides</p>
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
        src="/login-illustration.png"
        alt="jacket-img"
        className="max-w-md hidden xl:block"
      />
    </div>
  );
};

export default Login;
