"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import Image from "next/image";
import { SellProductButton } from "@/components/SellProductButton";
import SideMenu from "@/components/SideMenu";
import { AlignRight, Bell, Mail } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { LanguagePicker } from "./language-switcher";

function NavbarIntro2({ currentUser }: any) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed. User:", user);
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleSideMenuToggle = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <>
      <nav className="absolute top-0 left-0 w-full lg:px-14 px-5 py-3 z-50">
        <div className="flex justify-between items-center">
          <div className="hidden md:block"></div>
          <div className="flex flex-end md:ml-20">
            <Image
              src="/png/logo-black.png"
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
          <div>
            <LanguagePicker />
            {/* <div className="flex items-center space-x-2 bg-transparent text-black p-1 rounded">
              <Image
                src="/png/french-flag.png"
                alt="FR Flag"
                width={24}
                height={24}
                // This is to prioritize flag loading
                priority
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
              <span>FR</span>
            </div> */}
          </div>
        </div>
      </nav>
      {/* <nav className=" hidden top-0 left-0 w-full px-14 py-3 z-50">
        <div className="flex justify-between  items-center">
          <div className="bg-gray-50"></div>
          <div className="bg-white flex">
            {" "}
            <Link href="/">
              <div className="flex justify-center flex-1">
                <Image
                   src="/png/logo-black.png"
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

          <div className="flex items-center space-x-2 bg-transparent text-black p-1 rounded">
            <Image
              src="/png/french-flag.png"
              alt="FR Flag"
              width={24}
              height={24}
              // This is to prioritize flag loading
              priority
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <span>FR</span>
          </div>
        </div>
      </nav> */}

      <SideMenu isOpen={isSideMenuOpen} onClose={handleSideMenuToggle} />
    </>
  );
}

export default NavbarIntro2;
