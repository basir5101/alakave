"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { years } from "@/data/data";
import { db } from "@/lib/firebase-config";
import { Product } from "@/types/product";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Transaction } from "@/types/transaction";
import WishList from "./WishList";
import Link from "next/link";
import Image from "next/image";
import SocialShare from "./Share";
import Loader2 from "@/components/common/Loader2";
import { regions } from "@/lib/data";
import ProductCard from "@/components/common/ProductCard";
import { useTranslations } from "next-intl";

interface ProductWithRating extends Product {
  averageRating?: string | number; // Assuming average rating is a string; adjust as necessary
}

export default function ByRegion({ userId = "" }: { userId: string }) {
  const t = useTranslations("Home");
  const [loading, setLoading] = useState<boolean>(false);
  const [vintage, setVintage] = useState<string>("all");
  const [fvProducts, setFvProducts] = useState<any>([]);
  const [products, setProducts] = useState<ProductWithRating[]>([]);

  const getProducts = async () => {
    setLoading(true);
    const collectionRef = collection(db, "products");
    // Start building the query
    let productQuery = query(collectionRef);

    // Apply the where clause if vintage is not 'all'
    if (vintage !== "all") {
      productQuery = query(
        collectionRef,
        where("region", "==", vintage),
        limit(5)
      );
    } else {
      productQuery = query(collectionRef, limit(5));
    }

    const querySnapshot = await getDocs(productQuery);
    const productsWithPendingRatings = querySnapshot.docs.map(async (doc) => {
      const productData = {
        id: doc.id,
        ...doc.data(),
      } as ProductWithRating;

      // Fetch transactions and calculate average rating
      const transactionsRef = collection(db, "Transactions");
      const q = query(
        transactionsRef,
        where("productId", "==", productData.id)
      );
      const transactionsSnapshot = await getDocs(q);
      const transactions = transactionsSnapshot.docs
        .map((doc) => doc.data() as Transaction)
        .filter(
          (transaction) =>
            transaction.rating !== undefined && transaction.rating !== null
        );
      if (transactions.length > 0) {
        const totalRating = transactions.reduce((acc, curr) => {
          // Use 0 if curr.rating is undefined, otherwise convert curr.rating to a number
          const rating = Number(curr.rating) || 0;
          return acc + rating;
        }, 0);
        productData.averageRating = (totalRating / transactions.length).toFixed(
          1
        );
      }

      return productData;
    });

    // Resolve all promises from map
    const productsWithRatings = await Promise.all(productsWithPendingRatings);
    setProducts(productsWithRatings);
    if (userId) {
      const favoritesQuery = query(collection(db, `users/${userId}/favorites`));
      const favoritesSnapshot = await getDocs(favoritesQuery);
      const favoriteProducts =
        favoritesSnapshot?.docs?.map((doc) => doc.data()) || [];
      setFvProducts(favoriteProducts);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vintage]);

  return (
    <div className="xl:px-16 xl:mx-20 mx-5 mt-10">
      <div className="flex justify-between items-center">
        <h2 className="w-full my-5 lg:text-2xl text-lg font-bold text-accent">
          {t("region")}
        </h2>
      </div>
      <div className="flex flex-wrap border-b-2">
        <button
          className={`${
            vintage == "all" ? "bg-accent text-white" : ""
          } px-3 py-1 rounded-t-lg `}
          onClick={() => setVintage("all")}
        >
          All
        </button>
        {regions.slice(2, 12).map((region) => (
          <button
            className={`${
              region.value === vintage ? "bg-accent text-white" : ""
            } px-3 py-1 rounded-t-lg `}
            key={region.value}
            onClick={() => setVintage(region.value || "")}
          >
            {region.name}{" "}
          </button>
        ))}
      </div>
      <div className="mt-10">
        {loading ? (
          <Loader2 />
        ) : products?.length ? (
          <div className="grid text-sm md:grid-cols-3  grid-cols-2 2xl:grid-cols-5 lg:grid-cols-4 gap-4 lg:gap-5">
            {products.map((product) => (
              <ProductCard product={product} userId={userId} key={product.id} />
            ))}
          </div>
        ) : (
          <div className="text-center">{t("notFound")} </div>
        )}
      </div>
    </div>
  );
}
