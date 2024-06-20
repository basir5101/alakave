import AccountLayout from "@/components/layout/AccountLayout";
import React, { useState } from "react";
import Tabs from "./Tabs";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { redirect } from "next/navigation";
import { useLocale } from "next-intl";
export default async function Page() {
  const locale = useLocale();
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/${locale}/login`);
  }
  return (
    <AccountLayout>
      {user?.uid && (
        <Tabs
          user={{
            id: user?.uid || "",
            fullName: user?.displayName || "",
            photoURL: user?.photoURL || "",
          }}
        />
      )}
    </AccountLayout>
  );
}
