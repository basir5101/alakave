"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/navigation";
// import { type Locale } from "@/lib/locales";
import { GlobeIcon } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import Image from "next/image";

export const LanguagePicker2: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const local = useLocale();

  function handleLocaleChange(newLocale: any): void {
    // document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          {local === "fr" ? (
            <div className="flex items-center space-x-2 bg-transparent  p-1 rounded">
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
          ) : (
            <div className="flex items-center space-x-2 bg-transparent  p-1 rounded">
              <Image
                src="/en.svg"
                alt="EN Flag"
                width={22}
                height={22}
                // This is to prioritize flag loading
                priority
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
              <span>EN</span>
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              handleLocaleChange("fr");
            }}
          >
            <div className="flex items-center space-x-2 bg-transparent p-1 rounded">
              <Image
                src="/png/french-flag.png"
                alt="EN Flag"
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
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleLocaleChange("en");
            }}
          >
            <div className="flex items-center space-x-2 bg-transparent p-1 rounded">
              <Image
                src="/en.svg"
                alt="EN Flag"
                width={22}
                height={22}
                // This is to prioritize flag loading
                priority
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
              <span>EN</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
