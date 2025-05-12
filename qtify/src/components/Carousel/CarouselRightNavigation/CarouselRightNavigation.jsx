import React, { useEffect, useState } from "react";
import styles from "./CarouselRightNavigation.module.css";
import RightArrow from "../../../assets/rightarrow.png";

export default function CarouselRightNavigation({ swiper }) {
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!swiper) return;

    const update = () => setIsEnd(swiper.isEnd);
    swiper.on("slideChange", update);

    // Set initial value on mount
    setIsEnd(swiper.isEnd);

    return () => {
      swiper.off("slideChange", update);
    };
  }, [swiper]);

  if (!swiper || isEnd) return null;

  return (
    <div
      className={styles.rightNavigation}
      onClick={() => swiper.slideNext()}
      role="button"
      aria-label="Next Slide"
      data-testid="right-arrow"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? swiper.slideNext() : null)}
    >
      <img src={RightArrow} alt="Right Arrow" />
    </div>
  );
}
