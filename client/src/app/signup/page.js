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
  const [page, setPage] = useState(1);
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
    <div className="xl:grid grid-cols-2 py-44 items-center justify-items-center gap-0 xl:px-64">
      <form onSubmit={onSubmit} className="grid place-items-center">
        <p className="text-3xl py-4 text-center">Sign Up To Urbanhides</p>
        {page == 1 && (
          <>
            <input
              className="p-1 my-4 border-2 border-slate-400 rounded-xl"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="p-1 my-4 border-2 border-slate-400 rounded-xl"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-1 my-4 border-2 border-slate-400 rounded-xl"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-slate-900 pb-4">
              Already have an account?{" "}
              <a className="underline" href="/login">
                Login
              </a>
            </p>
            <Button
              value="Next &rarr;"
              onClick={() => setPage(2)}
              bg="bg-black"
              color="text-white"
            />
          </>
        )}
        {page == 2 && (
          <>
            <input
              className="p-1 my-4 border-2 border-slate-400 rounded-xl"
              type="number"
              placeholder="Phone no."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              className="p-1 border-2 border-slate-400 rounded-xl"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            >
              {address}
            </textarea>
            <label for="answer" className="text-center mt-4 max-w-xs">
              Enter a word that you can use to reset your password
            </label>
            <input
              id="answer"
              className="p-1 my-4 border-2 border-slate-400 rounded-xl"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <div>
              <Button
                value="&larr; Back"
                bg="bg-black"
                color="text-white"
                onClick={() => setPage(1)}
              />
              <Button value="Sign Up" bg="bg-black" color="text-white" />
            </div>
          </>
        )}
      </form>
      <img
        src="/sign-up-illustration.png"
        alt="jacket-img"
        className="max-w-md hidden xl:block"
      />
    </div>
  );
};

export default Signup;
