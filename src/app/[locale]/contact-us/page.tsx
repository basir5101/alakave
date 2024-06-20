"use client";
import Navbar2 from "@/components/common/Navbar2";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export default function ContactUs() {
  const t = useTranslations("contactUs");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [messageData, setMessageData] = useState<any>({});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const messageBody = `
    <div>
    <h3>New Message From</h3>
    <div>First Name:  ${messageData.fname} </div>
    <div>Last Name: ${messageData.lname}</div>
    <div>E-mail: ${messageData.email}</div>
    <div>Phone: ${messageData.phone}</div>
    <div>User Type: ${messageData.user_type}</div>
    <div>comment: ${messageData.comment}</div>
    </div>
    `;
    const subject = "Contact Request";

    const res = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        messageBody,
        subject,
        to: "",
      }),
    });
    const data = await res.json();
  };
  const onInputChange = (e: any) => {
    const newData = { ...messageData };
    newData[e.target.name] = e.target.value;
    setMessageData(newData);
  };
  return (
    <div>
      <Navbar2 />
      <div className="pt-24 px-20">
        <div className="border shadow mt-10 p-4 lg:w-1/2 m-auto">
          <h1 className="font-sans font-medium text-center mt-5 ">
            {t("title")}
          </h1>
          <form onSubmit={handleSubmit} className="my-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                onChange={onInputChange}
                name="fname"
                placeholder={t("form.fname")}
                required={true}
              />
              <Input
                required={true}
                onChange={onInputChange}
                name="lname"
                placeholder={t("form.lname")}
              />
            </div>
            <Input
              onChange={onInputChange}
              className="mt-3"
              type="email"
              name="email"
              placeholder={t("form.email")}
              required={true}
            />
            <Input
              onChange={onInputChange}
              className="my-3"
              type="tel"
              name="phone"
              placeholder={t("form.phone")}
              required={true}
            />
            <Select
              required={true}
              name="user_type"
              onValueChange={(value) => {
                const newData = { ...messageData };
                newData.user_type = value;
                setMessageData(newData);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("form.user_type_ph")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"Un partenaire financier"}>
                  {t("form.user_types.fin_partner")}
                </SelectItem>
                <SelectItem value={"Presse"}>
                  {t("form.user_types.press")}
                </SelectItem>
                <SelectItem
                  value={
                    "Partenaire technique, produit ou opérations (Expert et professionnels du vin, sites web complémentaires, solutions de transport, etc…) "
                  }
                >
                  {t("form.user_types.tech_prod_partner")}
                </SelectItem>
                <SelectItem value={"Un utilisateur avec un problème"}>
                  {t("form.user_types.user_problem")}
                </SelectItem>
                <SelectItem value={"Un utilisateur avec des compliments "}>
                  {t("form.user_types.user_compliments")}
                </SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              className="mt-3"
              name="comment"
              placeholder={t("form.comment_ph")}
              onChange={onInputChange}
              required={true}
            ></Textarea>
            <div className="text-center">
              <Button
                type="submit"
                className="bg-accent mt-5 rounded-3xl px-14"
              >
                {t("form.submit_btn")}
              </Button>
            </div>
          </form>
          {submitted && (
            <p className="bg-secondary p-4 text-center">
              {t("form.thank_you")}
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
