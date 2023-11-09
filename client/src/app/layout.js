"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/footer.jsx";

const inter = Inter({ subsets: ["latin"] });

import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";
import { AuthProvider } from "./context/auth";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function RootLayout({ children }) {
    const renderNavbar = !usePathname().startsWith("/search");

    const initialOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT,
        currency: "USD",
        intent: "capture",
    };

    useEffect(() => {
        (function (d, w, c) {
            w.ChatraID = "ttixew9xEhMjpjErh";
            var s = d.createElement("script");
            w[c] =
                w[c] ||
                function () {
                    (w[c].q = w[c].q || []).push(arguments);
                };
            s.async = true;
            s.src = "https://call.chatra.io/chatra.js";
            if (d.head) d.head.appendChild(s);
        })(document, window, "Chatra");
    }, []);

    return (
        <PayPalScriptProvider options={initialOptions}>
            <SearchProvider>
                <CartProvider>
                    <AuthProvider>
                        <html lang="en">
                            <Head>
                                <link
                                    href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@100;300;400;600;800&display=swap"
                                    rel="stylesheet"
                                />
                                <link
                                    rel="stylesheet"
                                    href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
                                />
                                <link
                                    rel="stylesheet"
                                    href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
                                />

                                <link rel="icon" href="/UH_Logo.svg" />
                            </Head>
                            <body className={inter.className}>
                                {renderNavbar && <Navbar />}
                                {/* <Sidebar /> */}
                                <div className="relative pb-32">
                                    <div className="pb-15">{children}</div>
                                </div>
                                {renderNavbar && <Footer />}
                                {/* <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
                crossorigin="anonymous"
              ></script> */}
                            </body>
                        </html>
                    </AuthProvider>
                </CartProvider>
            </SearchProvider>
        </PayPalScriptProvider>
    );
}
