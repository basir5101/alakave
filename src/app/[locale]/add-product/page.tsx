import React from "react";
import Form from "./Form";
import {
  getCurrentUser,
  isUserAuthenticated,
} from "@/lib/firebase/firebase-admin";
import { redirect } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import AccountLayout from "@/components/layout/AccountLayout";
import { useLocale } from "next-intl";

export default async function Page() {
  const currentUser = await getCurrentUser();
  const locale = useLocale();
  if (!(await isUserAuthenticated())) redirect(`/${locale}/login`);
  return (
    <AccountLayout>
      {/* <Navbar /> */}
      <Form currentUser={currentUser?.toJSON() as typeof currentUser} />
    </AccountLayout>
  );
}
