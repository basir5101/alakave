"use client";
import { Plus } from "lucide-react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddWallet() {
  // create user, wallet and card
  const handleClick = async () => {
    toast.loading("creating wallet");
    const res = await fetch(`/api/mangopay/user`);
    const data = await res.json();
    toast.dismiss();
    toast.success("successfully added");
    window.location.reload();
  };

  return (
    <>
      <Toaster />
      <Plus onClick={handleClick} className="cursor-pointer" />
    </>
  );
}
