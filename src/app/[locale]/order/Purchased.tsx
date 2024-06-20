"use client";
import { db } from "@/lib/firebase-config";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Transaction } from "@/types/transaction";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RatingStars from "./RatingStar";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function Purchased({ transaction }: any) {
  const locale = useLocale();
  const [product, setProduct] = useState<any>();
  const router = useRouter();
  const getProduct = async () => {
    // Ensure transaction.productId is defined and not null or undefined.
    if (!transaction || !transaction.productId) {
      console.log("Transaction or Product ID not provided.");
      return;
    }

    try {
      const documentRef = doc(db, "products", transaction.productId);
      const documentSnapshot = await getDoc(documentRef);

      if (documentSnapshot.exists()) {
        setProduct({ id: documentSnapshot.id, ...documentSnapshot.data() });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction]); // Re-run when transaction changes
  const handleRatingSelected = async (rating: number) => {
    // Here you could also call a function to update this rating in your backend/database
    if (!transaction || !transaction.id) {
      console.log("Transaction or Product ID not provided.");
      return;
    }

    try {
      const documentRef = doc(db, "Transactions", transaction.id);
      await updateDoc(documentRef, {
        rating: rating,
      });
      router.refresh();
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    router.refresh();
  };
  return (
    <div className="mt-8">
      {product ? (
        <div>
          <div className="w-full border shadow items-center justify-between mb-3 p-2 flex overflow-hidden">
            <Link className="" href={`/${locale}/products/${product.id}`}>
              <Image
                className="w-full z-0"
                src={product?.images?.[0] || "/"}
                height={200}
                width={100}
                alt="product"
                style={{
                  height: "100px",
                  width: "auto",
                }}
              />
            </Link>
            <div className="">
              <div className="p-2 w-full">
                <Link
                  className="font-semibold my-2 block"
                  href={`/${locale}/products/${product.id}`}
                >
                  {product.title}
                </Link>
                <div className="font-semibold text-accent">
                  Sold by: {product?.userName}
                </div>

                {transaction.rating ? (
                  <div>
                    {" "}
                    <div className="flex">
                      {[...Array(transaction.rating)].map((_, index) => (
                        <span key={index} className="text-accent">
                          {index < transaction.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-3" variant="outline">
                        Give Rating
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Rating</DialogTitle>
                        <DialogDescription>
                          Rate the product you have bought.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <RatingStars onRatingSelected={handleRatingSelected} />
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Save Changes
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No product details available.</p>
      )}
    </div>
  );
}
