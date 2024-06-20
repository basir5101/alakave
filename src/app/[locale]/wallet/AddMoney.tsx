"use client";
import React from "react";
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
import { useTranslations } from "next-intl";
// import { Input } from "@/components/ui/input";

export default function AddMoney({ cardData }: any) {
  const t = useTranslations("wallet");
  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-accent py-2 px-6 rounded-3xl">
          {t("dialogTrigger")}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("dialogTitle")}</DialogTitle>
            <DialogDescription>
              <div>
                <div className="grid grid-cols-2 gap-3">
                  <div>{cardData && <div>CARD: {cardData.Alias}</div>}</div>
                  <div>
                    <div className="border p-3">
                      <label> {t("dialogDescription.enterAmount")} </label>
                      <div className="flex">
                        <span className="font-semibold text-lg">€</span>
                        <input
                          type="number"
                          className="focus:outline-none px-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-accent hover:bg-yellow-700 mt-5 rounded-3xl">
                  {t("dialogDescription.addBalanceButton")}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* <Button className="bg-accent"></Button> */}
    </div>
  );
}
