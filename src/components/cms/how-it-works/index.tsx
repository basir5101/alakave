// cms/how-it-works/index.tsx
import React from "react";
import styles from "./howItWorks.module.css"; // make sure to create this CSS module file
import { useLocale, useTranslations } from "next-intl";

const HowiTWorks: React.FC = () => {
  const t = useTranslations("HowItWorks");
  const local = useLocale();
  const sections = [
    {
      title: t("sections.section1.title"),
      content: t("sections.section1.content"),
      linkText: t("sections.section1.linkText"),
      linkUrl: `/${local}/register`, // Update with the actual link
    },
    {
      title: t("sections.section2.title"),
      content: t("sections.section2.content"),
      linkText: t("sections.section2.linkText"),
      linkUrl: "#", // Update with the actual link
    },
    {
      title: t("sections.section3.title"),
      content: t("sections.section3.content"),
      linkText: t("sections.section3.linkText"),
      linkUrl: "#", // Update with the actual link
    },
    {
      title: t("sections.section4.title"),
      content: t("sections.section4.content"),
      linkText: t("sections.section4.linkText"),
      linkUrl: `/${local}/privacy`, // Update with the actual link
    },
    {
      title: t("sections.section5.title"),
      content: t("sections.section5.content"),
      linkText: t("sections.section5.linkText"),
      linkUrl: `/${local}/add-product`, // Update with the actual link
    },
    {
      title: t("sections.section6.title"),
      content: t("sections.section6.content"),
      linkText: t("sections.section6.linkText"),
      linkUrl: "#", // Update with the actual link
    },
  ];

  return (
    <>
      <section
        className="relative bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage:
            "url('https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/how-it-works.jpg')",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-black bg-opacity-50 p-8 rounded-lg">
              <h2 className="mb-8 text-4xl font-semibold text-accent">
                {t("title")}
              </h2>
              <h3 className="mb-8 text-2xl font-semibold text-white">
                {t("content")}
              </h3>
            </div>
            {/* The second column will be empty to ensure the text stays on the left */}
            <div></div>
          </div>
        </div>
      </section>
      <div className={styles.gridContainer}>
        {sections.map((section, index) => (
          <div key={index} className={styles.gridItem}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
            <a href={section.linkUrl}>{section.linkText}</a>
          </div>
        ))}
      </div>
    </>
  );
};

export default HowiTWorks;
