import { db } from "@/lib/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import AddMessage from "./AddMessage";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import Navbar2 from "@/components/common/Navbar2";
import { Button } from "@/components/ui/button";
import moment from "moment";
import Link from "next/link";
import { Product } from "@/types/product";
import Footer from "@/components/Footer";
import { useLocale, useTranslations } from "next-intl";

export default async function Page({ params }: any) {
  const locale = useLocale();
  // const t = useTranslations("productChat");

  let messages: any = [];
  const user = await getCurrentUser();
  const documentRef = doc(db, "products", params.productId);
  const documentSnapshot = await getDoc(documentRef);
  const productData: Product = (documentSnapshot.data() as Product) || {};

  const conversationsRef = collection(db, "Conversations");
  const convQuery = query(
    conversationsRef,
    where("product_id", "==", params.productId),
    where("buyer_id", "==", params.userId),
    where("seller_id", "==", productData.userId)
  );
  const querySnapshot = await getDocs(convQuery);
  // Check if the conversation exists
  if (querySnapshot.empty) {
    console.log("No conversation found.");
  } else {
    const conversationDoc = querySnapshot.docs[0];
    //fetch messages from this conversation
    const messagesRef = collection(
      db,
      `Conversations/${conversationDoc.id}/Messages`
    );
    const messagesQuery = query(messagesRef, orderBy("created_at", "asc"));
    const messagesSnapshot = await getDocs(messagesQuery);

    if (!messagesSnapshot.empty) {
      messages = messagesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Optionally convert Timestamps to JavaScript Date objects
        created_at: doc.data().created_at?.toDate(),
      }));
    } else {
      console.log("No messages found in this conversation.");
    }
  }
  return (
    <>
      <Navbar2 />
      <div className="lg:flex max-w-[1440px] m-auto justify-center mx-5 min-h-screen pt-32 lg:px-14">
        <div className="lg:w-3/5 rounded flex flex-col lg:mx-16  items-center text-gray-800">
          <div className="flex flex-col flex-grow w-full border shadow-xl rounded-lg overflow-hidden">
            <div className="flex flex-col min-h-[500px] flex-grow h-0 p-4 overflow-auto">
              {messages.length > 0 ? (
                messages.map((message: any) => {
                  if (message.sender_id !== user?.uid) {
                    return (
                      <div
                        key={message.id}
                        className="flex w-full mt-2 space-x-3 max-w-md"
                      >
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        <div>
                          <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                            <p className="text-sm">{message?.content}</p>
                          </div>
                          <span className="text-xs text-gray-500 leading-none">
                            {moment(message.created_at).format(
                              "MMMM Do YYYY, h:mm a"
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={message.id}
                        className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
                      >
                        <div>
                          <div className="bg-accent text-white p-3 rounded-l-lg rounded-br-lg">
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <span className="text-xs text-gray-500 leading-none">
                            {moment(message.create_at).format(
                              "MMMM Do YYYY, h:mm a"
                            )}
                          </span>
                        </div>
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                      </div>
                    );
                  }
                })
              ) : (
                <div className="text-center font-semibold">
                  No Messages Found
                </div>
              )}
            </div>

            <AddMessage
              product={productData}
              productId={params.productId}
              user={user}
            />
          </div>
        </div>
        <div className="lg:w-2/6 my-8 lg:mt-0">
          <ProductContent
            productData={productData}
            productId={params?.productId}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

function ProductContent({
  productData,
  productId,
}: {
  productData: Product;
  productId: string;
}) {
  const locale = useLocale();
  const t = useTranslations("productChat");

  return (
    <div className="shadow p-10 border rounded">
      <h3 className="font-semibold text-3xl"> {productData?.title} </h3>
      <h3 className="font-semibold text-lg my-2"> {productData?.price}€ </h3>
      <div>
        <Link href={`/${locale}/products/${productId}/payment`}>
          <Button className="w-full rounded-3xl py-2 mb-1 px-4 text-white bg-accent hover:bg-yellow-700">
            {t("buyNow")}
          </Button>
        </Link>
      </div>
      <Button
        variant={"outline"}
        className="w-full mt-3 rounded-3xl border-accent hover:border-yellow-700 "
      >
        {t("offer")}
      </Button>
      <div className="mt-3">
        {t("added")}: {moment(productData?.createdAt).format("DD MMM, YYYY")}
      </div>
      <div className="mb-3">
        {t("soldBy")}:
        <Link
          className="text-accent ml-5"
          href={`/${locale}/seller/${productData?.userId}`}
        >
          {productData?.userName}
        </Link>{" "}
      </div>
    </div>
  );
}
