"use client";
import React, { useRef, useContext, useState, useCallback } from "react";
import { ScrollContext } from "../../utils/scroll-observer";
import { Wine } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/navigation";

const Masthead: React.FC = () => {
  const t = useTranslations("Root");
  const router = useRouter();
  const local = useLocale();

  const handleClick = () => {
    router.push(`/home_screen`, { locale: local });
  };

  const [imageLoaded, setImageLoaded] = useState(false);
  const refContainer = useRef<HTMLDivElement>(null);
  const { scrollY } = useContext(ScrollContext);
  let progress = 0;
  const { current: elContainer } = refContainer;
  if (elContainer) {
    progress = Math.min(1, scrollY / elContainer.clientHeight);
  }
  const handleImageLoaded = useCallback(() => {
    setImageLoaded(true);
  }, []);
  return (
    <div
      ref={refContainer}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        transform: `translateY(-${progress * 20}vh)`,
      }}
    >
      <video
        autoPlay={true}
        loop
        muted
        playsInline
        className="rounded-3xl absolute inset-0 w-auto h-auto  mx-auto my-auto object-cover"
      >
        <source
          src="https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/video/alakave.mp4"
          type="video/mp4"
        />
      </video>

      <div className="flex flex-col items-center justify-center p-12 font-bold z-10 text-white text-center w-full absolute">
        <h1 className="mb-6 text-xl xl:text-xl max-w-screen-lg">
          {t("welcomeText")}{" "}
          <span className="font-bold text-2xl"> {t("highlightedText1")} </span>{" "}
          {t("descriptionText")} ,{" "}
          <span className="font-bold text-2xl">{t("highlightedText2")}</span>
        </h1>
        <h2 className="mb-2 text-xl xl:text-xl tracking-tight max-w-screen-md">
          {t("subTitle")}
        </h2>
        <button
          onClick={handleClick}
          className="mt-4 bg-accent hover:bg-yellow-600 text-white text-center font-semibold py-2 px-4 border border-accent rounded flex items-center justify-center gap-2"
        >
          {t("btn")}
        </button>
      </div>
    </div>
  );
};

export default Masthead;
