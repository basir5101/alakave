import React from "react";
import Image from "next/image";
import { AlignRight } from "lucide-react";
import { SellProductButton } from "../../SellProductButton";

export default function MainNav() {
  return (
    <header className="bg-white text-black py-2 px-4 flex items-center shadow-md">
      {/* Left Section: Burger Menu Icon and Search Bar */}
      <div className="flex items-center basis-2/5">
        {" "}
        {/* Adjusted the basis here */}
        <button aria-label="Open Menu" className="hover:text-gray-100">
          <AlignRight color="#000000" size={48} />
        </button>
        <input
          type="search"
          placeholder="Rechercher des bouteilles"
          className="ml-4 px-4 py-2 rounded-md border border-black border-1 w-full" // Removed max-width
        />
      </div>

      {/* Center Section: Logo */}
      <div className="flex justify-center flex-1">
        {" "}
        {/* This will grow as needed */}
        <Image
          src="/png/logo-black.png"
          alt="Logo"
          width={205}
          height={50}
          // This is to prioritize logo loading
          priority
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>

      {/* Right Section: Action Buttons and Country Selector */}
      <div className="flex items-center justify-end basis-2/5">
        {" "}
        {/* Adjusted the basis here */}
        <SellProductButton />
        <button className="bg-accent text-white py-2 px-4 rounded mr-2">
          Devenir Membre
        </button>
        <div className="flex items-center space-x-2 bg-white text-black p-1 rounded">
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
    </header>
  );
}
