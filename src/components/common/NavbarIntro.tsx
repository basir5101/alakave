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

function NavbarIntro({ currentUser }: any) {
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
      <nav className="absolute  top-0 left-0 w-full px-14 py-3 z-50">
        <div className="flex justify-between  items-center">
          <div className="flex justify-center flex-1">
            {" "}
            {/* This will grow as needed */}
            <Link href="/">
              <div className="flex justify-center flex-1">
                <Image
                  src="/png/logo.webp"
                  alt="Logo"
                  width={401}
                  height={100}
                  priority
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </Link>
          </div>

          {/* <div>
          {isAuthenticated ? (
            <SellProductButton />
          ) : (
            <>
              <Link href="/login">
                <Button className="bg-white text-yellow-500 py-2 px-4 rounded border border-yellow-500 mr-2">
                  Login
                </Button>
              </Link>
            </>
          )}
        </div> */}
          <div className="flex items-center space-x-2 bg-transparent text-white p-1 rounded">
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
      </nav>

      <SideMenu isOpen={isSideMenuOpen} onClose={handleSideMenuToggle} />
    </>
  );
}

export default NavbarIntro;
