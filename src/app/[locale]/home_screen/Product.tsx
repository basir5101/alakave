import { Product } from "@/types/product";
import { Heart, Share2 } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductData({ product }: { product: Product }) {
  const locale = useLocale();
  return (
    <div
      className="w-full border items-center justify-center flex flex-col overflow-hidden"
      key={product.id}
    >
      <Link className="" href={`/${locale}/products/${product.id}`}>
        <Image
          className="w-full z-0"
          src={product?.images?.[0] || "/"}
          height={400}
          width={300}
          alt="product"
          style={{
            height: "350px",
            width: "auto",
            maxWidth: "100%",
          }}
        />
      </Link>
      <div className="flex justify-between z-10 bg-gray-300">
        <div className="p-2 w-full">
          <Link
            className="font-semibold mb-3 block"
            href={`/${locale}/products/${product.id}`}
          >
            {" "}
            {product.title}{" "}
          </Link>
          <div className="">
            {" "}
            {product.vintage} {product.region}
          </div>
          <div> {product.category} </div>
          <div className="font-semibold text-accent"> {product?.userName} </div>
        </div>
        <div className="bg-accent min-h-fit p-2 text-white flex flex-col justify-between items-center">
          <div className="mb-3"> {product.price}€ </div>
          <div className="mb-3">
            {" "}
            <Heart size={22} fill="white" />{" "}
          </div>
          <div>
            {" "}
            <Share2 />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
