"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function BuyBtn() {
  const handleClick = async () => {
    const res = await fetch(`${process.env.API_URL}/api/mangopay/user`, {
      method: "POST",
      body: JSON.stringify({}),
    });
    const data = await res.json();
  };

  return (
    <Button
      onClick={handleClick}
      className="bg-accent w-32 mb-3 hover:bg-yellow-700"
    >
      Acheter
    </Button>
  );
}
