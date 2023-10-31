import React from "react";

const StorySection = ({ title, content, imageSrc, isImageRight }) => {
  const imageSideClass = isImageRight ? "order-2" : "order-1";
  const contentSideClass = isImageRight ? "order-1" : "order-2";

  return (
    <div className="flex flex-wrap items-center mb-8">
      <div
        className={`w-full md:w-1/2 ${imageSideClass} md:pl-5 md:pr-10 flex justify-center`}
      >
        <img src={imageSrc} alt={title} className="rounded-lg shadow-md" />
      </div>
      <div className={`w-full md:w-1/2 ${contentSideClass} md:pl-10 md:pr-5`}>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-800">{content}</p>
      </div>
    </div>
  );
};

const OurStory = () => {
  return (
    <div className="container p-6 mt-6 overflow-x-hidden">
      <StorySection
        title="Our Story"
        content="Founded in 2018, URBANHIDES is a family-owned business that is passionate about providing high-quality fashion accessories for men and women. Our products are carefully curated to ensure that our customers always look and feel their best."
        imageSrc="./store.jpg"
        isImageRight={false}
      />

      <StorySection
        title="Our Mission"
        content="At URBANHIDES, our mission is to provide our customers with the best possible shopping experience. We strive to offer a wide range of fashion accessories at affordable prices, while also providing exceptional customer service."
        imageSrc="./IRich3.jpg"
        isImageRight={true}
      />

      <StorySection
        title="Our Products"
        content="We offer a wide range of fashion accessories, including bags, wallets, belts, handbags, and more. All of our products are carefully selected to ensure that they meet our high standards of quality and style."
        imageSrc="./product.jpg"
        isImageRight={false}
      />
    </div>
  );
};

export default OurStory;
