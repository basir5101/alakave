import { Product } from "@/types/product";
import Image from "next/image";
import moment from "moment";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import Navbar2 from "@/components/common/Navbar2";
import Link from "next/link";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import SimilarProducts from "./SimilarProducts";
import "moment/locale/fr";
import Footer from "@/components/Footer";
import ProductCard from "@/components/common/ProductCard";
import { useLocale, useTranslations } from "next-intl";

export default async function ProductPage({ params }: any) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    // redirect("/login");
  }
  let product: any = {
    title: "",
    description: "",
    images: [],
    userId: "",
    weight: "",
    dimensions: "",
  };

  const standardDimensions = { length: 30, width: 10, height: 10 };

  const documentRef = await doc(db, "products", params.productId);
  const documentSnapshot = await getDoc(documentRef);
  if (documentSnapshot.exists()) {
    const { title, description, images } = documentSnapshot.data() as Product;
    product = {
      id: documentSnapshot.id,
      title,
      description,
      images,
      weight: 1.3,
      dimensions: standardDimensions,
      ...documentSnapshot.data(),
    };
    console.log("Document data:");
  } else {
    console.log("No such document!");
  }

  let seller = {
    fullName: "",
    photoURL: "",
  };

  if (product.userId) {
    const userRef = await doc(db, "users", product.userId);
    const userSnapShot = await getDoc(userRef);
    if (userSnapShot.exists()) {
      seller = {
        ...userSnapShot.data(),
        photoURL: userSnapShot.data().photoURL,
        fullName:
          userSnapShot.data().firstName + " " + userSnapShot.data().lastName,
      };
    } else {
      console.log("No such document!");
    }
  }

  const collectionRef = collection(db, "products");
  const limitedQuery = query(collectionRef, limit(10));
  const querySnapshot = await getDocs(limitedQuery);
  const products = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as Product;
  });

  const productsRef = collection(db, "products");
  const q = query(productsRef, where("region", "==", product?.region || ""));

  const querySnapshots = await getDocs(q);
  const searchResults = querySnapshots.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Product)
  );
  console.log("ser", searchResults);

  const tableData = [
    {
      label: "Millésime",
      key: "vintage",
    },
    {
      label: "Région",
      key: "region",
    },
    {
      label: "Qté",
      key: "quantity",
    },
    {
      label: "Lieu de stockage",
      key: "storage",
    },

    {
      label: "CRD Capsule",
      key: "crdCapsule",
    },
  ];

  return (
    <div>
      <Navbar2 />
      <div className="lg:flex pt-24 lg:px-16 px-6 mb-7 mx-auto">
        <div className="lg:w-1/3">
          <ProductCard product={product} userId={currentUser?.uid || ""} />
        </div>
        <div className="lg:w-3/5 lg:mt-0 mt-5">
          <div className="lg:px-20 px-6">
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="flex">
                <div>
                  {" "}
                  <Image
                    src={seller.photoURL}
                    height={100}
                    width={100}
                    alt="seller"
                    className="border rounded-full mr-3"
                    style={{ height: "100px" }}
                  />{" "}
                </div>
                <div>
                  <h2 className="font-semibold"> {seller.fullName} </h2>
                  <div className="flex justify-center">
                    Membre depuis {new Date().getFullYear()}{" "}
                  </div>
                  <div>0 parrrains</div>
                  <div>0 Avis</div>
                </div>
              </div>
            </div>
            <ProductContent product={product} userId={currentUser?.uid || ""} />
            {/* <div className="grid grid-cols-6 gap-3 mt-5">
              {product?.images?.map((imgString: any, index: number) => (
                <div className="border w-full flex justify-center" key={index}>
                  <Image
                    src={imgString}
                    height={100}
                    width={100}
                    alt="secondary image"
                    style={{ height: "150px", width: "auto" }}
                  />
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
      <SimilarProducts
        products={searchResults || []}
        userId={currentUser?.uid || ""}
      />
      <Footer />
    </div>
  );
}

function ProductContent({ product, userId }: { product: any; userId: string }) {
  const t = useTranslations("product");
  const locale = useLocale();
  const tableData = [
    {
      label: t("table.vintage"),
      key: "vintage",
    },
    {
      label: t("table.region"),
      key: "region",
    },
    {
      label: t("table.quantity"),
      key: "quantity",
    },
    {
      label: t("table.storage"),
      key: "storage",
    },

    {
      label: t("table.crdCapsule"),
      key: "crdCapsule",
    },
  ];
  return (
    <>
      <table className="w-full mt-10 border">
        {tableData.map((data, i) => (
          <tr
            className={`border ${i % 2 === 0 ? "bg-secondary" : ""}`}
            key={data.key}
          >
            <td className="px-8 py-2 border"> {data.label} </td>
            <td className="px-8 py-2"> {product[data.key]} </td>
          </tr>
        ))}
        <tr className="border">
          <td className="px-8 py-2 border"> {t("table.views")} </td>
          <td className="px-8 py-2">2</td>
        </tr>
        <tr className="border bg-secondary">
          <td className="px-8 py-2 border"> {t("table.wishList")} </td>
          <td className="px-8 py-2">0</td>
        </tr>
        <tr className="border">
          <td className="px-8 py-2 border"> {t("table.added")} </td>
          <td className="px-8 py-2">
            {" "}
            {moment(product.createdAt).format("DD MMM, YYYY")}{" "}
          </td>
        </tr>
      </table>
      <div className="mt-10">
        <h2 className="font-semibold my-3"> {t("about")} </h2>
        <div className="border py-5 px-4 h-32 overscroll-y-auto  overflow-y-scroll shadow capitalize">
          {product.description}
        </div>
      </div>
      <div className="w-full mt-10 text-center">
        {/* <div className="bg-accent text-xl  text-white px-5 py-2">
                {product.price} €
              </div> */}
        <div>
          {/* <BuyBtn /> */}
          {userId ? (
            <Link
              href={`/${locale}/products/${product.id}/payment`}
              className="bg-accent px-9 rounded-3xl py-2 block w-full text-white hover:bg-yellow-600"
            >
              {t("payment")}
            </Link>
          ) : (
            <Link
              href={`/${locale}/login`}
              className="bg-accent px-9 rounded-3xl py-2 block w-full text-white hover:bg-yellow-600"
            >
              {t("payment")}
            </Link>
          )}

          <Link
            href={
              userId
                ? `/${locale}/chat/${product.id}/${userId}`
                : `/${locale}/login`
            }
            className=" rounded-3xl px-9 text-accent border border-accent  py-2 w-full block mt-5"
          >
            {t("chat")}
          </Link>

          <br />
        </div>
      </div>
    </>
  );
}
