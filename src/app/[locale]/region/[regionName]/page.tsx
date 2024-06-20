import React from "react";
import RegionPageData from "./RegionPageData";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import Footer from "@/components/Footer";

export default async function page() {
  const currentUser = await getCurrentUser();
  return (
    <div>
      {" "}
      <RegionPageData userId={currentUser?.uid} /> <Footer />
    </div>
  );
}
