"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { UserRecord } from "firebase-admin/auth";
import { signInWithCredentials, signOut } from "@/lib/firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import NavbarIntro from "./common/NavbarIntro";
import NavbarIntro2 from "./common/NavbarIntro2";
import { useLocale, useTranslations } from "next-intl";

export default function PageContent({
  variant,
  currentUser,
}: {
  variant: "sign-in" | "dashboard";
  currentUser?: UserRecord;
}) {
  const t = useTranslations("login");
  const local = useLocale();
  const router = useRouter();
  const [passType, setPassType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle the Firebase sign-in process
  const handleFirebaseSignIn = async () => {
    toast.loading("Please wait...");
    try {
      const isOk = await signInWithCredentials(email, password);
      if (isOk) {
        toast.dismiss();
        toast.success("Authentication successful");
        // Redirect to the home page or dashboard as needed
        router.push(`/${local}/home_screen`);
      } else {
        toast.dismiss();
        toast.error("Authentication failed!");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Authentication failed. Please check your credentials.");
      console.error("Error during Firebase sign-in:", error);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleFirebaseSignIn();
  };

  if (variant === "sign-in")
    return (
      <>
        <NavbarIntro2 />
        <Toaster />
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-[650px] lg:w-2/4 mx-3  bg-white m-auto border rounded-lg  py-6 px-12">
            <h1 className="text-center text-3xl font-bold">
              {t("signInTitle")}
            </h1>
            <h3 className="mb-10 text-sm text-center">{t("promptText")}</h3>
            <div>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3"
                type="email"
                placeholder={t("emailPlaceholder")}
              />
              <div className="relative">
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type={passType}
                  placeholder={t("passwordPlaceholder")}
                />
                {passType === "password" ? (
                  <EyeOff
                    onClick={() => setPassType("text")}
                    size={24}
                    className="absolute right-4 top-2 hover:cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setPassType("password")}
                    size={24}
                    className="absolute right-4 top-2 hover:cursor-pointer"
                  />
                )}
              </div>
              <div className="flex mt-2  text-sm justify-between">
                <div className="flex items-center justify-center">
                  <Checkbox />
                  <div className="ml-1">{t("rememberPasswordText")}</div>
                </div>
                <div className="text-accent">{t("forgotPasswordText")}</div>
              </div>
              <div className="text-center mt-5">
                <Button
                  onClick={handleSubmit}
                  className="bg-accent mt-3 rounded-full w-52 hover:bg-yellow-700"
                >
                  Login
                </Button>
                <div className="mt-5">
                  {t("noAccountText")}
                  <Link className="text-accent" href={`/${local}/register`}>
                    {" "}
                    {t("registerLinkText")}
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  else return null;
}
