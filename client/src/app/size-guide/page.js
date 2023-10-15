import React from "react";
import SizeChart from "../components/SizeChart";

const page = () => {
  return (
    <div className="container mx-auto my-20 lg:px-80">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-6">Size Guide & Care</h1>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-lg mb-4">
          What's the best size leather jacket for me? Check out our size guide
          so you can select the best size to suit you. We always recommend
          purchasing the size you normally wear.
        </p>

        <SizeChart />

        <div className="my-6">
          <p className="text-lg font-semibold mb-2">Leather Care</p>
          <ul className="list-disc list-inside">
            <li>Do not iron</li>
            <li>Do not wash</li>
            <li>Do not tumble dry</li>
            <li>Do not bleach</li>
          </ul>
          <p className="mt-2">
            We recommend always having your leather jackets professionally
            cleaned.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
