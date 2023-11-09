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
    <div className="h-full max-w-lg px-8 mt-14 xl:grid grid-cols-2 place-items-center items-center justify-items-center lg:px-44 lg:py-24 xl:max-w-none lg:min-h-screen lg:items-start">
      <form
        onSubmit={onSubmit}
        className="md:mx-64 md:my-12 py-10 xl:py-0 lg:min-w-350"
      >
        <p className="text-2xl py-4">Sign Up to Urbanhides</p>
        {page == 1 ? (
          <>
            <input
              className="p-2 border-2 border-slate-400 rounded-xl mr-4"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="mt-2 p-2 border-2 border-slate-400 rounded-xl mr-4"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
              className="mt-2 p-2 border-2 border-slate-400 rounded-xl mb-4"
              type="tel"
              placeholder="Contactable Phone no."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <Button
              value="Next &rarr;"
              onClick={() => setPage(2)}
              bg="bg-black"
              color="text-white"
            />
          </>
        ) : (
          <>
            <textarea
              className="p-2 border-2 border-slate-400 rounded-xl"
              placeholder="Shipping Address"
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <br />
            <input
              className="p-2 mb-4 rounded-xl mt-2 border-2 border-slate-400"
              type="password"
              placeholder="Password"
              value={password}
              minlength="6"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <label>
              Enter an answer that you will use in case you want to reset your
              password
            </label>
            <br />
            <input
              className="my-4 rounded-xl p-2 border-2 border-slate-400"
              type="text"
              placeholder="Security question"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <br />
            <Button
              value="Back"
              bg="bg-black"
              onClick={() => setPage(1)}
              color="text-white"
            />
            <Button value="Sign Up" bg="bg-black" color="text-white" />
          </>
        )}
      </form>
      <div className="rounded-xl mt-8 overflow-hidden">
        <img
          src="https://media.istockphoto.com/id/648366374/photo/handsome-traveler.jpg?s=612x612&w=0&k=20&c=LWiJBBBxEaWuwh9hLDNOYaZbJBO69nlUBu8bsPlycP8="
          alt="jacket-img"
          className="max-w-lg hidden xl:block"
        />
      </div>
    </div>
  );
};

export default Signup;
