import React from "react";

export const BestThree = () => {
  return (
    <>
      <div className="single-of-three">
        <div className="bg-white p-2 max-w-full max-h-full md:w-96 mx-auto">
          <img src="three_02.jpg" className="w-full" alt="" />
          <h4 className="text-center mt-5 mb-5">GREAT DISCOUNTS!</h4>
        </div>
      </div>
      <div className="single-of-three">
        <div className="bg-white p-2 max-w-full max-h-full md:w-96 mx-auto">
          <img src="three_03.jpg" className="w-full" alt="" />
          <h4 className="text-center mt-5 mb-5">SECURE PAYMENT!</h4>
        </div>
      </div>
    </>
  );
};
