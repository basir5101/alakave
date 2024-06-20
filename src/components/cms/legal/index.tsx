"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader2 from "@/components/common/Loader2";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

// Assuming the structure of the data received matches your LegalData interface
interface LegalData {
  id: string; // Assuming the ID from MongoDB is a string
  title: string;
  content: string;
}

interface DropdownProps {
  title: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto my-2">
      <div className="flex justify-between items-center bg-white text-black font-sans font-medium border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 px-4 py-2">
        <span>{title}</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="flex items-center focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="mt-2 p-4 bg-white border border-gray-200 rounded-md shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

const Legal: React.FC = () => {
  const t = useTranslations("legal");
  const locale = useLocale();
  const router = useRouter();
  const [legalData, setLegalData] = useState<LegalData[]>([]);
  const [loading, setLoading] = useState(false);
  const handleContactClick = () => {
    // Implement contact click functionality
    // This could be routing to a contact form or triggering a modal, etc.
    router.push(`/${locale}/contact-us`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://alaklave-backend-backoffice-93476c2c9048.herokuapp.com/articles"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Convert IDs to numbers and sort
        const sortedData = data.sort(
          (a: LegalData, b: LegalData) =>
            parseInt(a.id, 10) - parseInt(b.id, 10)
        );
        setLegalData(
          sortedData.reverse().map((item: any) => ({
            id: item._id,
            title: item.title[locale],
            content: item.description[locale],
          }))
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="min-h-screen">
      <section
        className="relative bg-cover mb-3 bg-center bg-no-repeat py-48"
        style={{
          backgroundImage:
            "url('https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/page-legal-tribunal.png')",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-black bg-opacity-50 p-8 rounded-lg">
              <h3 className="mb-8 text-xl font-sans font-medium text-white">
                {t("title")}
              </h3>
            </div>
          </div>
        </div>
      </section>
      {/* <section
        className="relative bg-cover mb-3 bg-center bg-no-repeat h-1/2"
        style={{
          backgroundImage:
            "url('https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/page-legal-tribunal.png')",
        }}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            <div className="bg-black bg-opacity-50 p-8 rounded-lg">
              <h3 className="mb-8 text-xl font-sans font-medium text-white">
                Mentions légales et conditions générales d’utilisation.
              </h3>
            </div>
          </div>
        </div>
      </section> */}
      <div className="max-w-[1400px] lg:m-auto mx-4 mt-5 space-y-4">
        <div className="lg:mx-10">
          {loading ? (
            <Loader2 />
          ) : (
            legalData.map((legal) => (
              <Accordion
                className="bg-white border mb-2"
                key={legal.id}
                type="single"
                collapsible
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-semibold">
                    {" "}
                    {legal.title}{" "}
                  </AccordionTrigger>
                  <AccordionContent>{legal.content}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))
          )}
        </div>
        <div className="lg:mx-10">
          <section>
            <div className="container mx-auto px-0 py-8 lg:flex items-center">
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
      </div>
      <div
        style={{
          backgroundColor: "#f0f3f2",
        }}
        className="py-4"
      >
        <section className="px-5 lg:px-10 max-w-[1400px] lg:m-auto">
          <div className="container mx-auto px-0 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
              <div>
                <h3 className="text-2xl font-sans font-bold mb-4">
                  {t("cards.card1.title")}
                </h3>
                <p>{t("cards.card1.description")}</p>
                <Link
                  href={`/${locale}/contact-us`}
                  className="mt-4 block w-24 text-center bg-accent hover:bg-yellow-600 text-white py-2 px-4 rounded"
                >
                  {t("cards.card1.linkText")}
                </Link>
              </div>
              <div>
                <h3 className="text-2xl font-sans font-bold mb-4">
                  {t("cards.card2.title")}
                </h3>
                <p>{t("cards.card2.description")}</p>

                <Link
                  href={`/${locale}/about-us`}
                  className="mt-4 block w-48 text-center bg-accent hover:bg-yellow-600 text-white py-2 px-4 rounded"
                >
                  {t("cards.card2.linkText")}
                </Link>
              </div>
              <div>
                <h3 className="text-2xl font-sans font-bold mb-4">
                  {t("cards.card3.title")}
                </h3>
                <p>{t("cards.card3.description")}</p>
                <Link
                  href={`/${locale}/contact-us`}
                  className="mt-4 block w-24 text-center bg-accent hover:bg-yellow-600 text-white py-2 px-4 rounded"
                >
                  {t("cards.card3.linkText")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Legal;
