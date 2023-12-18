"use client";
import { AiOutlineReload } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { BestSellersList } from "@/app/components/BestSellersList";
import "../../home.css";
import axiosInstance from "@/app/hooks/axiosinstance";
import { Prices } from "@/app/components/Prices";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/button";
import Product from "@/app/components/product";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Products() {
    const router = useRouter();
    // const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState("");
    const [radio, setRadio] = useState("");
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [subcategories, setSubcategories] = useState([]);

    //get cat
    const getCategories = async () => {
        try {
            const { data } = await axiosInstance.get(
                "/api/v1/category/get-category"
            );
            setCategories(data.category);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
        getTotal();
    }, []);
    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.get(
                `/api/v1/product/product-list/${page}`
            );

            if (page == 1) {
                setLoading(false);
                setProducts(data.products);
            } else {
                setLoading(false);
                setProducts((prevProducts) => [
                    ...prevProducts,
                    ...data.products,
                ]);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTOtal COunt
    const getTotal = async () => {
        try {
            const { data } = await axiosInstance.get(
                "/api/v1/product/product-count"
            );
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    // filter by cat
    const handleFilter = (value, id) => {
        setChecked(value);
    };

    //get filterd product
    const filterProduct = async () => {
        const rad = Prices.find((price) => price.name === radio)?.array || [];

        try {
            if (page == 1) {
                const { data } = await axiosInstance.post(
                    "/api/v1/product/product-filters",
                    {
                        checked,
                        radio: rad,
                        subcategory,
                        page,
                    }
                );
                setProducts(data.products);
                setTotal(data.total);
            } else {
                const { data } = await axiosInstance.post(
                    "/api/v1/product/product-filters",
                    {
                        checked,
                        radio: rad,
                        subcategory,
                        page,
                    }
                );
                setProducts((prevProducts) => [
                    ...prevProducts,
                    ...data.products,
                ]);
                setTotal(data.total);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isNewProduct = (createdAt) => {
        const currentDate = new Date();
        const twoWeeksAgo = new Date(currentDate - 14 * 24 * 60 * 60 * 1000);
        const createdAtDate = new Date(createdAt);
        return createdAtDate >= twoWeeksAgo;
    };

    const calculateDiscountedPrice = (originalPrice) => {
        const discountedPrice = originalPrice + (originalPrice * 20) / 100;
        return discountedPrice;
    };

    useEffect(() => {
        const selectedCategory = categories.find((cat) => cat.name === checked);

        const categorySubcategories = selectedCategory
            ? selectedCategory.subcategories
            : [];

        setSubcategories(categorySubcategories);
        setSubcategory("");
    }, [checked, categories]);

    useEffect(() => {
        if (!checked.length || !radio.length || !subcategory.length)
            getAllProducts();
    }, [page]);

    useEffect(() => {
        if (checked.length || radio.length || subcategory.length)
            filterProduct();
    }, [checked, radio, subcategory, page]);

    return (
        <>
            <div
                className={`m-10 flex flex-col justify-around md:flex-row ${inter.className}`}
            >
                <p className="my-2.5 text-gray-600">Filter by:</p>
                <div className="d-flex flex-column">
                    <select
                        className="border-grey-300 m-2 border-2 p-2"
                        placeholder="Select"
                        value={radio}
                        onChange={(e) => {
                            setPage(1);
                            setRadio(e.target.value);
                        }}
                    >
                        <option value="" disabled>
                            Select your option
                        </option>
                        <option value="all" key={"price-all"}>
                            All
                        </option>
                        {Prices?.map((p) => (
                            <option key={`price-${p._id}`} value={p.name}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        name="categories-range"
                        value={checked}
                        className="border-grey-300 m-2 border-2 p-2"
                        onChange={(e) => {
                            setPage(1);
                            handleFilter(e.target.value, e.target.key);
                        }}
                    >
                        <option value="" disabled>
                            Select your option
                        </option>
                        <option value="all" key={"category-all"}>
                            All
                        </option>
                        {categories.map((c) => (
                            <option key={`category-${c._id}`} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        value={subcategory}
                        onChange={(e) => {
                            setPage(1);
                            setSubcategory(e.target.value);
                        }}
                        className="border-300 m-2 border-2 p-2"
                        disabled={!checked} // Disable if no category selected
                    >
                        <option value="" disabled>
                            Select your option
                        </option>
                        {subcategories.map((subcat) => (
                            <option key={subcat._id} value={subcat._id}>
                                {subcat.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="container-fluid" id="best-seller">
                <Link className="mx-4" href="/admin/create-product">
                    <Button
                        value="Create Product"
                        bg="bg-black"
                        color="text-white"
                    />
                </Link>
                <div id="best-seller-row">
                    <div
                        className={`grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4`}
                    >
                        {products?.map((p) => (
                            <div
                                className="container bg-white"
                                key={`product-${p._id}`}
                            >
                                <Product
                                    image={p.photo[0].public_id}
                                    key={p._id}
                                    {...p}
                                />

                                <div className="my-4 flex justify-start">
                                    <Button
                                        onClick={() => {
                                            router.push(
                                                `update-product/${p.slug}`
                                            );
                                        }}
                                        value="Update"
                                        bg="bg-black"
                                        color="text-white"
                                    />
                                    <br />
                                    <Button
                                        onClick={() => {
                                            router.push(
                                                `delete-product/${p.slug}`
                                            );
                                        }}
                                        value="Delete"
                                        bg="bg-black"
                                        color="text-white"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="btn loadmore"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? (
                                    "Loading ..."
                                ) : (
                                    <>
                                        {" "}
                                        Loadmore <AiOutlineReload />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </>
    );
}
