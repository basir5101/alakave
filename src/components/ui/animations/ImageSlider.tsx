// components/ImageSlider.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import Pagination from "swiper";
import Image from "next/image";
import MyContext from "../../contexts/MyContext";

interface Slide {
  src: string;
  alt: string;
  text: string;
  buttonText: string;
  buttonAction: () => void;
}

const ImageSlider: React.FC = () => {
  const slides: Slide[] = [
    {
      src: "https://alakave.com/image/banner/64e651e967845.jpg'",
      alt: "First Slide",
      text: " Bienvenue Alakave.com, votre toute nouvelle plateforme pour acheter et vendre vos vins entre membres de confiance. Créez votre compte gratuitement et faites livrer vos vins de porte à porte, en toute sécurité.",
      buttonText: "Créer mon compte gratuit",
      buttonAction: () => alert("First Button Clicked!"),
    },
    {
      src: "https://alakave.com/image/banner/64e651041d5be.jpg",
      alt: "Second Slide",
      text: " Bienvenue Alakave.com, votre toute nouvelle plateforme pour acheter et vendre vos vins entre membres de confiance. Créez votre compte gratuitement et faites livrer vos vins de porte à porte, en toute sécurité.",
      buttonText: "Créer mon compte gratuit",
      buttonAction: () => alert("Second Button Clicked!"),
    },
    {
        src: "https://alakave.com/image/banner/64e65005dccfe.jpg",
        alt: "Third Slide",
        text: "La confiance? C’est essentiel.  Bienvenus sur alakave.com, le cercle privé des caves d’exception. Ici, on achète et on vend les vins de notre cave de entre amis, entre amateurs ou passionnés, entre particuliers ou professionnels, de cave à cave… On achète et on vend surtout entre membre ",
        buttonText: "Créer mon compte gratuit",
        buttonAction: () => alert("Second Button Clicked!"),
      },
  ];

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-96">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover"
              }} />
            <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
              <p className="text-white text-xl mb-4">{slide.text}</p>
              <button
                onClick={slide.buttonAction}
                className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;


