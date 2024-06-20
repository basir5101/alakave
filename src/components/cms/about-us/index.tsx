import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AboutUs: React.FC = () => {
  const t = useTranslations("AboutUs");
  // New block to be added above introSection
  const upperSection = {
    id: "upper-intro",
    content: t("upperSection.content"),
    fullWidth: true, // This indicates the section should be full-width
  };

  // New section to be added at the top
  const introSection = {
    id: "qui-sommes-nous",
    title: t("introSection.title"),
    content: t("introSection.content"),
    fullWidth: true, // This indicates the section should be full-width
  };

  // Content for each section stored in an array
  const contentSections = [
    {
      id: "courtoisie-partage",
      title: t("contentSections.content1.title"),
      content: t("contentSections.content1.content"),
      imgSrc: "/png/grid1.png",
      imgAlt: "Our Passion for Wine",
      layout: "right-aligned-img", // This helps determine the layout for the section
    },
    {
      id: "transparency-honesty",
      title: t("contentSections.content2.title"),
      content: t("contentSections.content2.content"),
      imgSrc: "/png/grid2.png",
      imgAlt: "Transparency and Honesty",
      layout: "left-aligned-img",
    },
    {
      id: "elegance-good-mood",
      title: t("contentSections.content3.title"),
      content: t("contentSections.content3.content"),
      imgSrc: "/png/girls.png",
      imgAlt: "ÉLÉGANCE & BONNE HUMEUR",
      layout: "right-aligned-img",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <section
        className="relative bg-cover bg-center bg-no-repeat py-28"
        style={{
          backgroundImage:
            "url('https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/about-us.jpg')",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-black bg-opacity-50 p-8 rounded-lg">
              <h3 className="mb-8 text-2xl ffont-sans font-medium text-white">
                {t("imageTxt")}
              </h3>
            </div>
          </div>
        </div>
      </section>
      {/* New upper text section without title */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-lg">{upperSection.content}</p>
        </div>
      </section>
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-3 text-accent">
            {introSection.title}
          </h3>
          <p>{introSection.content}</p>
        </div>
      </section>

      <main className="flex-grow">
        {contentSections.map((section, index) => (
          <section
            key={section.id}
            className={`py-10 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
          >
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
              {section.layout === "left-aligned-img" && (
                <div className="lg:col-span-1 flex justify-center">
                  <Image
                    src={section.imgSrc}
                    alt={section.imgAlt}
                    layout="intrinsic"
                    width={500}
                    height={300}
                  />
                </div>
              )}
              <div
                className={`lg:col-span-2 ${
                  section.layout === "left-aligned-img"
                    ? "order-first lg:order-none"
                    : ""
                }`}
              >
                <h3 className="text-2xl font-bold mb-3 text-accent">
                  {section.title}
                </h3>
                <p>{section.content}</p>
              </div>
              {section.layout === "right-aligned-img" && (
                <div className="lg:col-span-1 flex justify-center">
                  <Image
                    src={section.imgSrc}
                    alt={section.imgAlt}
                    layout="intrinsic"
                    width={500}
                    height={300}
                  />
                </div>
              )}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default AboutUs;
