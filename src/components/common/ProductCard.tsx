"use client";
import SocialShare from "@/app/[locale]/home_screen/Share";
import WishList from "@/app/[locale]/home_screen/WishList";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase-config";
import { Product } from "@/types/product";
import { User } from "@/types/user";
import { doc, getDoc } from "firebase/firestore";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ProductCard({
  product,
  userId = "",
}: {
  product: Product;
  userId: string;
}) {
  const [isPro, setIsPro] = useState(false);
  useEffect(() => {
    const checkPro = async () => {
      const userRef = doc(db, "users", product.userId || "");
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data() as User;
      if (user?.professional) {
        setIsPro(true);
      }
    };
    checkPro();
  }, []);

  const locale = useLocale();
  return (
    <div className="w-full hover:border-accent rounded-lg transition-all relative items-center justify-center flex flex-col overflow-hidden">
      <Link href={`/${locale}/products/${product.id}`}>
        <div className="aspect-w-3 aspect-h-4 w-52 h-72 overflow-hidden">
          <Image
            className="object-cover object-center"
            src={product?.images?.[0] || "/no-image.png"} // Replace with your default image path
            layout="fill" // This will make the image fill the parent container
            alt="product"
          />
        </div>
      </Link>

      <div className="flex min-h-40 w-full justify-between z-10 bg-gray-300 rounded-b-lg">
        <div className="p-4 w-full">
          <Link
            className="font-semibold mb-3 block"
            href={`/${locale}/products/${product.id}`}
          >
            {product.title}
          </Link>
          <div className="">
            {product.vintage} {product.region}
          </div>
          <div> {product.category} </div>
          <div className="font-semibold text-accent">{product?.userName}</div>
          <div className="font-semibold text-accent">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <span key={index} className="text-accent text-2xl">
                  {index < Number(product?.averageRating) ? "★" : ""}
                </span>
              ))}
              <span className="ml-2 text-lg">{product?.averageRating}</span>
            </div>
          </div>
        </div>
        <div
          className={`${
            isPro ? "bg-black" : "bg-accent"
          }  min-h-fit p-2  flex flex-col justify-between items-center`}
        >
          <div className="mb-3 text-white"> {product.price}€ </div>
          {isPro && <div className="mb-3 text-white"> PRO </div>}
          <div className="mb-3 text-white">
            <WishList
              productId={product.id || ""}
              userId={userId || ""}
              favoriteProducts={[]}
            />
          </div>
          <SocialShare
            url={`/${locale}/products/${product.id}`}
            title={"title"}
            hashtags={"#hash"}
          />
        </div>
      </div>
    </div>
  );
}
