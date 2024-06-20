import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function Categories() {
  const t = useTranslations("Home");
  return (
    <div className="xl:container xl:mx-auto mx-5 ">
      <div className="mt-5">
        <Link
          className="font-semibold mr-3 mb-3 text-accent"
          href="#notreSection"
        >
          {t("categories.title")}
        </Link>
        <Link
          className="font-semibold mr-3 mb-3 hover:text-accent"
          href="#byVintage"
        >
          {t("categories.vintage")}
        </Link>
        <Link
          className="font-semibold mr-3 mb-3 hover:text-accent"
          href="#byRegion"
        >
          {t("categories.region")}
        </Link>
        <Link
          className="font-semibold mr-3 mb-3 hover:text-accent"
          href="#users"
        >
          {t("categories.users")}
        </Link>
        <Link
          className="font-semibold mr-3 mb-3 hover:text-accent"
          href="#users"
        >
          {t("categories.sponsors")}
        </Link>
      </div>
    </div>
  );
}
