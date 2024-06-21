import React from "react";
import { Product } from "@/types/product";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { CreditCard, LocateIcon, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import AddCard from "./AddCard";
import AddAddress from "./AddAddress";
import Footer from "@/components/Footer";
import Navbar2 from "@/components/common/Navbar2";
import { redirect } from "next/navigation";
import ShippingFee from "./ShippingFee";
import { useTranslations } from "next-intl";
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

export default async function Payment({ params }: any) {
  const user = await getCurrentUser();
  const locale = await getLocale();
  if (!user) {
    redirect(`/${locale}/login`);
  }
  let price = "";
  let productData: Product = {
    title: "",
    description: "",
    images: [],
  };

  const documentRef = doc(db, "products", params.productId);
  const documentSnapshot = await getDoc(documentRef);
  if (documentSnapshot.exists()) {
    const fireStore = documentSnapshot.data();
    productData = {
      title: fireStore.title,
      description: fireStore.description,
      images: fireStore.images,
      price: fireStore.price,
      userId: fireStore.userId,
    };
    price = fireStore.price;
  } else {
    console.log("No such document!");
  }

  const userRef = doc(db, "users", user?.uid || "");
  const userSnapShot: any = await getDoc(userRef);
  const { walletId, cardId, cardReg } = userSnapShot.data();
  const sellerRef = doc(db, "users", user?.uid || "");
  const sellerSnapshot: any = await getDoc(sellerRef);
  const sellerInfo = sellerSnapshot.data();

  const resAddress = await fetch(
    `${process.env.API_URL}/api/address?userId=${user?.uid}`
  );
  const dataAddress = await resAddress.json();
  const userAddress: Address[] = dataAddress.addresses;

  const res = await fetch(
    `${process.env.API_URL}/api/wallet?walletId=${walletId}&cardId=${
      cardId || cardReg
    }`
  );
  const data = await res.json();

  return (
    <>
      <Navbar2 />
      <PageContent
        userAddress={userAddress}
        user={user}
        data={data}
        productData={productData}
        sellerInfo={sellerInfo}
        params={params}
      />
    </>
  );
}

function PageContent({
  userAddress,
  user,
  data,
  productData,
  sellerInfo,
  params,
}: any) {
  const t = useTranslations("payment");
  return (
    <div>
      <div className="pt-24 max-w-[1440px] m-auto">
        <div className="lg:px-12 mx-5 mb-10">
          <h2 className="font-semibold text-3xl "> {t("title")} </h2>
          <div className="grid lg:grid-cols-3 gap-3">
            <div className="col-span-2">
              <div className="shadow bg-white mt-5 p-4">
                <div className="flex justify-between  mt-4">
                  <div className="flex">
                    <LocateIcon className="mr-3" /> {t("address.title")}
                  </div>
                  <div>
                    <AddAddress userId={user?.uid} />
                  </div>
                </div>
                <div className="mt-6">
                  {userAddress?.length > 0 ? (
                    <>
                      {userAddress.map((address: Address, index: number) => (
                        <div key={index} className="flex">
                          <div>
                            <Checkbox defaultChecked={true} className="mr-3" />
                          </div>
                          <div>
                            <div>
                              <span className="font-semibold">
                                {address.firstName} {address.lastName}{" "}
                              </span>
                              {address.phone}
                            </div>
                            <div>
                              {address.zipCode} {address.address1}{" "}
                              {address.address2} {address.city}, FR
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="text-red-500 text-center font-semibold">
                      {t("address.notFound")}
                    </div>
                  )}
                </div>
              </div>
              <div className="shadow bg-white mt-5 p-4">
                <div className="flex justify-between  mt-4">
                  <div className="flex">
                    <CreditCard className="mr-3" /> {t("card.title")}
                  </div>
                  <div>
                    {!data.data?.cardData?.Alias && (
                      <AddCard card={data.data?.cardData} />
                    )}
                  </div>
                </div>
                <div className="mt-7">
                  {data.data?.cardData?.Alias ? (
                    <div className="flex">
                      <div>
                        <Checkbox defaultChecked={true} className="mr-3" />
                      </div>
                      <div>
                        <div>
                          <span className="font-semibold">
                            {user?.displayName}{" "}
                          </span>
                        </div>
                        <div>{data.data?.cardData.Alias}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-red-600">
                      {t("card.notFound")}
                    </div>
                  )}
                </div>
              </div>
              <div className="shadow bg-white mt-5 p-4">
                <div className="flex justify-between  mt-4">
                  <div className="flex">
                    <CreditCard className="mr-3" /> {t("wallet.title")}
                  </div>
                </div>
                <div className="mt-7">
                  {data?.data?.walletData ? (
                    <div className="flex">
                      <div>
                        <Checkbox defaultChecked={true} className="mr-3" />
                      </div>
                      <div>
                        <div>
                          <span className="font-semibold">
                            {" "}
                            {t("wallet.name")}{" "}
                          </span>
                        </div>
                        <div>
                          {t("wallet.balance")}{" "}
                          {Number(
                            data?.data?.walletData?.Balance?.Amount
                          ).toFixed(2)}{" "}
                          €
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-red-600">
                      {t("wallet.notfound")}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:p-5 m-auto mb-10 w-full">
              <div className="shadow bg-white p-4">
                <ShippingFee
                  productData={productData}
                  walletId={sellerInfo.walletId}
                  sellerId={productData?.userId || ""}
                  buyerId={user?.uid || ""}
                  productId={params?.productId}
                  arrCode={userAddress?.[0]?.zipCode || ""}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
