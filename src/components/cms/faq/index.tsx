"use client";
import React, { ReactNode, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface DropdownProps {
  title: string;
  children: ReactNode;
}
// Define the structure of your data
interface FAQData {
  id: number;
  title: string;
  content: string;
}

export const FAQ: React.FC = () => {
  const t = useTranslations("faq");
  const local = useLocale();

  // Define your data array
  const faqData: FAQData[] = [
    {
      id: 1,
      title: t("question.1.title"),
      content: t.raw("question.1.content"),
    },
    {
      id: 2,
      title: t("question.2.title"),
      content: t.raw("question.2.content"),
    },
    {
      id: 3,
      title: t("question.3.title"),
      content: t.raw("question.3.content"),
    },
    {
      id: 4,
      title: t("question.4.title"),
      content: t.raw("question.4.content"),
    },
    {
      id: 5,
      title: t("question.5.title"),
      content: t.raw("question.5.content"),
    },
    {
      id: 6,
      title: t("question.6.title"),
      content: t.raw("question.6.content"),
    },
    // ... add more items as needed
  ];

  return (
    <div className="flex flex-col">
      <div>
        <section
          className="relative bg-cover bg-center bg-no-repeat py-32"
          style={{
            backgroundImage:
              "url('https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/faq.jpg')",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-black bg-opacity-50 p-8 rounded-lg">
                <h2 className="mb-8 text-4xl font-sans font-medium text-accent">
                  {t("title")}
                </h2>
                <h3 className="mb-8 text-xl font-sans font-medium text-white">
                  {t("summary")}
                </h3>
              </div>
            </div>
          </div>
        </section>
        <section className="py-10 ">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold mb-3 text-accent">
              {t("welcome.title")}
            </h3>
            <p>{t("welcome.content")}</p>
          </div>
        </section>
        <div className="p-4 container mx-auto space-y-4">
          {faqData.map((faq) => (
            // <Dropdown key={faq.id} title={faq.title}>
            //   <p>{faq.content}</p>
            // </Dropdown>
            <Accordion
              className="bg-white border mb-2"
              key={faq.id}
              type="single"
              collapsible
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold">
                  {" "}
                  {faq.title}{" "}
                </AccordionTrigger>
                <AccordionContent>
                  {/* {faq.content}{" "} */}
                  <div dangerouslySetInnerHTML={{ __html: faq.content }}></div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
        <section>
          <div className="container mx-auto px-4 py-8 lg:flex items-center">
            <a
              href="#"
              className="text-back font-sans font-bold hover:underline"
            >
              {t("partner")}
            </a>
            <div className="flex lg:flex-grow mt-6 lg:mt-0 flex-wrap lg:justify-center justify-between items-center lg:space-x-16 ml-0">
              <Image
                src="/png/mangopay.png"
                alt="Mangopay"
                width={205}
                height={100}
                className="mr-4 mb-4"
                style={{
                  height: "60px",
                  width: "auto",
                }}
              />
              <Image
                src="/svg/Logo_FTGP_Noir.svg"
                alt="French Tech"
                width={100}
                height={100}
                className="mr-4 mb-4"
                style={{
                  height: "60px",
                  width: "auto",
                }}
              />
              <Image
                src="/png/pngegg.png"
                alt="DPD"
                width={100}
                height={100}
                className="mr-4 mb-4"
                style={{
                  height: "60px",
                  width: "auto",
                }}
              />
            </div>
          </div>
        </section>
      </div>
      <section
        style={{
          backgroundColor: "#f0f3f2",
        }}
      >
        <div className="container mb-5 mx-auto p-4 space-y-4">
          <div className="grid lg:grid-cols-3 gap-5">
            <div>
              <h2 className="font-bold text-xl mb-3">
                {t("footer.card1.title")}
              </h2>
              <p>{t("footer.card1.content")}</p>
            </div>
            <div>
              <h2 className="font-bold text-xl mb-3">
                {t("footer.card2.title")}
              </h2>
              <p>{t("footer.card2.content")}</p>
            </div>
            <div>
              <h2 className="font-bold text-xl mb-3">
                {t("footer.card1.title")}
              </h2>
              <p>{t("footer.card1.content")}</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link
            href={`/${local}/add-product`}
            className="px-12 py-2 bg-accent  text-white rounded"
          >
            {t("footer.link")}
          </Link>
          <div className="py-5">{t("footer.text")}</div>
        </div>
      </section>
    </div>
  );
};
export default FAQ;
