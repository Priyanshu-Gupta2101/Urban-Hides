"use client";
import { useRouter } from "next/navigation";
import Button from "../components/button";
import axiosInstance from "./../hooks/axiosinstance";
import { useState } from "react";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";

const Signup = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });
  //fetch
  const register = async () => {
    try {
      const { data } = await axiosInstance.post("/api/v1/auth/register", {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address,
        answer: answer,
      });
      if (data.success == false) {
        setFlash({
          message: data.msg,
          bg: "bg-red-500",
        });
      }
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register();
  };
  return (
    <div className="h-full">
      <form
        onSubmit={onSubmit}
        className="grid place-items-center md:mx-64 md:my-12 py-12  shadow-2xl shadow-black"
      >
        <p className="text-2xl py-4">Signup to Urbanhides</p>
        <hr />
        <input
          className="p-1 my-4 border-2 border-slate-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-1 my-4 border-2 border-slate-400"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-1 my-4 border-2 border-slate-400"
          type="tel"
          placeholder="Contactable Phone no."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          className="p-1 my-4 border-2 border-slate-400"
          placeholder="Shipping Address"
          defaultValue={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
        <input
          className="p-1 my-7 border-2 border-slate-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            if (e.target.value.length < 6) {
              setFlash({
                message: "Password must be 6 characters long",
                bg: "bg-red-500",
              });
            } else {
              setPassword(e.target.value);
            }
          }}
        />
        <label className="my-2">
          Enter an answer that you will use in case you want to reset your
          password
        </label>
        <input
          className="p-1 my-4 border-2 border-slate-400"
          type="text"
          placeholder="Security question"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button value="Login" bg="bg-black" color="text-white" />
      </form>
    </div>
  );
};

export default Signup;
