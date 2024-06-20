"use client";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import { uploadImageToStorage } from "@/lib/uploadImageToStorage";
import NavbarIntro2 from "@/components/common/NavbarIntro2";
import { signInWithCredentials } from "@/lib/firebase/auth";

import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { professionalData } from "@/data/data";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/navigation";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  dateOfBirth: string;
  phoneNumber: string;
  professional: boolean;
  proValue: any;
}

export default function Register() {
  const t = useTranslations("register");
  const local = useLocale();
  const router = useRouter();
  const [date, setDate] = React.useState<Date | undefined>();
  const [image, setImage] = React.useState<any>();
  const [passType, setPassType] = useState("password");
  const [dateOfBirth, setDateOfBirth] = useState<any>("");
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    dateOfBirth: "",
    phoneNumber: "",
    professional: false,
    proValue: {},
  });
  const onDrop = useCallback((acceptedFiles: any) => {
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const handleProfessional = (role: string) => {
    setUserData((prevState) => ({
      ...prevState,
      professional: role === "true" ? true : false,
    }));
  };
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      return toast.error("Please upload photo.");
    }
    if (!dateOfBirth) {
      return toast.error("Veuillez indiquer la date de naissance.");
    }
    if (userData.password !== userData.confirmPassword) {
      toast.error("mot de passe incompatible");
    } else {
      toast.loading("nous créons votre compte…");
      try {
        // Create the user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );

        const user = userCredential.user;
        const imageUrl = await uploadImageToStorage(image, user.uid);
        // Update the user's display name and profile photo URL
        await updateProfile(user, {
          displayName: userData.firstName + " " + userData.lastName,
          photoURL: imageUrl,
        });
        const regRes = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.uid,
            photoURL: imageUrl,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNumber: userData.phoneNumber,
            role: userData.role,
            email: user.email,
            dateOfBirth: dateOfBirth,
            professional: userData.professional,
            proValue: userData.proValue,
            createdAt: new Date().toISOString(),
          }),
        });
        const regData = await regRes.json();
        if (!regRes.ok) {
          throw new Error(
            regData.error || "Failed to register user data on server."
          );
        }

        toast.dismiss();
        toast.success("Successfully registered");

        const messageBody1 = `<!DOCTYPE html>
                  <html>
                  <head>
                  <title>Welcome to Alakave.com</title>
                  <style>
                  body {
                  font-family: Petita, sans-serif;
                  margin: 0;
                  padding: 0;
                  color: #333;
                  }
                  .header {
                  background-color: #f8f9fa;
                  padding: 10px 20px;
                  text-align: center;
                  border-bottom: 1px solid #e1e1e1;
                  }
                  .content {
                  padding: 20px;
                  text-align: center;
                  }
                  .button {
                  display: inline-block;
                  padding: 10px 20px;
                  margin: 20px 0;
                  background-color: #BF9000;
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
                  font-weight: bold;
                  }
                  .footer {
                  text-align: center;
                  padding: 20px;
                  font-size: 12px;
                  line-height: 20px;
                  border-top: 1px solid #e1e1e1;
                  }
                  .logo {
                  width: 150px;
                  margin-bottom: 20px;
                  }
                  </style>
                  </head>
                  <body>
                  <div class="header">
                  <h1>Bienvenue chez Alakave.com</h1>
                  </div>
                  <div class="content">
                  <h2>Bonjour et merci ${userData.firstName} ${userData.lastName} de nous rejoindre !</h2>
                  <p>Pour commencer, veuillez confirmer votre adresse e-mail.</p>
                  <a href="${window.location.origin}/my-account?email=true" target="_blank" class="button">Validez votre email</a>
                  </div>
                  <div class="footer">
                  <img src= src="/png/logo-black.png" alt="Alakave Logo" class="logo">
                  <div>
                  
                  </div>
                 
                  </div>
                  </body>
                  </html>`;
        const subject = "Registration Successful";

        await fetch("/api/email", {
          method: "POST",
          body: JSON.stringify({
            messageBody: messageBody1,
            subject,
            to: userData.email,
          }),
        });

        toast.dismiss();
        toast.loading("Login user...");
        await signInWithCredentials(userData.email, userData.password);
        toast.dismiss();
        router.push(`/${local}/home_screen`); // Redirect to the home screen
      } catch (error) {
        toast.dismiss();
        if (error instanceof Error) {
          if (error.message.includes("auth/email-already-in-use")) {
            toast.error("Email address is already in use");
          } else {
            toast.error("Register failed!");
            console.error("Error registering user:", error);
          }
        } else {
          toast.error("An unknown error occurred");
          console.error("Unknown error:", error);
        }
      }
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push(`/home_screen`);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex m-auto items-center jusce min-h-screen">
      <NavbarIntro2 />

      <Toaster />
      <div className="lg:w-2/5 max-w-[650px] bg-white mx-auto shadow border lg:p-8 mt-24 mb-10 p-5 ">
        <h1 className="text-center text-3xl font-bold mb-4">{t("title")}</h1>
        <h3 className="mb-10 text-sm text-center">{t("welcome")}</h3>
        <form onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-3">
            <Input
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
              className="mb-3"
              type="text"
              placeholder={t("form.fname")}
              autoComplete="off"
            />
            <Input
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
              className="mb-3"
              type="text"
              placeholder={t("form.lname")}
              autoComplete="off"
            />
          </div>
          <Input
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="mb-3"
            type="email"
            placeholder={t("form.email")}
            autoComplete="off"
          />
          <div className="relative">
            <div
              className="border shadow border-dotted p-10 mb-3 text-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>{t("form.photo_upload")}</p>
              )}
            </div>
            {image && (
              <Image
                src={URL.createObjectURL(image)}
                height={200}
                width={300}
                alt={"profile"}
                className="absolute left-0 top-0"
                style={{ height: "100px", width: "auto" }}
              />
            )}
          </div>
          <Input
            onChange={(e) =>
              setUserData({ ...userData, phoneNumber: e.target.value })
            }
            className="mb-3"
            type="tel"
            placeholder={t("form.phone")}
            autoComplete="off"
          />
          <div className="relative">
            <DatePicker
              wrapperClassName="mb-3"
              selected={dateOfBirth}
              onChange={(date) => setDateOfBirth(date)}
              placeholderText={t("form.dob")}
              onFocus={() => {
                if (!dateOfBirth) {
                  setDateOfBirth(new Date());
                }
              }}
            />
            <CalendarIcon className="absolute right-4 top-3 h-6 w-6 z-30" />
          </div>
          <div className="relative mb-3">
            <Input
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              type={passType}
              placeholder={t("form.pass")}
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
          <div className="relative mb-3">
            <Input
              onChange={(e) =>
                setUserData({ ...userData, confirmPassword: e.target.value })
              }
              type={passType}
              placeholder={t("form.confirm_pass")}
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
          <Select onValueChange={handleProfessional}>
            <SelectTrigger>
              <SelectValue placeholder={t("form.prof_label")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">{t("form.prof_options.yes")}</SelectItem>
              <SelectItem value="false">{t("form.prof_options.no")}</SelectItem>
            </SelectContent>
          </Select>
          {userData.professional && (
            <div className="mt-2">
              {professionalData.map((formData, index) => (
                <div key={index} className="flex mb-0.5 items-center">
                  <Checkbox
                    name={formData.value}
                    onCheckedChange={(checked: boolean) => {
                      console.log("check", checked);
                      const newData = { ...userData };
                      newData.proValue[formData.value] = checked;
                    }}
                  />
                  <span className="ml-3"> {formData.label} </span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-3 text-center text-sm">
            {t("form.terms_label")}{" "}
            <span className="font-semibold text-accent">{t("form.term")} </span>{" "}
            {t("form.and")}{" "}
            <span className="font-semibold text-accent">
              {t("form.policy")}
            </span>
          </div>
          <div className="text-center mt-5">
            <Button
              type="submit"
              className="bg-accent mt-3 rounded-full w-52 hover:bg-yellow-700"
            >{`S'inscrire`}</Button>
            <div className="mt-5">
              {t("form.has_account")}{" "}
              <Link className="text-accent" href={`/${local}/login`}>
                {" "}
                {t("form.login_link")}{" "}
              </Link>{" "}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
