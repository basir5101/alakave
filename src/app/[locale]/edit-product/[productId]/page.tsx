import React from "react";
import { Product } from "@/types/product";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import AccountLayout from "@/components/layout/AccountLayout";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { redirect } from "next/navigation";
import Form from "./Form";
import { getLocale } from "next-intl/server";

export default async function Page({ params }: any) {
  const user = await getCurrentUser();
  const locale = await getLocale();

  if (!user) {
    redirect(`/${locale}/login`);
  }
  let product: Product = {
    title: "",
    description: "",
    images: [],
  };
  const documentRef = await doc(db, "products", params.productId);
  const documentSnapshot = await getDoc(documentRef);
  if (documentSnapshot.exists()) {
    const { title, description, images } = documentSnapshot.data() as Product;
    product = {
      id: documentSnapshot.id,
      title,
      description,
      images,
      ...documentSnapshot.data(),
    };
    console.log("Document data:", product);
  } else {
    console.log("No such document!");
  }
  return (
    <AccountLayout>
      <Form currentUser={user} product={product} />
    </AccountLayout>
  );
}
