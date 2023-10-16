"use client";
import { useState } from "react";
import axiosInstance from "../hooks/axiosinstance";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const name = String(event.target.name.value);
    const email = String(event.target.email.value);
    const subject = String(event.target.subject.value);
    const message = String(event.target.message.value);

    const { data } = await axiosInstance.post("/api/v1/contact", {
      name,
      email,
      subject,
      message,
    });

    if (data.success) {
      console.log("Message sent successfully");
      setLoading(false);
      // reset the form
      event.target.name.value = "";
      event.target.email.value = "";
      event.target.subject.value = "";
      event.target.message.value = "";
    } else {
      console.log("Error sending message");
      setLoading(false);
    }
  }

  return (
    <div className="my-12 pt-10 flex flex-col items-center gap-3">
      <h1 className="text-2xl font-semibold">Contact Us</h1>
      <div className="mx-auto max-w-3xl px-6 py-4 my-10 md:flex">
        {/* Contact Details (Left Side) */}
        <div className="md:w-1/2 pr-4 px-4">
          <p className="text-lg mt-2">
            Email:{" "}
            <a href="mailto:sales@urbanhides.com">
              <AiOutlineMail /> sales@urbanhides.com
            </a>
          </p>
          <div className="flex items-center mt-2">
            <div className="mr-2">
              <AiOutlinePhone size={24} />{" "}
              {/* Use react-icons for phone icon */}
            </div>
            <p className="text-lg">International: +1 323 284 6307</p>
          </div>
          <div className="flex items-center mt-2">
            <div className="mr-2">
              <AiOutlinePhone size={24} />{" "}
              {/* Use react-icons for phone icon */}
            </div>
            <p className="text-lg">India: +91 123 456 7890</p>
          </div>
        </div>

        <div className="hidden md:block w-1/2"></div>
        <div className="hidden md:block w-1/2"></div>
        <div className="hidden md:block w-1/2"></div>
        <div className="hidden md:block w-1/2"></div>

        {/* Contact Form (Right Side) */}
        <form onSubmit={handleSubmit} className="px-4 md:w-1/2 mt-4 md:mt-0">
          <div className="w-full flex flex-col my-4">
            <label className="font-bold text-gray-800" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              minLength={3}
              maxLength={150}
              required
              className="p-4 bg-gray-100 border border-gray-300 rounded-md"
              autoComplete="off"
              id="name"
            />
          </div>
          <div className="w-full flex flex-col my-4">
            <label className="font-bold text-gray-800" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              minLength={5}
              maxLength={150}
              required
              className="p-4 bg-gray-100 border border-gray-300 rounded-md"
              autoComplete="off"
              id="email"
            />
          </div>
          <div className="w-full flex flex-col my-4">
            <label className="font-bold text-gray-800" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              minLength={3}
              maxLength={250}
              required
              className="p-4 bg-gray-100 border border-gray-300 rounded-md"
              autoComplete="off"
              id="subject"
            />
          </div>
          <div>
            <label className="font-bold text-gray-800" htmlFor="message">
              Message
            </label>
            <textarea
              rows={4}
              required
              minLength={10}
              maxLength={500}
              name="message"
              className="w-full p-4 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 w-40 bg-gray-700 rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-gray-800 text-white"
            } font-medium mt-4`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
