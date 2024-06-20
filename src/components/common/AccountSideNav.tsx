"use client";
import { signOut } from "@/lib/firebase/auth";
import {
  Car,
  Home,
  ListOrdered,
  LogOut,
  MessageCircle,
  Settings,
  Wallet2,
  Wine,
  Users,
  Truck,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import SideMenu from "../SideMenu";
import AccountSideMenu from "../AccountSideMenu";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

export default function AccountSideNav() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);
  const t = useTranslations("accountSidebar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const menus = [
    {
      label: t("myAccount"),
      link: `/${locale}//my-account`,
      icon: Home,
    },
    // {
    //   label: "Mon profil et mes paramètres",
    //   link: "/edit-profile",
    //   icon: UserRoundCog,
    // },
    {
      label: t("message"),
      link: `/${locale}/message`,
      icon: MessageCircle,
    },
    {
      label: t("order"),
      link: `/${locale}/order`,
      icon: Wine,
    },
    {
      label: t("sponsor"),
      link: `/${locale}/my-friend-rating`,
      icon: Users,
    },
    {
      label: t("trackOrder"),
      link: `/${locale}/track-order`,
      icon: Truck,
    },
    {
      label: t("wallet"),
      link: `/${locale}/wallet`,
      icon: Wallet2,
    },
  ];
  const handleSignOut = async () => {
    const isOk = await signOut();

    if (isOk) router.push(`/${locale}/login`);
  };
  const handleSideMenuToggle = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };
  const activeLink = menus.find((menu) => menu.link === pathname);
  return (
    <div className="z-50">
      <div className="md:hidden flex justify-between mb-10 items-center">
        <div className="text-lg font-bold capitalize">
          {activeLink ? activeLink.label : ""}
        </div>
        <button
          aria-label="Open Menu"
          className="hover:text-gray-100 mr-4"
          onClick={handleSideMenuToggle}
        >
          {/* <AlignLeft color="#EAB308" size={48} /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-text-indent-right text-black "
            viewBox="0 0 16 16"
          >
            <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm10.646 2.146a.5.5 0 0 1 .708.708L11.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zM2 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"></path>
          </svg>
        </button>
      </div>
      <div className="hidden md:block">
        {menus.map((menu) => (
          <Link
            className={`flex w-full px-4 py-2 rounded-md ${
              pathname === menu.link
                ? "bg-gray-900 text-gray-50"
                : "hover:bg-white"
            }`}
            key={menu.link}
            href={`${menu.link}`}
          >
            {menu.link === "/order" ? (
              <>
                <Image
                  src={"/png/bottol.png"}
                  height={10}
                  width={16}
                  alt="bottle"
                  className="mr-3"
                  style={{ width: "20px", height: "20px" }}
                />
                <span>{menu.label}</span>{" "}
              </>
            ) : (
              <>
                <menu.icon className="h-5 mr-2" />
                <span>{menu.label}</span>
              </>
            )}
          </Link>
        ))}
        <hr />
        <button
          className="w-full flex px-3 py-3 mb-3 rounded-md text-gray-900 hover:bg-white"
          onClick={(e) => {
            handleSignOut();
          }}
        >
          <LogOut /> <span className="ml-3"> {t("logOut")} </span>
        </button>
      </div>
      <AccountSideMenu
        menus={menus}
        isOpen={isSideMenuOpen}
        onClose={handleSideMenuToggle}
      />
    </div>
  );
}
