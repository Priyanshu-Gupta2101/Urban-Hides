"use client";
import React from "react";
import { useSearch } from "../context/search";
import axiosInstance from "../hooks/axiosinstance";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [values, setValues] = useSearch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      router.push(`/search/${values.keyword}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form role="search" onSubmit={handleSubmit}>
      <input
        type="search"
        className="m-2 p-2 border-2 border-grey-300"
        placeholder="eg. Jacket"
        aria-label="Search"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
      />
      <button className="bg-black text-white font-bold py-2 px-4 rounded-full">
        Submit
      </button>
    </form>
  );
};

export default SearchBar;
