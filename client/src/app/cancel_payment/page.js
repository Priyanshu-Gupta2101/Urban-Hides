import React from "react";
import Link from "next/link";

const PaymentFailure = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl text-red-600 font-bold mb-4">Payment Failed</h1>
        <p className="text-lg text-gray-700">
          Sorry, your payment was not successful.
        </p>
        <p className="text-lg text-gray-700">
          Please try again or contact customer support for assistance.
        </p>
        <Link href="/cart">
          <a className="text-blue-600 hover:underline block mt-4">
            Go back to Cart
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailure;
