import AccountLayout from "@/components/layout/AccountLayout";
import { db } from "@/lib/firebase-config";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { Transaction } from "@/types/transaction";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import Tabs from "./Tabs";
import { redirect } from "next/navigation";
import { useLocale } from "next-intl";
export default async function Page() {
  const currentUser: any = await getCurrentUser();
  const locale = useLocale();
  if (!currentUser) {
    redirect(`/${locale}/login`);
  }
  const transactionsRef = collection(db, "Transactions");
  const q = query(transactionsRef, where("buyerId", "==", currentUser?.uid));

  const transactions: Transaction[] = [];
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // Push each transaction into the array
      transactions.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
  return (
    <AccountLayout>
      <div>
        <Tabs userId={currentUser?.uid} transactions={transactions} />
      </div>
    </AccountLayout>
  );
}
