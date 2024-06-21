import AccountLayout from "@/components/layout/AccountLayout";
import React from "react";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import Image from "next/image";
import moment from "moment";
import { TypeIcon, XIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Profile from "./Profile";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { User } from "@/types/user";
// import { useLocale } from "next-intl";
import { getLocale } from "next-intl/server";
interface Address {
  alternativePhone: string | null;
  lastName: string;
  landmark: string | null;
  firstName: string;
  phone: string;
  userId: string;
  zipCode: string;
  city: string;
  address1: string;
  address2: string;
}

export default async function Page() {
  const locale = await getLocale();
  let data = {};
  let userAddress: Address[] = [];
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.uid) {
    redirect(`/${locale}/login`);
  }
  const userRef = doc(db, "users", currentUser?.uid || "");
  const userSnapshot = await getDoc(userRef);
  const user = userSnapshot.data() as User;

  const resAddress = await fetch(
    `${process.env.API_URL}/api/address?userId=${user?.id}`
  );
  const dataAddress = await resAddress?.json();
  userAddress = dataAddress?.addresses || [];
  const requestRef = collection(db, "userInvitations");
  // Query for existing conversation between this buyer and seller regarding this product
  const asSender = query(
    requestRef,
    where("senderId", "==", user?.id),
    where("receiverId", "==", user?.id),
    where("status", "==", "accepted")
  );

  const asReceiver = query(
    requestRef,
    where("receiverId", "==", user?.id),
    where("status", "==", "accepted")
  );

  const gotSponsors = (await getDocs(asReceiver)).size;
  const gaveSponsors = (await getDocs(asSender)).size;
  try {
    // const res = await fetch(
    //   `${process.env.API_URL}/api/wallet?walletId=${user?.walletId}&cardId=${
    //     user?.cardId || user?.cardReg
    //   }`,
    //   { cache: "no-cache" }
    // );
    // data = await res?.json();
  } catch (error) {}
  return (
    <AccountLayout>
      <div>
        <Profile
          gotSponsors={gotSponsors}
          gaveSponsors={gaveSponsors}
          data={data}
          user={user}
          createdAt={currentUser?.metadata.creationTime}
          userAddress={userAddress}
        />
      </div>
    </AccountLayout>
  );
}
