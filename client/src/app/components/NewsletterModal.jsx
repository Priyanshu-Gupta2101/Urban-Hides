import React, { useState, useEffect } from "react";
import axiosInstance from "@/app/hooks/axiosinstance";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";

function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });

  const handleCleanUp = () => {
    setEmail("");
    setMessage("");
    setFlash({
      message: "",
      bg: "",
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/api/v1/subscribe", { email });
      handleCleanUp();
    } catch (error) {
      handleCleanUp();
    } finally {
      setMessage("Successfully subscribed to the newsletter!");
      setFlash({
        message: message,
        bg: "bg-green-500",
      });
      closeModal();
      showFlash();
    }
  };

  useEffect(() => {
    const hasModalBeenShown = localStorage.getItem("hasModalBeenShown");

    if (!hasModalBeenShown) {
      setIsOpen(true);
      localStorage.setItem("hasModalBeenShown", "true");
    }
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Flash flash={flash} />
          <div
            className="absolute inset-0 bg-gray-900 opacity-50"
            onClick={closeModal}
          ></div>
          <div className="bg-white p-8 rounded-lg z-10 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              X
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p>Get the latest updates in your inbox.</p>
            <form onSubmit={handleSubmit}>
              <div className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 bg-gray/5 px-3.5 py-2 text-gray shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-gray shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
            {/* Display the message after submission */}
            {message && (
              <div className={`mt-4 text-white ${flash.bg}`}>{message}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default NewsletterModal;
