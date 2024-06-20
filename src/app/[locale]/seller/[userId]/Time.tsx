"use client";
import moment from "moment";
import { useLocale } from "next-intl";
import React, { useEffect } from "react";

export default function Time({ date }: { date: string }) {
  const locale = useLocale();
  useEffect(() => {
    if (locale === "fr") {
      import(`moment/locale/${locale}`).then(() => {
        moment.locale(locale);
      });
    } else {
      moment.locale("en");
    }
  }, [locale]);
  return <span>{moment(date).format("DD MMM, YYYY")}</span>;
}
