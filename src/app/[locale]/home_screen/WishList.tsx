"use client";
import checkFavorite from "@/lib/data-fetching/checkFavorite";
import { db } from "@/lib/firebase-config";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function WishList({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
  favoriteProducts: string[];
}) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const handleToggleFavorite = async () => {
    try {
      setIsFavorite(!isFavorite);
      const favoriteRef = doc(db, `users/${userId}/favorites`, productId);
      const favoriteDoc = await getDoc(favoriteRef);
      if (favoriteDoc.exists()) {
        await deleteDoc(favoriteRef);
        router.refresh();
      } else {
        await setDoc(favoriteRef, { productId });
      }
    } catch (error) {
      console.error("Error toggling favorite: ", error);
    }
  };
  useEffect(() => {
    const getFavoriteStatus = async () => {
      const result = await checkFavorite(userId, productId);
      setIsFavorite(result);
      console.log("isFavorite", typeof result);
    };
    if (userId) {
      getFavoriteStatus();
    }
  }, [userId]);
  return (
    <button onClick={handleToggleFavorite}>
      <Heart
        color={isFavorite ? "red" : "white"}
        size={22}
        fill={isFavorite ? "red" : "white"}
      />
    </button>
  );
}
