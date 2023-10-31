"use client";

//Components
import { useState, useEffect } from "react";
import { BestSellersList } from "./components/BestSellersList.js";
import { BestThree } from "./components/BestThree.js";
import EmblaCarousel from "./components/Carousel";
import NewsLetter from "./components/Newsletter.jsx";
import "./embla.css";
import NewsletterModal from "./components/NewsletterModal.jsx";

const OPTIONS = { loop: true };
const SLIDE_COUNT = 4;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
//Styles
import "./home.css";
import CategoriesList from "./components/CategoriesList.js";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  // Use useEffect to show the modal on the initial load
  useEffect(() => {
    setModalVisible(true);
  }, []);
  return (
    <>
      <section className="sandbox__carousel">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </section>
      <div className="h-20"></div>
      <div className="my-8">
        <h3 className={`text-center text-center-h3`}>
          Leatherwear to complement your lifestyle.
        </h3>
      </div>
      <div className="h-10"></div>
      <div className="separator-div flex justify-around items-center">
        <img width={300} src="/logo.jpg" alt="logo" id="logo" />
        <h2 className={` text-white`}>Start your leather journey here !</h2>
      </div>

      <div className={`flex justify-center `}>
        <h1 className="text-5xl mt-14">Categories</h1>
      </div>
      <div className="p-7" id="categories">
        <CategoriesList />
      </div>
      <div className="h-20"></div>
      <div className="p-5">
        <div id="ad1">
          <img src="/ad1.jpg" alt="" />
        </div>
      </div>

      <div className={`flex justify-center `}>
        <h2 className="categories-heading">Best Sellers</h2>
      </div>
      <div className="container-fluid" id="best-seller">
        <div id="best-seller-row">
          <div
            className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
            id="best-seller-row"
          >
            <BestSellersList />
          </div>
        </div>
      </div>
      <div className="h-10"></div>
      <div className="p-10 ">
        <div className="flex flex-col items-center">
          <h1 className="categories-heading my-7">Why choose us? </h1>
        </div>
        <div className="grid gap-20 grid-cols-1 md:grid-cols-2 flex justify-center mx-20">
          <BestThree />
        </div>
      </div>
      <div className="h-20"></div>

      <NewsLetter />

      {modalVisible && <NewsletterModal />}
    </>
  );
}
