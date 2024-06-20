"use client";
import { Transaction } from "@/types/transaction";
import React, { useState } from "react";
import Purchased from "./Purchased";
import Products from "./Products";
import { useTranslations } from "next-intl";

export default function Tabs({
  transactions,
  userId,
}: {
  transactions: Transaction[];
  userId: string;
}) {
  const t = useTranslations("order");
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <div>
      <div className="grid lg:grid-cols-4 grid-cols-2 mb-4">
        {[t("tab1"), t("tab2"), t("tab3"), t("tab4")].map((item, index) => (
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
      {activeTab === 0 && <Products userId={userId} />}
      {activeTab === 2 &&
        transactions.length > 0 &&
        transactions.map((transaction) => (
          <Purchased transaction={transaction} key={transaction.id} />
        ))}
    </div>
  );
}
