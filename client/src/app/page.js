"use client";

//Components
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation.js";
import { BestSellersList } from "./components/BestSellersList.js";
import { BestThree } from "./components/BestThree.js";
import NewsLetter from "./components/Newsletter.jsx";
import "./embla.css";
import NewsletterModal from "./components/NewsletterModal.jsx";
import Button from "./components/button.js";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

//Styles
import "./home.css";
import CategoriesList from "./components/CategoriesList.js";

const OPTIONS = { loop: true };
const SLIDE_COUNT = 4;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Home() {
    const [modalVisible, setModalVisible] = useState(false);
    const ref = useRef(null);
    const router = useRouter();

    // Use useEffect to show the modal on the initial load
    useEffect(() => {
        setModalVisible(true);
    }, []);

    const scroll = (direction) => {
        if (direction == "left") {
            ref.current.scrollLeft -= 200;
        }
        if (direction == "right") {
            ref.current.scrollLeft += 200;
        }
    };

    return (
        <div className="mx-4">
            <section id="hero" className="mt-10 mb-32">
                <div id="hero-div" className="text-center py-56 px-4">
                    <div className="my-0 mx-auto max-w-2xl">
                        <p className="text-5xl font-bold">
                            Discover Premium Leatherware for Every Occasion
                        </p>
                        <p className="my-6">
                            Experience the timeless elegance and durability of
                            our handcrafted leather products. From stylish
                            jackets to sleek belts, we have something for
                            everyone.
                        </p>
                    </div>
                    <Button value="Shop" color="text-white" bg="bg-black" />
                    <Button
                        value="Learn More"
                        color="text-white"
                        bg="bg-black"
                    />
                </div>
            </section>
            <section id="customization my-32">
                <div className="flex flex-col lg:flex-row justify-evenly">
                    <div className="max-w-xl">
                        <p className="underline">Custom made</p>
                        <p className="text-5xl font-bold my-2">
                            We take your needs to heart
                        </p>
                        <p className="my-2">
                            Order custom made leatherware without restriction on
                            it's color or size! Our leather products are
                            meticulously handcrafted using the finest materials,
                            ensuring durability and style. Experience the luxury
                            of genuine leather that stands the test of time.
                        </p>
                        <div className="my-6">
                        <Button value="Shop" color="text-white" bg="bg-black" />
                        <Button
                            value="Learn More"
                            color="text-white"
                            bg="bg-black"
                        />
                        </div>
                    </div>
                    <div className="self-center">
                        <img src="/custom.webp" alt="custom" className="w-96" />
                    </div>
                </div>
            </section>
            <section>
                <div className="text-center py-32">
                    <p className="text-5xl font-bold">Browse Categories</p>
                    <div className="flex flex-wrap justify-evenly my-32 gap-10">
                        <div
                            style={{
                                background: `url(/Biker.jpg), radial-gradient(#888, #666)`,
                                backgroundBlendMode: "multiply",
                                backgroundSize: "cover",
                            }}
                            className="text-white w-64 h-64 flex justify-center items-center rounded hover:scale-110 duration-500"
                        >
                            <span>Biker Jackets</span>
                        </div>
                        <div
                            style={{
                                background: `url(/coats.jpg), radial-gradient(#888, #666)`,
                                backgroundBlendMode: "multiply",
                                backgroundSize: "cover",
                            }}
                            className="text-white w-64 h-64 flex justify-center items-center rounded hover:scale-110 duration-500"
                        >
                            <span>Coats</span>
                        </div>
                        <div
                            style={{
                                background: `url(/skirts.jpg), radial-gradient(#888, #666)`,
                                backgroundBlendMode: "multiply",
                                backgroundSize: "cover",
                            }}
                            className="text-white w-64 h-64 flex justify-center items-center rounded hover:scale-110 duration-500"
                        >
                            <span>Skirts</span>
                        </div>
                        <div
                            style={{
                                background: `url(/Bags.jpg), radial-gradient(#888, #666)`,
                                backgroundBlendMode: "multiply",
                                backgroundSize: "cover",
                            }}
                            className="text-white w-64 h-64 flex justify-center items-center rounded hover:scale-110 duration-500"
                        >
                            <span>Bags</span>
                        </div>
                    </div>
                </div>
            </section>
            <section id="featured" className="px-6 md:px-20">
                <div>
                    <div>
                        <p className="underline">Discover</p>
                        <div className="my-4 flex flex-row justify-between">
                            <p className="text-5xl font-bold">Featured</p>
                            <div className="flex">
                                <FaAngleLeft
                                    size={35}
                                    onClick={() => scroll("left")}
                                />
                                <FaAngleRight
                                    size={35}
                                    onClick={() => scroll("right")}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="text-xl">
                                Explore our curated collection of premium
                                Bestselling leatherware products.
                            </p>
                            <button
                                className="hidden md:block p-2 rounded bg-white text-black border-2 border-black"
                                onClick={() => router.push("/product")}
                            >
                                View all
                            </button>
                        </div>
                    </div>
                    <div
                        ref={ref}
                        className="flex md:flex-row gap-10 overflow-hidden scroll-smooth"
                        id="best-seller-row"
                    >
                        <BestSellersList />
                    </div>
                </div>
            </section>
        </div>
    );
}
