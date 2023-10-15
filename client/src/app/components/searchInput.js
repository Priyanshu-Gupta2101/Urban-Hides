import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "../context/search";
import axiosInstance from "@/app/hooks/axiosinstance";
import { useCart } from "../context/cart";

const SearchInput = () => {
  const router = useRouter();
  const [values, setValues] = useSearch();
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useCart();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const { data } = await axiosInstance.get(
          `/api/v1/product/search/${values.keyword}`
        );

        setValues({ ...values, results: data });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  }, [values]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { data } = await axiosInstance.get(
        `/api/v1/product/search/${values.keyword}`
      );

      setValues({ ...values, results: data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackArrowClick = () => {
    router.back();
  };
  return (
    <form role="search" onSubmit={handleSubmit}>
      <div>
        <div className="flex flex-col p-2 py-6 m-h-screen">
          <div
            className="bg-white items-center justify-between w-full flex rounded-full shadow-lg p-2 mb-5 sticky"
            style={{ top: "5px" }}
          >
            <div>
              <div className="p-2 mr-1 rounded-full hover:bg-gray-100 cursor-pointer">
                <svg
                  className="h-6 w-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  onClick={handleBackArrowClick}
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <input
              className="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
              type="text"
              placeholder="Search"
              onChange={(e) =>
                setValues({ ...values, keyword: e.target.value })
              }
            />

            <div className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:p-4 p-2 rounded-lg m-2">
            <div className="lg:text-2xl md:text-xl text-lg lg:p-3 p-1 font-black text-gray-700">
              S E A R C H ...
            </div>

            <div className={`container p-10 bg-white`}>
              <div className="text-center">
                <h3 className="text-black-600 text-lg">
                  {values?.results.length < 1
                    ? "No Products Found"
                    : `Found ${values?.results.length}`}
                </h3>
                <div
                  className={`grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10`}
                >
                  {values?.results.map((p) => (
                    <div
                      className="container bg-white p-2 border-2 px-12 cursor-pointer"
                      key={p._id}
                      onClick={() => {
                        router.push(`/product/${p.slug}`);
                      }}
                    >
                      <img
                        className="img-fluid"
                        src={p.photo[0].url}
                        alt={p.name}
                      />
                      <h6>{p.name}</h6>
                      <h5>
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>

                      <button
                        className="btn btn-dark ms-1"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
