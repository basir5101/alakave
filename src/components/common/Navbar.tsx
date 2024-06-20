"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import Image from "next/image";
import { SellProductButton } from "@/components/SellProductButton";
import SideMenu from "@/components/SideMenu";
import {
  AlignLeft,
  AlignRight,
  ArrowDown,
  Bell,
  ChevronDown,
  Heart,
  Home,
  Mail,
  MessageCircle,
  TruckIcon,
  User,
  Users,
  Wallet2,
  Wine,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { regions } from "@/lib/data";
import { useLocale, useTranslations } from "next-intl";
import { LanguagePicker } from "./language-switcher";

function Navbar({ currentUser }: any) {
  interface SearchResultItem {
    id: string;
    title: string;
    imageUrl: string;
    images: string[];
  }
  const t = useTranslations("Navbar");
  const t_s = useTranslations("accountSidebar");
  const locale = useLocale();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visibleLink, setVisibleLink] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSideMenuToggle = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };
  // Function to handle search input change
  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchValue = event.target.value.trim();
    const region = regions.find((region: { name: string; id: number }) =>
      region.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchInput(searchValue);
    if (searchValue === "") {
      setSearchResults([]);
      return;
    }

    // Create a Firestore query to search for products by region
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("region", "==", region?.value || ""));

    try {
      const querySnapshot = await getDocs(q);
      const searchResults = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as SearchResultItem)
      );
      setSearchResults(searchResults); // Save the results in state
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]);
    }
  };

  const menus = [
    {
      label: t_s("myAccount"),
      link: "/my-account",
      icon: Home,
    },
    {
      label: t_s("message"),
      link: "/message",
      icon: MessageCircle,
    },
    {
      label: t_s("order"),
      link: "/order",
      icon: Wine,
    },
    {
      label: t_s("sponsor"),
      link: "/my-friend-rating",
      icon: Users,
    },
    {
      label: t_s("trackOrder"),
      link: "/track-order",
      icon: TruckIcon,
    },
    {
      label: t_s("wallet"),
      link: "/wallet",
      icon: Wallet2,
    },
  ];

  return (
    <>
      <nav className="absolute top-0 left-0 w-full xl:px-5 2xl:px-14 px-8 py-3 z-50">
        <div className="flex justify-between items-center">
          {/* Left Section: Burger Menu Icon and Search Bar */}
          <div className="flex items-center space-x-4  w-full">
            {" "}
            {/* Adjusted the basis here */}
            <button
              aria-label="Open Menu"
              className="hover:text-gray-100 mr-4"
              onClick={handleSideMenuToggle}
            >
              {/* <AlignLeft color="#EAB308" size={48} /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="currentColor"
                className="bi bi-text-indent-right text-white "
                viewBox="0 0 16 16"
              >
                <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm10.646 2.146a.5.5 0 0 1 .708.708L11.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zM2 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"></path>
              </svg>
            </button>
            <SideMenu
              className={`transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
                isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
              isOpen={isSideMenuOpen}
              onClose={handleSideMenuToggle}
            />
            {/* Search bar  */}
            <div className="relative container mx-auto px-4 hidden lg:block ">
              <input
                type="search"
                placeholder={t("search")}
                className="ml-4 px-4 py-2 rounded-md border border-grey border-1 w-full"
                value={searchInput}
                onChange={handleSearchChange} // Set the onChange handler
              />
              {searchResults.length > 0 && (
                <div className="search-results-dropdown left-5 mt-1 absolute w-full">
                  {searchResults.map((item) => (
                    <Link
                      href={`/${locale}/products/${item.id}`}
                      key={item.id}
                      className="search-result-item flex items-center space-x-3 bg-white p-2 rounded shadow"
                    >
                      <Image
                        src={item?.images?.[0]}
                        alt={item.title}
                        height={50}
                        width={50}
                        className="w-12 h-12 object-cover rounded-full"
                      />

                      <p className="flex-1 truncate">{item.title}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Section: Logo */}
          <div
            className="w-full "
            // style={{ marginLeft: "-20rem" }}
          >
            {" "}
            {/* This will grow as needed */}
            <Link href={`/${locale}/home_screen`}>
              <div className="flex justify-center flex-1">
                <Image
                  src="/png/logo.webp"
                  alt="Logo"
                  width={205}
                  height={50}
                  priority
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </Link>
          </div>
          <div className="flex w-full justify-end items-center space-x-2">
            <div className="hidden lg:block">
              {isAuthenticated ? (
                <SellProductButton />
              ) : (
                <>
                  <Link href={`/${locale}/register`}>
                    <Button className="bg-transparent hover:bg-yellow-600 text-white bg-accent py-2 px-4 rounded border border-accent mr-2">
                      {t("register")}
                    </Button>
                  </Link>
                  <Link href={`/${locale}/login`}>
                    <Button className="bg-transparent text-accent py-2 px-4 rounded border bg-white border-accent mr-2">
                      {t("login")}
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <div className="mx-5"></div>
            {isAuthenticated && (
              <>
                <div className="mx-1 hidden lg:block">
                  <Link href={`/${locale}/my-wishlist`}>
                    <Heart color="#ffffff" size={24} />
                  </Link>
                </div>
                <div className="mx-1 hidden lg:block">
                  <Bell color="#ffffff" size={24} />
                </div>
                <div className="mx-1 hidden lg:block">
                  <Link href={`/${locale}/message`}>
                    <Mail color="#ffffff" size={24} />
                  </Link>
                </div>
                <div className="mx-3 group relative ">
                  <button
                    onClick={() => setVisibleLink(!visibleLink)}
                    className="flex items-end "
                  >
                    <Image
                      src={user?.photoURL}
                      height={28}
                      width={28}
                      alt="user"
                      style={{ height: "28px" }}
                      className="border rounded-full"
                    />
                    <ChevronDown color="#fff" size={20} />
                  </button>
                  <div
                    style={{ width: "240px" }}
                    className={`absolute py-4 bg-white mt-2 border shadow right-0 ${
                      visibleLink ? "block" : "hidden"
                    }`}
                  >
                    <ul>
                      {menus.map((menu, index) => (
                        <li key={menu.link}>
                          <Link
                            className="py-2 hover:bg-secondary px-4 flex"
                            href={`/${locale}${menu.link}`}
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
                                <span> {t(`menu${index + 1}`)} </span>
                              </>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}

            <LanguagePicker />
          </div>
        </div>
      </nav>

      <SideMenu isOpen={isSideMenuOpen} onClose={handleSideMenuToggle} />
    </>
  );
}

export default Navbar;

// Code for Responsive
// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import styles from './Navbar.module.css'; // Assuming you have CSS modules set up

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.logo}>
//         <Link href="/">
//           <a>
//             <Image
//               src="/path/to/your/logo.svg" // Replace with your logo
//               alt="Logo"
//               width={50}
//               height={50}
//             />
//             <span>Your Brand</span>
//           </a>
//         </Link>
//       </div>

//       <button className={styles.menuButton} onClick={toggleMenu}>
//         {/* Hamburger Icon */}
//       </button>

//       <div className={`${styles.menu} ${isMenuOpen ? styles.showMenu : ''}`}>
//         <Link href="/blog"><a>Blog</a></Link>
//         <Link href="/projects"><a>Projects</a></Link>
//         {/* Add more navigation links here */}
//       </div>

//       {/* Overlay for when the menu is open */}
//       {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
//     </nav>
//   );
// };

// export default Navbar;
