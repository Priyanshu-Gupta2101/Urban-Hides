"use client";
import Button from "../components/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [auth, setAuth] = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      console.log(data);

      if (data && data.success) {
        setAuth({
          ...auth,
          user: data["user"],
          token: data["token"],
        });

        localStorage.setItem("auth", JSON.stringify(data));
      }

      router.push("/");
      console.log(auth);
    } catch (error) {
      console.error(error);
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
