import AccountLayout from "@/components/layout/AccountLayout";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase-config";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { doc, getDoc } from "firebase/firestore";
import { Wallets } from "mangopay2-nodejs-sdk/typings/services/Wallets";
import React from "react";
import AddMoney from "./AddMoney";
import { redirect } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
export default async function Page() {
  const locale = await getLocale();
  let data: any = {};
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/${locale}/login`);
  }
  const userRef = doc(db, "users", user?.uid || "");
  const documentSnapshot: any = await getDoc(userRef);
  const { walletId, cardId, cardReg } = documentSnapshot.data();

  try {
    const res = await fetch(
      `${process.env.API_URL}/api/wallet?walletId=${walletId}&cardId=${
        cardId || cardReg
      }`,
      { cache: "no-cache" }
    );
    data = await res?.json();
  } catch (error) {}
  return (
    <AccountLayout>
      <PageContent data={data} />
      {/* <div className="px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-2xl">Mon portefeuille</h2>
          <AddMoney cardData={data?.data?.cardData} />
        </div>
        <div className="p-4 mt-8 bg-gray-50">
          <div className="flex text-lg justify-between my-2">
            <div className="font-semibold">Solde disponible</div>
            <div className="font-semibold">
              {data?.data?.walletData?.Balance?.Amount}
            </div>
          </div>
          <hr />
          <div className="flex text-lg text-gray-500 justify-between my-2">
            <div className="">Montant en attente</div>
            <div className="font-semibold">0.00</div>
          </div>
        </div>
      </div> */}
    </AccountLayout>
  );
}

function PageContent({ data }: { data: any }) {
  const t = useTranslations("wallet");
  return (
    <div className="px-8">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl"> {t("title")} </h2>
        <AddMoney cardData={data?.data?.cardData} />
      </div>
      <div className="p-4 mt-8 bg-gray-50">
        <div className="flex text-lg justify-between my-2">
          <div className="font-semibold"> {t("available")}</div>
          <div className="font-semibold">
            {data?.data?.walletData?.Balance?.Amount}
          </div>
        </div>
        <hr />
        <div className="flex text-lg text-gray-500 justify-between my-2">
          <div className=""> {t("pending")}</div>
          <div className="font-semibold">0.00</div>
        </div>
      </div>
    </div>
  );
}
