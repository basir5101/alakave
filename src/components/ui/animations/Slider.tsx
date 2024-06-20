"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyContext from "../../contexts/MyContext";
import Image from "next/image";
import styles from "./Slider.module.css";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/navigation";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  appendDots: (dots: any) => (
    <div>
      <ul className={styles.sliderDots}>{dots}</ul>
    </div>
  ),
  customPaging: () => <button></button>,
};

const SliderComponent: React.FC = () => {
  const t = useTranslations("Home");
  const local = useLocale();
  const router = useRouter();
  const handleBtn = () => {
    router.push(`/register`);
  };

  const slidesData = [
    {
      image: "/image/banner/64e651e967845.webp",
      title: t("slider.content1.title"),
      text: t("slider.content1.text"),
      buttonText: t("slider.content1.buttonText"),
    },
    {
      image: "/image/banner/64e651041d5be.webp",
      title: t("slider.content2.title"),
      text: t("slider.content2.text"),
      buttonText: t("slider.content2.buttonText"),
    },
    {
      image: "/image/banner/64e65005dccfe.webp",
      title: t("slider.content3.title"),
      text: t("slider.content3.text"),
      buttonText: t("slider.content3.buttonText"),
    },
    // ...autres slides
  ];
  return (
    <MyContext.Provider
      value={
        {
          /* ...context value */
        }
      }
    >
      <div className={styles.sliderContainer}>
        <Slider {...sliderSettings}>
          {slidesData.map((slide, index) => (
            <div key={index} className="relative">
              <div
                className="relative"
                style={{ height: "calc(24rem + 50px)" }}
              >
                <Image
                  src={slide.image}
                  alt={`Slide ${index}`}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="absolute top-0 lg:left-9 lg:w-1/2 h-full  items-center justify-end p-8 container grid lg:grid-cols-1 gap-1 ">
                <div className="text-left text-white items-end container lg:ml-9 ">
                  <h1 className="text-accent text-xl container xl:text-4xl font-semibold">
                    {slide.title}{" "}
                  </h1>
                  <div
                    className="hidden lg:block text-white container"
                    dangerouslySetInnerHTML={{ __html: slide.text }}
                  ></div>
                  <div className="container mx- ">
                    <button
                      onClick={handleBtn}
                      className="bg-accent hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 "
                    >
                      {slide.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </MyContext.Provider>
  );
};

export default SliderComponent;
