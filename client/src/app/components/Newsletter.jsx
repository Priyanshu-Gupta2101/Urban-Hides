import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Flash from "@/app/components/flash";
import showFlash from "@/app/utils/showFlash";
import axiosInstance from "@/app/hooks/axiosinstance";

export default function Example() {
  const [email, setEmail] = useState("");
  const [flash, setFlash] = useState({
    message: "",
    bg: "",
  });

  const handleCleanUp = () => {
    setEmail("");
    setFlash({
      message: "",
      bg: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post("/api/v1/subscribe", { email });
      console.log(data.msg);
      handleCleanUp();
    } catch (error) {
      console.log(error);
      handleCleanUp();
    } finally {
      setFlash({
        message: "Subscribed to the newsletter successfully",
        bg: "bg-green-500",
      });
      showFlash();
    }
  };
  return (
    <div className="relative isolate overflow-hidden bg-white-900 py-8 sm:py-24 lg:py-32">
      <Flash flash={flash} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-gray sm:text-4xl">
              Subscribe to our newsletter.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              "Stay connected, subscribe to our newsletter today!"
            </p>
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
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-gray/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon
                  className="h-6 w-6 text-gray"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-gray">Stay Informed</dt>
              <dd className="mt-2 leading-7 text-gray-400">
                Subscribe to our Leather Lovers' Newsletter for exclusive
                product updates, style tips, and special offers.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-gray/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon
                  className="h-6 w-6 text-gray"
                  aria-hidden="true"
                />
              </div>
              <dt className="mt-4 font-semibold text-gray">No spam</dt>
              <dd className="mt-2 leading-7 text-gray-400">
                Rest assured, your inbox is safe with us. We respect your
                privacy and promise no spam—only quality leather content.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        {/* <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        /> */}
      </div>
    </div>
  );
}
