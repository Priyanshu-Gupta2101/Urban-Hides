import React from "react";

export const BestThree = () => {
  return (
    <>
      <div className={`col-lg-4 single-of-three`}>
        <div className="container d-flex flex-column bg-white p-2">
          <img src="three_01.jpg" className="img-fluid" alt="" />
          <h4 className="text-center mt-5 mb-5">FREE SHIPPING !</h4>
        </div>
      </div>
      <div className={`col-lg-4 single-of-three`}>
        <div className="container d-flex flex-column bg-white p-2">
          <img src="three_02.jpg" className="img-fluid" alt="" />
          <h4 className="text-center mt-5 mb-5">GREAT DISCOUNTS !</h4>
        </div>
      </div>
      <div className={`col-lg-4 single-of-three`}>
        <div className="container d-flex flex-column bg-white p-2">
          <img src="three_03.jpg" className="img-fluid" alt="" />
          <h4 className="text-center mt-5 mb-5">SECURE PAYMENT !</h4>
        </div>
      </div>
    </>
  );
};
