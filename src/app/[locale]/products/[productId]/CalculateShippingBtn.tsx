"use client";
import { Product } from "@/types/product";
import React from "react";

export default function CalculateShippingBtn({
  product,
}: {
  product: Product;
}) {
  const calculateShipping = async () => {
    try {
      const response = await fetch("/api/calculateQuickCost", {
        method: "POST",
        body: JSON.stringify({
          weight: product.weight, // Adjust this according to your actual product structure
          dimensions: product.dimensions, // Ensure you have these details in your product object
        }),
      });
      const data = await response.json();
    } catch (error) {
      console.error("Error calculating shipping cost:", error);
      console.log("Failed to calculate shipping cost.");
    }
  };
  return (
    <button
      className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={calculateShipping}
    >
      Calculate Shipping
    </button>
  );
}
