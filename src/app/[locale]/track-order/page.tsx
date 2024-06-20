"use client";
import AccountLayout from "@/components/layout/AccountLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
export default function Page() {
  const t = useTranslations("trackOrder");
  const [activeTab, setActiveTab] = useState<string>("Online");

  return (
    <AccountLayout>
      <div>
        <label> {t("title")} </label>
        <Input placeholder={t("label")} />
        <Button className="mt-2 px-8 bg-accent hover:bg-yellow-500 rounded-3xl">
          {t("btnText")}
        </Button>
      </div>
    </AccountLayout>
  );
}
