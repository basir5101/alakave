"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { HomeIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import { signOut } from "@/lib/firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function SideMenu({ isOpen, onClose }: any) {
  const t = useTranslations("SideMenu");
  const locale: string = useLocale();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const router = useRouter();
  const pathname = usePathname();
  // Add a local state to control the visibility of the menu after the animation
  const [shouldRender, setRender] = useState(isOpen);

  useEffect(() => {
    // When isOpen changes and it is true, we immediately want to render the menu
    if (isOpen) setRender(true);
  }, [isOpen]);

  const onAnimationEnd = () => {
    // When the closing animation ends, we set shouldRender to false
    if (!isOpen) setRender(false);
  };

  // If shouldRender is false, don't render anything
  if (!shouldRender) return null;

  const handleSignOut = async () => {
    const isOk = await signOut();

    if (isOk) router.push(`/${locale}/login`);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 0.5s ease-in-out" }}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className={`absolute top-0 left-0 h-full w-80 bg-white shadow-lg p-6 overflow-y-auto transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onAnimationEnd={onAnimationEnd} // This event is triggered after transition ends
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex items-center justify-center mb-8">
          <Image
            src="/png/logo-black.png"
            alt="Logo"
            width={328}
            height={100}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        {locale && (
          <>
            <ul className="space-y-2">
              {user && (
                <li>
                  <Link
                    className={`flex w-full px-4 py-1 border-b rounded-md hover:text-accent  ${
                      pathname === `/${locale}/my-account`
                        ? "text-accent"
                        : "text-gray-700"
                    }`}
                    href={`/${locale}/my-account`}
                    onClick={onClose}
                  >
                    <span className="ml-3"> {t("account")} </span>
                  </Link>
                </li>
              )}
              <li>
                <Link
                  className={`flex w-full px-4 py-1 rounded-md hover:text-accent border-b ${
                    pathname === `/${locale}/wine-guide`
                      ? "text-accent"
                      : "text-gray-700"
                  }`}
                  href={`/${locale}/wine-guide`}
                  onClick={onClose}
                >
                  <span className="ml-3">{t("wineGuide")}</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`flex w-full px-4 py-1 rounded-md hover:text-accent border-b ${
                    pathname === `/${locale}/how-it-works`
                      ? "text-accent"
                      : "text-gray-700"
                  }`}
                  href={`/${locale}/how-it-works`}
                  onClick={onClose}
                >
                  <span className="ml-3"> {t("howItWorks")} </span>
                </Link>
              </li>
              <li>
                <Link
                  className={`flex w-full px-4 py-1 rounded-md hover:text-accent border-b ${
                    pathname === `/${locale}/how-to-sell`
                      ? "text-accent"
                      : "text-gray-700"
                  }`}
                  href={`/${locale}/how-to-sell`}
                  onClick={onClose}
                >
                  <span className="ml-3"> {t("howToSell")} </span>
                </Link>
              </li>
              <li>
                <Link
                  className={`flex w-full px-4 py-1 rounded-md hover:text-accent border-b ${
                    pathname === `/${locale}/about-us`
                      ? "text-accent"
                      : "text-gray-700"
                  }`}
                  href={`/${locale}/about-us`}
                  onClick={onClose}
                >
                  <span className="ml-3">{t("aboutUs")} </span>
                </Link>
              </li>
              <li>
                <Link
                  className={`flex w-full px-4 py-1 rounded-md hover:text-accent border-b ${
                    pathname === `/${locale}/legal`
                      ? "text-accent"
                      : "text-gray-700"
                  }`}
                  href={`/${locale}/legal`}
                  onClick={onClose}
                >
                  <span className="ml-3"> {t("legal")} </span>
                </Link>
              </li>
              <li>
                <Link
                  className={`flex w-full px-4 py-1 rounded-md hover:text-accent border-b ${
                    pathname === `/${locale}/faq`
                      ? "text-accent"
                      : "text-gray-700"
                  }`}
                  href={`/${locale}/faq`}
                  onClick={onClose}
                >
                  <span className="ml-3"> {t("faq")} </span>
                </Link>
              </li>
              {/* Rest of the menu items */}

              {user ? (
                <li>
                  <button
                    className=" w-full flex px-4 py-1 rounded-md text-gray-700"
                    onClick={(e) => {
                      onClose();
                      handleSignOut();
                    }}
                  >
                    <span className="ml-3"> {t("logout")} </span>
                  </button>
                </li>
              ) : (
                <li>
                  <a
                    className={`flex w-full px-4 py-1 rounded-md hover:text-accent border-b ${
                      pathname === `/${locale}/login`
                        ? "text-accent"
                        : "text-gray-700"
                    }`}
                    href={`/${locale}/login`}
                    onClick={onClose}
                  >
                    <span className="ml-3"> {t("login")} </span>
                  </a>
                </li>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
