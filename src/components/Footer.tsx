import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const Footer: React.FC = () => {
  const t = useTranslations("Footer");
  const local = useLocale();
  return (
    <footer className="bg-white text-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center -mx-4">
          <div className="px-4">
            {/* Legal text and image */}
            <div className="bg-white text-white p-4 flex flex-col sm:flex-row items-center">
              <Image
                src="https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/images/Bandeau%20interdiction%20de%20vente%20de%20vin.png"
                alt="restriction alcool"
                width={478}
                height={58}
              />
              {/* <div className="sm:w-1/4">
                <Image
                  src="https://alakave.com/image/repulic.png"
                  alt="République Française"
                  width={100}
                  height={100}
                  className="bg-gray-100 p-2"
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              </div> */}
              {/* <div className="mt-4 sm:mt-0 sm:w-3/4 sm:pl-4">
                <h6>Interdiction de vente de boissons alcoolisées aux mineurs de moins de 18 ans</h6>
                <p className="text-sm my-1">Preuve de majorité de l&#39;acheteur et du vendeur obligatoire lors de la vente en ligne</p>
                <p className="text-sm text-right">CODE DE LA SANTÉ PUBLIQUE, ART. 3342-1 et L.3353.3</p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Links and App store buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-4">
          <div className="flex flex-col sm:flex-row items-center">
            <a
              href={`/${local}/about-us`}
              className="mx-2 text-accent hover:text-gray-500"
            >
              {t("aboutUs")}
            </a>
            <a
              href={`/${local}/legal`}
              className="mx-2 text-accent hover:text-gray-500"
            >
              {t("legal")}
            </a>
            <a
              href={`/${local}/legal`}
              className="mx-2 text-accent hover:text-gray-500"
            >
              {t("privacyPolicy")}
            </a>
            <a
              href={`/${local}/contact-us`}
              className="mx-2 text-accent hover:text-gray-500"
            >
              {t("contactUs")}
            </a>
          </div>
          {/* <div className="flex mt-4 sm:mt-0">
            <a href="https://play.google.com/store" className="mx-2">
              <Image
                src="https://alakave.com/assets/images/appbutton/googleplay-btn.svg"
                alt="Google Play"
                width={140}
                height={40}
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </a>
            <a href="https://www.apple.com/app-store/" className="mx-2">
              <Image
                src="https://alakave.com/assets/images/appbutton/appstore-btn.svg"
                alt="App Store"
                width={140}
                height={40}
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </a>
          </div> */}
        </div>

        {/* Social links and copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-4">
          <div className="text-sm">
            <span>
              ©{new Date().getFullYear()} {t("copyright")}
            </span>{" "}
            {t("warning")}
          </div>
          {/* <div className="flex mt-4 sm:mt-0"> */}
          {/* Add your social media links here */}
          {/* <a href="/facebook" className="mx-2"><Facebook color='#facc15' /></a>
            <a href="/twitter" className="mx-2"><Twitter color='#facc15' /></a>
            <a href="/instagram" className="mx-2"><Instagram color='#facc15' /></a> */}
          {/* </div> */}

          {/* Payment icons */}
          <div className="flex space-x-4">
            <a href="/facebook" className="mx-2">
              <Facebook color="#BF9000" />
            </a>
            <a href="/twitter" className="mx-2">
              <Twitter color="#BF9000" />
            </a>
            <a href="/instagram" className="mx-2">
              <Instagram color="#BF9000" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
