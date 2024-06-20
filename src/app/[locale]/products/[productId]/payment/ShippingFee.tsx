"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Checkout from "./Checkout";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/navigation";

export default function ShippingFee({
  productData,
  walletId,
  sellerId,
  buyerId,
  productId,
  arrCode,
}: any) {
  const t = useTranslations("payment");
  const locale = useLocale();
  const [shippingOptions, setShippingOptions] = React.useState([]);

  const handleSelectChange = async (value: any) => {
    toast.loading("calculating shipping charges...");
    const [productCode, serviceCode] = value.split("_");
    // Use productCode and serviceCode for your API request here
    try {
      const response = await fetch("/api/shipping/shipCost", {
        method: "POST",
        body: JSON.stringify({
          productCode,
          serviceCode,
          arrCode,
        }),
      });
      toast.dismiss();
      const data = await response.json();
      setShippingOptions(
        data?.data?.return?.service?.filter((s: any) => s.amountTTC > 0)
      );
    } catch (error) {
      console.error("Error calculating shipping cost:", error);
    }
  };
  const router = useRouter();
  const handleCheckout = async () => {
    if (shippingOptions.length > 0) {
      toast.loading("processing payment");
      const collectionRef = collection(db, "Transactions");
      const querySnapshot = await addDoc(collectionRef, {
        productId: productId,
        buyerId: buyerId,
        sellerId: sellerId,
        timestamp: new Date(),
      });
      toast.dismiss();
      router.push(`/order`);
    } else if (!arrCode) {
      toast.error("Please add address");
    } else {
      toast.error("Please select service");
    }
  };
  // Calculate the total including the service fee and the selected shipping fee
  const itemPrice = Number(productData.price);
  const serviceFee = Number((itemPrice * 0.12).toFixed(2)); // 12% service fee
  const totalShippingCost = shippingOptions.reduce(
    (acc, option: any) => acc + option.amountTTC,
    0
  );

  const total = (itemPrice + serviceFee + totalShippingCost).toFixed(2);
  return (
    <>
      <Toaster />

      <div>
        <label> {t("shipping.service.title")} </label>

        <Select onValueChange={(value) => handleSelectChange(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("shipping.service.placeholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{t("shipping.service.label1")}</SelectLabel>
              <SelectItem value="01_0">
                {t("shipping.service.option1")}
              </SelectItem>{" "}
              {/* ProductCode 01, ServiceCode 0 */}
              <SelectItem value="01_6">
                {t("shipping.service.option2")}
              </SelectItem>{" "}
              {/* ProductCode 01, ServiceCode 6 */}
              <SelectLabel>{t("shipping.service.label2")}</SelectLabel>
              <SelectItem value="86_0">
                {t("shipping.service.option1")}
              </SelectItem>{" "}
              {/* ProductCode 86, ServiceCode 0 */}
              <SelectItem value="86_6">
                {t("shipping.service.option2")}
              </SelectItem>{" "}
              {/* ProductCode 86, ServiceCode 6 */}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5">
        <h3 className="text-lg  font-bold">{t("order.title")}</h3>
        <hr className="my-3" />
        <div className="flex justify-between font-semibold">
          <Image
            src={productData?.images?.[0] || "/"}
            height={15}
            width={15}
            alt="product"
          />
          <div> {productData.title} </div>
          <div className="font-normal">1</div>
          <div> {productData.price} € </div>
        </div>
        <hr className="my-3" />
        <div>
          <div className="flex justify-between">
            <div>{t("order.subTotal")}</div> <div> {itemPrice} € </div>
          </div>
          <div className="flex justify-between">
            <div>
              <div>{t("order.fee")}</div>
              <div> {t("order.delivery")} </div>
            </div>
            <div>{serviceFee} €</div>
          </div>
          <div>
            {shippingOptions.map((option: any, index) => (
              <div key={index}>
                <p className="flex justify-between">
                  <span>{option.label}:</span>{" "}
                  <span> {option.amountTTC} €</span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between">
          <div>{t("order.total")}</div>
          <div>{total}</div>
        </div>
        <Button
          disabled={sellerId === buyerId}
          onClick={handleCheckout}
          className="mt-5 bg-accent hover:bg-yellow-700 w-full rounded-2xl"
        >
          {t("order.checkout")}
        </Button>
      </div>
    </>
  );
}
