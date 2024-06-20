"use effects";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/product";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import moment from "moment";
import { Delete, Edit, Trash } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loader from "@/components/common/Loader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";

export default function Products({ userId }: { userId: string }) {
  const t = useTranslations("order");
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>("");
  const getProducts = async () => {
    const conversationsRef = collection(db, "products");
    const buyerQuery = query(conversationsRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(buyerQuery);
    const data = querySnapshot?.docs?.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as Product;
    });
    //     querySnapshot?.docs?.map((doc) => doc.data()) as Product[]
    //   ) || ([] as Product[]);
    setProducts(data);
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, []);
  const headers = [
    {
      label: t("headers.bottles"),
      name: "title",
    },
    {
      label: t("headers.price"),
      name: "price",
    },
    {
      label: t("headers.quantity"),
      name: "quantity",
    },
    {
      label: t("headers.region"),
      name: "region",
    },
    {
      label: t("headers.crdCapsule"),
      name: "crdCapsule",
    },
  ];

  const handleDelete = async () => {
    setOpen(false);
    toast.loading("deleting product");
    const collectionRef = collection(db, "products");
    const docRef = doc(collectionRef, selected);
    await deleteDoc(docRef);

    toast.dismiss();
    toast.success("deleted successfully");
    await getProducts();
  };

  return (
    <div>
      <Toaster />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="text-end">
            <Link
              className="border border-yellow-600 px-5 py-2 rounded-2xl text-yellow-600 "
              href={`/${locale}/add-product`}
            >
              {t("headers.title")}
            </Link>
          </div>
          {products.length > 0 ? (
            <Table className="mt-10">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead></TableHead>
                  {headers.map((heading) => (
                    <TableHead className="font-semibold" key={heading.name}>
                      {" "}
                      {heading.label}{" "}
                    </TableHead>
                  ))}
                  {["Date", "Status", "Action"].map((item) => (
                    <TableHead className="font-semibold" key={item}>
                      {item}{" "}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image
                        src={product?.images?.[0]}
                        height={50}
                        width={50}
                        alt="product"
                      />
                    </TableCell>
                    {headers.map((heading) => (
                      <TableCell key={heading.name}>
                        {product[heading.name]}
                      </TableCell>
                    ))}
                    <TableCell>
                      {moment(product.createdAt).format("MMM DD, YYYY")}
                    </TableCell>
                    <TableCell>
                      <span className="bg-yellow-600 text-white text-center px-1 py-1 rounded-sm">
                        active
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Link href={`/${locale}/edit-product/${product.id}`}>
                          <Edit className="mr-1 h-5 cursor-pointer" />
                        </Link>
                        <Trash
                          onClick={() => {
                            setSelected(product.id);
                            setOpen(true);
                          }}
                          className="h-5 cursor-pointer text-red-500"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center mt-8 font-semibold text-xl">
              Aucune bouteille
            </div>
          )}
        </>
      )}
      {/* Delete Product Modal  */}
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Are you sure to delete this?
            </DialogTitle>
            <DialogDescription className="text-center">
              <div>You will not be able to revert this!</div>
              <div className="text-center mt-8">
                <Button onClick={() => setOpen(false)} className=" mr-2">
                  No, Cancel It
                </Button>
                <Button
                  onClick={handleDelete}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  Yes, Delete It
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
