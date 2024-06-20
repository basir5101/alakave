"use client";
import { Pencil, Plus } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface CardData {
  [key: string]: string;
}
export default function AddCard({ card }: any) {
  const t = useTranslations("myAccount");
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [cardData, setCardData] = useState<CardData>({});
  const [token, setToken] = useState<string>();
  const [validatedCard, setValidatedCard] = useState<any>();

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    // Convert cardData to a query string
    const formData = new URLSearchParams();
    Object.entries(cardData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("accessKeyRef", card.AccessKey);
    formData.append("data", card.PreregistrationData);

    const res = await fetch(card.CardRegistrationURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData, // Pass formData here
    });
    toast.dismiss();
    // Check if the response is successful (status code 2xx)
    if (res.ok) {
      // Check if the response content type is JSON
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const resObj = await res.json();
        setToken(resObj);
      } else {
        // Handle non-JSON response here
        const text = await res.text();
        setToken(text);
        toast.success("Card successfully added.");
        toast.loading("Updating Card...");
        await handleUpdate({
          Id: card.Id,
          UserId: card.UserId,
          Currency: "EUR",
          CardType: "CB_VISA_MASTERCARD",
          RegistrationData: text,
        });
      }
      toast.dismiss();
      toast.success("Card Updated Successfully");
    } else {
      console.error("Error:", res.statusText);
    }
  };

  const handleUpdate = async (cardData: {
    Id: string;
    UserId: string;
    Currency: string;
    CardType: string;
    RegistrationData: string;
  }) => {
    const res = await fetch("/api/mangopay/user", {
      method: "PUT",
      body: JSON.stringify(cardData),
    });
    const data = await res.json();
    setValidatedCard(data.data);
    router.refresh();
    setOpen(false);
  };

  // handle card data
  const handleCardData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  return (
    <>
      <Toaster />
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger>
          <Pencil className="bg-accent p-2 rounded-full h-9 w-9 text-white" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("card.title")} </DialogTitle>
            <DialogDescription>
              <>
                <form onSubmit={handlePayment} className=" py-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="card-number"
                    >
                      {t("card.cardNumber")}
                    </label>
                    <input
                      className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="card-number"
                      name="cardNumber"
                      type="text"
                      placeholder="**** **** **** ****"
                      onChange={handleCardData}
                      required={true}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="expiration-date"
                    >
                      {t("card.date")}
                    </label>
                    <input
                      className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="expiration-date"
                      name="cardExpirationDate"
                      type="text"
                      placeholder="MM/YY"
                      onChange={handleCardData}
                      required={true}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="cvv"
                    >
                      {t("card.CVV")}
                    </label>
                    <input
                      className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="cvv"
                      name="cardCvx"
                      type="text"
                      placeholder="***"
                      onChange={handleCardData}
                      required={true}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-accent hover:bg-yellow-700"
                  >
                    Ajouter une nouvelle carte
                  </Button>
                </form>
              </>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
