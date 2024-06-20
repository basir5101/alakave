"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase-config";
import { useRouter } from "@/navigation";
import { addDoc, collection } from "firebase/firestore";
import { useLocale } from "next-intl";
// import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

function Checkout({
  walletId,
  sellerId,
  buyerId,
  productId,
}: {
  walletId: string;
  buyerId: string;
  sellerId: string;
  productId: string;
}) {
  const router = useRouter();
  const locale = useLocale();
  const handleCheckout = async () => {
    toast.loading("processing payment");
    const collectionRef = collection(db, "Transactions");
    const querySnapshot = await addDoc(collectionRef, {
      productId: productId,
      buyerId: buyerId,
      sellerId: sellerId,
      timestamp: new Date(),
    });
    toast.dismiss();
    router.push(`/order`);
  };
  return (
    <>
      <Toaster />
      <Button
        disabled={sellerId === buyerId}
        onClick={handleCheckout}
        className="mt-5 bg-accent hover:bg-yellow-700 w-full rounded-2xl"
      >
        Checkout
      </Button>
    </>
  );
}

export default Checkout;
