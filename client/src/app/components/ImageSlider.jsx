import { useState, useRef, useEffect } from "react";

export default function ImageSlider({ props }) {
  const indicatorWidthPercent = props?.length > 0 ? 100 / props?.length : 100;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const sliderCurrent = sliderRef.current;

    if (!sliderCurrent) {
      return;
    }

    const slides = sliderCurrent.querySelectorAll("div");
    const slidesArray = Array.from(slides);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slidesArray.indexOf(entry.target);
            setCurrentSlideIndex(index);
          }
        });
      },
      {
        root: sliderCurrent,
        threshold: 0.5,
      }
    );
    slides.forEach((slide) => observer.observe(slide));

    return () => slides.forEach((slide) => observer.unobserve(slide));
  }, []);

  return (
    <div className="border border-gray-500 p-6">
      <div
        ref={sliderRef}
        className=" md:min-w-350 md:max-w-xs self-center flex flex-row overflow-x-scroll snap-x snap-mandatory"
        style={{
          paddingBottom: "15px",
        }}
      >
        {props.map((url) => {
          return (
            <div
              key={url.url}
              className="w-full flex-shrink-0 snap-start border border-gray-300"
            >
              <img src={url.url} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
