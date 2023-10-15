"use client";
import { useRouter } from "next/navigation";
import Button from "../components/button";
import { useState } from "react";

const Signup = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const register = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            phone: phone,
            address: address,
            answer: answer,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
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
          type="number"
          placeholder="Phone no."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          className="p-1 my-4 border-2 border-slate-400"
          placeholder="Address"
          defaultValue={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
        <input
          className="p-1 my-7 border-2 border-slate-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
