"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import styles from "./SliderSection.module.css";
import { toPersianNumber } from "../../../helper/convertNumbers";

function SliderSection() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "/image/sliderPhoto/sliderImage/car.png",
    "/image/sliderPhoto/sliderImage/fly.png",
    "/image/sliderPhoto/sliderImage/R.png",
    "/image/sliderPhoto/sliderImage/OIP.png",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <div className={styles.sliderTitr}>
          <div className={styles.iconSlider}>
            <div className={styles.greenWrapper}>
              <img
                src="/image/sliderPhoto/Group.svg"
                className={styles.green}
                alt="green"
              />
              <img
                src="/image/sliderPhoto/qestion.svg"
                className={styles.qestion}
                alt="q"
              />
            </div>
          </div>
          <h1 className={styles.title}>
            چرا <span>تورینو</span>؟
          </h1>
        </div>

        <div className={styles.sliderProgrof}>
          <h5>تور طبیعت‌گردی و تاریخی</h5>
          <p>
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
            طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای
            طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
            آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و
            تاریخی را خریداری کنید.
          </p>
        </div>
      </div>

      <div className={styles.sliderSection}>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          // loop={true}
          spaceBetween={-70}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2,
            slideShadows: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[EffectCoverflow, Autoplay]}
          autoplay={{ delay: 3000 }}
          className={styles.mySwiper}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx} className={styles.swiperSlide}>
              <img src={img} alt={`Slide ${idx + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.bottomControls}>
          <button
            className={styles.arrowBtn}
            onClick={() => swiperRef.current && swiperRef.current.slidePrev()}
            aria-label="previous"
          >
            <img src="/image/sliderPhoto/arrow-right.svg" alt="prev" />
          </button>

          <span className={styles.counter}>
            {toPersianNumber(activeIndex + 1)} / {toPersianNumber(images.length)}
          </span>

          <button
            className={styles.arrowBtn}
            onClick={() => swiperRef.current && swiperRef.current.slideNext()}
            aria-label="next"
          >
            <img src="/image/sliderPhoto/arrow-left.svg" alt="next" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SliderSection;
