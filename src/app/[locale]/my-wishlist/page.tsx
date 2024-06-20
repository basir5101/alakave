import AccountLayout from "@/components/layout/AccountLayout";
import React from "react";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { Share2, XIcon } from "lucide-react";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { Product } from "@/types/product";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProductCard from "@/components/common/ProductCard";
import { useLocale } from "next-intl";
export default async function Page() {
  const local = useLocale();
  const user = await getCurrentUser();
  if (!user) {
    redirect(`${local}/login`);
  }
  const favoritesQuery = query(collection(db, `users/${user?.uid}/favorites`));
  const favoritesSnapshot = await getDocs(favoritesQuery);
  const favoriteProducts = favoritesSnapshot.docs.map((doc) => doc.data());

  let products: Product[] = [];
  for (let i = 0; i < favoriteProducts.length; i++) {
    const prod = favoriteProducts[i];
    const documentRef = doc(db, "products", prod.productId);
    const documentSnapshot = await getDoc(documentRef);
    // const { id, ...product } = documentSnapshot.data() as Product;
    products.push({
      id: prod.productId,
      ...documentSnapshot.data(),
    } as Product);
  }
  return (
    <AccountLayout>
      <div className="lg:pt-24 px-5 lg:px-20">
        <h2 className="lg:text-3xl text-lg mb-5 font-bold">My Wish List</h2>
        {products?.length ? (
          <div className="grid text-sm mg:grid-cols-2 grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                userId={user?.uid || ""}
                product={product}
                key={product.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center font-semibold">{`You don't have any wish list.`}</div>
        )}
      </div>
    </AccountLayout>
  );
}
