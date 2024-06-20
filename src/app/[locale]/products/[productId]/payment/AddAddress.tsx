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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface CardData {
  [key: string]: string;
}
export default function AddAddress({ userId }: any) {
  const t = useTranslations("myAccount");
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [addressData, setAddressData] = useState<CardData>({});

  // add address
  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    toast.loading("Adding address..");
    try {
      const res = await fetch("/api/address", {
        method: "POST",
        body: JSON.stringify({ ...addressData, userId: userId }),
      });
      const data = await res.json();
      toast.dismiss();
      toast.success("Address added successfully");
      //   window.location.reload();
      router.refresh();
      setOpen(false);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to add address");
    }
  };

  const handleCardData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  return (
    <>
      <Toaster />
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger>
          {" "}
          <Pencil className="bg-accent p-2 rounded-full h-9 w-9 text-white" />{" "}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> {t("address.dialogTitle")} </DialogTitle>
            <DialogDescription>
              <>
                <form onSubmit={handlePayment} className=" py-4">
                  <div className="mb-4">
                    <div>
                      {[
                        {
                          required: true,
                          label: t("address.form.firstName"),
                          name: "firstName",
                        },
                        {
                          required: true,
                          label: t("address.form.lastName"),
                          name: "lastName",
                        },
                        {
                          required: true,
                          label: t("address.form.phone"),
                          name: "phone",
                        },
                        {
                          required: false,
                          label: t("address.form.alternativePhone"),
                          name: "alternativePhone",
                        },
                        {
                          required: true,
                          label: t("address.form.address1"),
                          name: "address1",
                        },
                        {
                          required: false,
                          label: t("address.form.address2"),
                          name: "address2",
                        },
                        {
                          required: false,
                          label: t("address.form.landmark"),
                          name: "landmark",
                        },
                        {
                          required: true,
                          label: t("address.form.city"),
                          name: "city",
                        },
                        {
                          required: true,
                          label: t("address.form.zipCode"),
                          name: "zipCode",
                        },
                      ].map((field, index) => (
                        <Input
                          key={index}
                          className="mb-2"
                          placeholder={field.label}
                          required={field.required}
                          onChange={handleCardData}
                          name={field.name}
                        />
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="bg-accent hover:bg-yellow-700"
                  >
                    {t("address.buttonSubmit")}
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
