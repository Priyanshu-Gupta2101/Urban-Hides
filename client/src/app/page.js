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
        <div className="mx-4 lg:mx-0">
            <section id="hero" className="mb-32">
                <div id="hero-div" className="px-4 py-56 text-center">
                    <div className="mx-auto my-0 max-w-2xl">
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
                    <button className="hover:bg-gray-950 duration-500 mr-2 rounded border-2 border-white bg-black p-4 text-white">
                        Shop
                    </button>
                    <button className="hover:bg-gray-950 duration-500 rounded border-2 border-white bg-black p-4 text-white">
                        Learn more
                    </button>
                </div>
            </section>
            <section id="customization my-32">
                <div className="flex flex-col justify-evenly gap-5 md:flex-row">
                    <div>
                        <p className="underline">Custom made</p>
                        <p className="my-2 text-5xl font-bold">
                            We take your needs to heart
                        </p>
                        <p className="my-2 max-w-xl">
                            Order custom made leatherware without restriction on
                            it's color or size! Our leather products are
                            meticulously handcrafted using the finest materials,
                            ensuring durability and style. Experience the luxury
                            of genuine leather that stands the test of time.
                        </p>
                        <div className="my-6">
                            <button className="hover:bg-gray-950 mr-2 rounded border-2 border-white bg-black p-4 text-white duration-500">
                                Shop
                            </button>
                            <button
                                className="hover:bg-gray-950 rounded border-2 border-white bg-black p-4 text-white duration-500"
                            >
                                Learn more
                            </button>
                        </div>
                    </div>
                    <div className="self-center">
                        <img src="/custom.webp" alt="custom" className="w-96" />
                    </div>
                </div>
            </section>
            <section>
                <div className="py-32 text-center">
                    <p className="text-5xl font-bold">Browse Categories</p>
                    <div className="my-32 flex flex-wrap justify-evenly gap-10">
                        <div
                            style={{
                                background: `url(/Biker.jpg), radial-gradient(#888, #666)`,
                                backgroundBlendMode: "multiply",
                                backgroundSize: "cover",
                            }}
                            className="flex h-64 w-64 items-center justify-center rounded text-white duration-500 hover:scale-110"
                        >
                            <span>Biker Jackets</span>
                        </div>
                        <div
                            style={{
                                background: `url(/coats.jpg), radial-gradient(#888, #666)`,
                                backgroundBlendMode: "multiply",
                                backgroundSize: "cover",
                            }}
                            className="flex h-64 w-64 items-center justify-center rounded text-white duration-500 hover:scale-110"
                        >
                            <span>Coats</span>
                        </div>
                        <div
                            style={{
                                background: `url(/skirts.jpg), radial-gradient(#888, #666)`,
                                backgroundBlendMode: "multiply",
                                backgroundSize: "cover",
                            }}
                            className="flex h-64 w-64 items-center justify-center rounded text-white duration-500 hover:scale-110"
                        >
                            <span>Skirts</span>
                        </div>
                        <div
                            style={{
                                background: `url(/Bags.jpg), radial-gradient(#888, #666)`,
                                backgroundBlendMode: "multiply",
                                backgroundSize: "cover",
                            }}
                            className="flex h-64 w-64 items-center justify-center rounded text-white duration-500 hover:scale-110"
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
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="text-xl">
                                Explore our curated collection of premium
                                Bestselling leatherware products.
                            </p>
                            <button
                                className="hover:bg-black hover:text-white duration-500 hidden rounded border-2 border-black bg-white p-2 text-black md:block"
                                onClick={() => router.push("/product")}
                            >
                                View all
                            </button>
                        </div>
                        <div className="my-4 flex">
                            <FaAngleLeft
                                size={35}
                                color="gray"
                                onClick={() => scroll("left")}
                            />
                            <FaAngleRight
                                size={35}
                                color="gray"
                                onClick={() => scroll("right")}
                            />
                        </div>
                    </div>
                    <div
                        ref={ref}
                        className="flex gap-10 overflow-hidden scroll-smooth md:flex-row"
                        id="best-seller-row"
                    >
                        <BestSellersList />
                    </div>
                </div>
            </section>
        </div>
    );
}
