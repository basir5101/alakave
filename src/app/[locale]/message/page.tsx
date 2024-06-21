import AccountLayout from "@/components/layout/AccountLayout";
import { db } from "@/lib/firebase-config";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { Message } from "@/types/messages";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import "moment/locale/fr";
import { getLocale } from "next-intl/server";
// import { useLocale } from "next-intl";
export default async function Page() {
  const locale = await getLocale();
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/${locale}/login`);
  }
  let conversations: Message[] = [];

  const conversationsRef = collection(db, "Conversations");
  // const buyerQuery = query(
  //   conversationsRef,
  //   where("seller_id", "==", user?.uid)
  // );

  // Query for conversations where the user is the seller
  const sellerQuery = query(
    conversationsRef,
    where("seller_id", "==", user?.uid)
  );

  // Query for conversations where the user is the buyer
  const buyerQuery = query(
    conversationsRef,
    where("buyer_id", "==", user?.uid)
  );

  // Fetch both sets of conversations
  const sellerQuerySnapshot = await getDocs(sellerQuery);
  const buyerQuerySnapshot = await getDocs(buyerQuery);

  // Combine and map the documents from both queries
  conversations = [
    ...sellerQuerySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      role: "seller",
    })),
    ...buyerQuerySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      role: "buyer",
    })),
  ];

  // console.log("combinedConversations", combinedConversations);

  try {
    const querySnapshot = await getDocs(buyerQuery);
    if (querySnapshot.empty) {
      console.log("No conversations found for the buyer.");
      // return [];
    } else {
      conversations = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // If your document includes Timestamp fields like last_updated, you might want to convert them to Date objects:
        last_updated: doc.data().last_updated?.toDate(), // This is optional
      }));
    }
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }

  return (
    <AccountLayout>
      <button className="font-semibold bg-accent py-1 rounded-lg text-white px-4">
        Messages
      </button>
      <div className="mt-8"></div>
      <div>
        {conversations.map((message) => (
          <div
            className="flex border shadow lg:px-10 px-3 items-center py-4 justify-between"
            key={message.id}
          >
            <div>
              <div className="flex items-center">
                <Image
                  className="rounded-full p-1 border"
                  src={message.productImage || "/"}
                  height={50}
                  width={50}
                  alt="product"
                />
                <div>
                  <Link
                    href={`/${locale}/chat/${message.product_id}/${message.buyer_id}`}
                    className="ml-4 font-semibold lg:text-xl"
                  >
                    {message.productTitle}{" "}
                  </Link>
                  <p className="ml-4"> {message.last_message} </p>
                </div>
              </div>
            </div>
            <div className="text-sm">
              {moment(message.last_updated).format("DD MMM YYYY hh:mm a")}{" "}
            </div>
          </div>
        ))}
      </div>
    </AccountLayout>
  );
}
