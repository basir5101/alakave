// app/wine-guide/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar2 from "@/components/common/Navbar2";
import Footer from "@/components/Footer";
import Navbar from "@/components/common/NavbarIntro";
// import { useLocale } from "next-intl";
import { getLocale } from "next-intl/server";
export default async function WineGuide() {
  const local = await getLocale();
  const wineRegions = [
    {
      name: "Sud Ouest",
      imageSrc:
        "https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/SUD-OUEST-min.jpg",
      href: "sud_ouest",
      span: 1,
    },
    {
      name: "Champagne",
      imageSrc:
        "https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/CHAMPAGNE-min.jpg",
      href: "champagne",
      span: 1,
    },
    {
      name: "Corse",
      imageSrc:
        "https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/CORSE-min.jpg",
      href: "corse",
      span: 1,
    },
    {
      name: "Bourgogne",
      imageSrc:
        "https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/BOURGOGNE-min.jpg",
      href: "bourgogne",
      span: 1,
    },
    {
      name: "Bordeaux",
      imageSrc:
        "https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/BORDEAUX-min.jpg",
      href: "bordeaux",
      span: 2,
    },
    {
      name: "Beaujolais",
      imageSrc:
        "https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/Beaujolais.jpg",
      href: "beaujolais",
      span: 2,
    },
    {
      name: "Alsace",
      imageSrc:
        "https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/ALSACE-min.jpg",
      href: "alsace",
      span: 1,
    },
    {
      name: "Provence",
      imageSrc:
        "https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/PROVENCE-min.jpg",
      href: "provence",
      span: 1,
    },
    {
      name: "Savoie",
      imageSrc:
        "https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/SAVOIE.jpg",
      href: "savoie",
      span: 1,
    },
    {
      name: "Languedoc-Roussillon",
      imageSrc:
        "https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/LANGUEDOC-min.jpg",
      href: "languedoc-roussillon",
      span: 1,
    },
    {
      name: "Cotes Du Rhone",
      imageSrc:
        "https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/COTES-DU-RHONE-min.jpg",
      href: "cotes_du_rhone",
      span: 1,
    },
    {
      name: "Jura",
      imageSrc:
        "https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/JURA-min.jpg",
      href: "jura",
      span: 3,
    },
    {
      name: "Loire",
      imageSrc:
        "https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/LOIRE-SANCERRE-min.jpg",
      href: "loire",
      span: 3,
    },
    // Add the rest of your wine regions with the `span` property
    // { name: '...', imageSrc: '...', href: '...', span: 2 },
  ];

  return (
    <>
      <header className="bg-white shadow">
        <Navbar2 />
      </header>
      <main className="pt-20">
        <section className="bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap -m-2">
              {wineRegions.map((region, index) => {
                const widthClass =
                  region.span === 3
                    ? "md:w-1/4"
                    : region.span === 2
                    ? "md:w-1/2"
                    : "md:w-1/4";
                return (
                  <div
                    key={index}
                    className={`p-2 w-full sm:w-1/2 ${widthClass}`}
                  >
                    <Link href={`/${local}/region/${region.href}`} passHref>
                      <div className="block relative hover:shadow-lg cursor-pointer group">
                        <Image
                          src={region.imageSrc}
                          alt={region.name}
                          width={300} // These props should match your aspect ratio
                          height={
                            region.span === 3
                              ? 300
                              : region.span === 2
                              ? 300
                              : 150
                          }
                          className="transition duration-300 ease-in-out group-hover:grayscale-0 grayscale object-cover object-center w-full h-72"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 flex items-center justify-center group-hover:opacity-75 transition-opacity">
                          <h5 className="text-accent text-lg">{region.name}</h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <footer className="mt-8">
        <Footer />
      </footer>
    </>
  );
}
