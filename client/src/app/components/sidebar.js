"use client";

import SearchBar from "./searchBar";
import { AiOutlineShoppingCart } from "react-icons/ai";

const closeSidebar = () => {
  document.getElementById("sidebar").style.width = "0px";
};

const Sidebar = () => {
  return (
    <div
      id="sidebar"
      className="h-full top-0 left-0 w-0 fixed z-10 bg-gray-900 text-white overflow-x-hidden duration-500"
    >
      <div
        className="absolute top-0 right-6 text-3xl ml-12 mt-1.5 cursor-pointer"
        onClick={closeSidebar}
      >
        &times;
      </div>
      <div className="my-12">
        <ul className="flex flex-col items-center gap-5">
          <li>
            <div>
              <a className="text-xl" href="/">
                UrbanHides
              </a>
            </div>
          </li>
          <li>
            <a className="hover:text-gray-500" href="/product">
              Products
            </a>
          </li>
          <li>
            <a className="hover:text-gray-500" href="/">
              About
            </a>
          </li>
          <li>
            <a className="hover:text-gray-500" href="/contact">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="flex flex-row gap-5 block ">
        <SearchBar />
      </div>
    </div>
  );
};

export default Sidebar;
