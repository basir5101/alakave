/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import regionsData, { IRegionData } from "@/data/regionsData";
import Image from "next/image";
import styles from "./RegionPage.module.css"; // Make sure to create this CSS module file
import Navbar from "@/components/common/Navbar";
import Navbar2 from "@/components/common/Navbar2";
import { Product } from "@/types/product";
import { regions } from "@/data/data";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import Loader2 from "@/components/common/Loader2";
import Link from "next/link";
import WishList from "@/app/[locale]/home_screen/WishList";
import SocialShare from "@/app/[locale]/home_screen/Share";
import ProductCard from "@/components/common/ProductCard";

const RegionPageData = ({ userId = "" }: any) => {
  const [region, setRegion] = useState<IRegionData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const params = useParams<{ regionName: string }>();
  const regionName: any = params?.regionName;

  // Function to handle search input change
  const getProductByRegion = async () => {
    setLoading(true);
    const region = regions.find((region: { name: string; id: number }) =>
      region.name.toLowerCase().includes(regionName.toLowerCase())
    );

    // Create a Firestore query to search for products by region
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("region", "==", region?.name || ""));

    try {
      const querySnapshot = await getDocs(q);
      const searchResults = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Product)
      );
      setProducts(searchResults); // Save the results in state
    } catch (error) {
      console.error("Error searching products:", error);
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (regionName && typeof regionName === "string") {
      const data = regionsData[regionName];
      setRegion(data);
    }
    getProductByRegion();
  }, [regionName]);

  if (!region) {
    return (
      <div>
        <Navbar2 />
        <p className="text-center mt-36 font-bold text-3xl">Region not found</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section
        className={styles.headerSection}
        style={{ backgroundImage: `url('${region?.imageUrl}')` }}
      >
        {/* Header Text or any overlay content goes here */}
      </section>
      <section className="bg-blue-950 text-white py-10">
        <div className="container mx-auto">
          <div className={styles.headerText}>
            {region?.headerText}{" "}
            {/* This is where the header text is rendered */}
          </div>
          <div className={styles.gridContainer}>
            {region.blocks.map((block, index) => (
              <div key={index} className={styles.gridItem}>
                <h2 className="font-bold text-accent">{block.title}</h2>
                <p>{block.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="px-8 lg:px-24">
        {loading ? (
          <Loader2 />
        ) : products?.length > 0 ? (
          <div className="grid  py-8 text-sm mg:grid-cols-3 grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {products.map(async (product) => {
              return (
                <ProductCard
                  userId={userId || ""}
                  product={product}
                  key={product.id}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center my-8 font-semibold">
            {" "}
            Aucune bouteille correspondante trouvée{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default RegionPageData;
