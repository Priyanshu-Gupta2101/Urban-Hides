"use-client";

// import image1 from "./CarouselImages/carousel1.jpg";
// import image2 from "./CarouselImages/carousel2.jpg";
// import image3 from "./CarouselImages/carousel3.jpg";
// import image4 from "./CarouselImages/carousel4.jpg";
// import image5 from "./CarouselImages/carousel5.jpg";

export const images = [1, 2, 3, 4];

const imageByIndex = index => images[index % images.length];

export default imageByIndex;
