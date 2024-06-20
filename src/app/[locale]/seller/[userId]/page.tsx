import Navbar2 from "@/components/common/Navbar2";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebase-config";
import { Product } from "@/types/product";
import { User } from "@/types/user";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { BadgeCheck } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import "moment/locale/fr";
import WishList from "@/app/[locale]/home_screen/WishList";
import SocialShare from "@/app/[locale]/home_screen/Share";
import ProductCard from "@/components/common/ProductCard";
import { useLocale, useTranslations } from "next-intl";
import Time from "./Time";

export default async function page({ params }: any) {
  const userRef = doc(db, "users", params.userId);
  const userSnapshot = await getDoc(userRef);
  const user = userSnapshot.data() as User;
  const collectionRef = collection(db, "products");
  let productQuery = query(collectionRef, where("userId", "==", user.id));
  const querySnapshot = await getDocs(productQuery);
  const products = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Product;
  });
  return (
    <div>
      <Navbar2 />
      <PageContent products={products} user={user} />
      <Footer />
    </div>
  );
}

function PageContent({ user, products }: { user: User; products: Product[] }) {
  const t = useTranslations("seller");
  const locale = useLocale();

  return (
    <div className="container pt-28">
      <div className="lg:flex items-center">
        <div className="lg:w-1/5">
          <div className="shadow p-5 h-60 border text-center flex items-center justify-center flex-col">
            <Image
              className="rounded-full"
              src={
                user.photoURL ||
                "https://firebasestorage.googleapis.com/v0/b/alakave-ef7b3.appspot.com/o/alakave%2Foll1uWXhlWRQHj5zkI6zrHirZC73%2Flogo-seb.png?alt=media&token=3b29b66a-5c55-4ef1-a48a-d7eb5989546d%22"
              }
              height={120}
              width={120}
              alt="user"
              style={{ height: "120px" }}
            />
            <Link
              href={`/${locale}/seller/${user.id}`}
              className="mt-3 font-semibold hover:text-accent"
            >
              {user.firstName} {user.lastName}{" "}
            </Link>
            {user?.verified && (
              <div className="flex items-center text-sm">
                <span> {t("verified")} </span>{" "}
                <BadgeCheck className="ml-3 text-green-700" />
              </div>
            )}
            {user?.professional && (
              <div className="text-sm"> {t("professional")} </div>
            )}
          </div>
        </div>
        <div className="lg:w-4/5">
          <div className="shadow p-5 h-60 mx-5 border ">
            <div>
              {t("date")} <Time date={user.createdAt} />
            </div>
            <h2 className="font-semibold mt-3 uppercase text-xl">
              {" "}
              {t("about")} {user.firstName} {user.lastName}{" "}
            </h2>
            <div> {user.details} </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="font-semibold text-xl">
          {locale === "en"
            ? `${user.firstName} ${user.lastName} ${t("productTitle")}`
            : `${t("productTitle")} ${user.firstName} ${user.lastName}`}
        </h2>
        <div className="grid mt-8 text-sm mg:grid-cols-3 grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {products.length > 0 &&
            products.map((product) => (
              <ProductCard
                product={product}
                userId={user.id || ""}
                key={product.id}
              />
            ))}
        </div>
        {products.length == 0 && (
          <div className="flex items-center  w-full text-center  justify-center">
            <Image
              src={"/png/no-product.png"}
              height={400}
              width={400}
              alt="no product"
            />
          </div>
        )}
      </div>
    </div>
  );
}
