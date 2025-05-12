import React, { useEffect, useState } from "react";
// import { useSwiper } from "swiper/react";
import styles from "./CarouselLeftNavigation.module.css";
import LeftArrow from "../../../assets/leftarrow.png";

export default function CarouselLeftNavigation({ swiper }) {
  const [isBeginning, setIsBeginning] = useState(true);

  useEffect(() => {
    if (!swiper) return;

    const update = () => setIsBeginning(swiper.isBeginning);
    swiper.on("slideChange", update);

    // Set initial value
    setIsBeginning(swiper.isBeginning);

    return () => swiper.off("slideChange", update);
  }, [swiper]);

  if (!swiper) return null;

  return (
    <div className={styles.leftNavigation}>
      {!isBeginning && (
        <img
          src={LeftArrow}
          alt="LeftArrow"
          onClick={() => swiper.slidePrev()}
        />
      )}
    </div>
  );
}