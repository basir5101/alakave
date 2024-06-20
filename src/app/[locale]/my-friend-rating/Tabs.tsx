"use client";
import React, { useState } from "react";
import Sponsors from "./Sponsors";
import { useTranslations } from "next-intl";

export default function Tabs({
  user,
}: {
  user: { id: string; fullName: string; photoURL: string };
}) {
  const t = useTranslations("sponsor");
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <div className="flex">
        {[t("tab1"), t("tab2"), t("tab3")].map((item, index) => (
          <button
            onClick={() => setActiveTab(index)}
            key={index}
            className={`font-semibold  py-1 rounded-lg  px-4 ${
              index === activeTab ? "bg-accent text-white" : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      {activeTab === 0 && <Sponsors user={user} />}
    </>
  );
}
