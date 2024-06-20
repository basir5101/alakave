"use client";
import { db } from "@/lib/firebase-config";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
export default function AddMessage({ product, user, productId }: any) {
  const t = useTranslations("productChat");
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const params = useParams();

  async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.loading("sending message");
    const productRef = doc(db, "products", productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      console.log("Product does not exist!");
      return;
    }

    const productData = productSnapshot.data();
    const sellerId = productData.userId;

    // Define the Conversations collection
    const conversationsRef = collection(db, "Conversations");

    // Query for existing conversation between this buyer and seller regarding this product
    const convQuery = query(
      conversationsRef,
      where("product_id", "==", productId),
      where("buyer_id", "==", params?.userId)
    );

    const convSnapshot = await getDocs(convQuery);

    let conversationRef;
    if (convSnapshot.empty) {
      // Create new conversation if it doesn't exist
      conversationRef = await addDoc(conversationsRef, {
        product_id: productId,
        productTitle: product.title,
        productImage: product.images?.[0],
        buyer_id: user.uid,
        buyer_name: user?.displayName,
        seller_id: sellerId,
        last_message: message,
        last_updated: new Date().toISOString(),
      });
    } else {
      // Use existing conversation
      conversationRef = convSnapshot.docs[0].ref;
      // Update the last message and timestamp of the conversation
      await updateDoc(conversationRef, {
        last_message: message,
        last_updated: new Date(),
      });
    }

    // Add message to the Messages subcollection of the conversation
    const messagesRef = collection(conversationRef, "Messages");
    await addDoc(messagesRef, {
      sender_id: user.uid,
      content: message,
      created_at: new Date(),
    });
    toast.dismiss();
    setMessage("");
    router.refresh();
  }
  return (
    <>
      <Toaster />
      <form onSubmit={sendMessage} className="p-4 relative">
        <input
          className="flex items-center border h-12 w-full rounded px-3 text-sm"
          type="text"
          placeholder={t("typeMessage")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">
          <Send className="absolute right-6 top-7" />
        </button>
      </form>
    </>
  );
}
