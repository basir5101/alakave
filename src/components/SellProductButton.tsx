import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export const SellProductButton = () => {
  const local = useLocale();
  const t = useTranslations("Navbar");
  return (
    <>
      <Link
        href={`/${local}/add-product`}
        className="bg-accent py-2 px-4 text-white rounded-lg mr-2 hover:bg-yellow-600"
      >
        {t("sell")}
      </Link>
    </>
  );
};
