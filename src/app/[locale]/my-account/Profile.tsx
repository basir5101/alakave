"use client";
import { db } from "@/lib/firebase-config";
import { uploadImageToStorage } from "@/lib/uploadImageToStorage";
import { User } from "@/types/user";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  CalendarIcon,
  Check,
  CreditCard,
  LocateIcon,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactDatePicker from "react-datepicker";
import { Textarea } from "@/components/ui/textarea";
import { Invitation } from "@/types/invitation";
import Loader2 from "@/components/common/Loader2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
// import "moment/locale/fr";
import { useLocale, useTranslations } from "next-intl";
import AddAddress from "../products/[productId]/payment/AddAddress";
import AddCard from "../products/[productId]/payment/AddCard";

export default function Profile({
  user,
  createdAt,
  data,
  userAddress,
  gotSponsors,
  gaveSponsors,
}: {
  user: User;
  createdAt: any;
  data: any;
  userAddress: any;
  gotSponsors: any;
  gaveSponsors: any;
}) {
  const t = useTranslations("myAccount");
  const locale = useLocale();
  const router = useRouter();
  const verifyEmail = useSearchParams()?.get("email");
  const userRef = doc(db, "users", user.id || "");
  const [open, setOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>({});
  const [cardDialog, setCardDialog] = useState<boolean>(false);
  const [pendingRequests, setPendingRequests] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [proInforModal, setProInforModal] = useState<boolean>(false);
  const [proData, setProData] = useState<any>({
    siret_number: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadButtonClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  useEffect(() => {
    if (locale === "fr") {
      import(`moment/locale/${locale}`).then(() => {
        moment.locale(locale);
      });
    } else {
      moment.locale("en");
    }
  }, [locale]);
  const handleFileChange = async (event: any) => {
    toast.loading("Uploading photo...");
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = await uploadImageToStorage(file, user?.id || "");
      await updateDoc(userRef, {
        photoURL: imageUrl,
      });
      toast.dismiss();
      toast.success("Photo successfully uploaded.");
      router.refresh();
    }
  };

  const handleUpdateProfile = async () => {
    toast.loading("updating profile");
    await updateDoc(userRef, userData);
    router.refresh();
    setOpen(false);
    toast.dismiss();
    toast.success("updated profile");
  };

  const getPendingRequests = async () => {
    setLoading(true);
    const requestRef = collection(db, "userInvitations");
    const inviteQuery = query(requestRef, where("senderId", "==", user.id));

    const requestSnapshot = await getDocs(inviteQuery);
    const requests = requestSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPendingRequests(requests);
    setLoading(false);
  };

  const emailVerification = async () => {
    await updateDoc(userRef, {
      emailVerified: true,
    });
    router.refresh();
  };

  useEffect(() => {
    if (verifyEmail) {
      emailVerification();
    }
    getPendingRequests();
  }, []);

  return (
    <div>
      <Toaster />
      <div className="lg:flex  justify-between">
        {/* left column */}
        <div className="lg:w-2/3 mr-6">
          <div className="flex items-center ">
            <div className="relative">
              <Image
                src={user?.photoURL || ""}
                className="h-18 w-18 border rounded-full"
                height={200}
                width={200}
                alt="profile pic"
                style={{
                  height: "130px",
                  width: "130px",
                }}
              />
              <div className="">
                <Pencil
                  onClick={handleUploadButtonClick}
                  className="absolute rounded-full cursor-pointer bg-accent text-white 
          h-9 w-9 p-2 bottom-0 right-0"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="ml-5 relative">
              <h2 className="font-semibold text-xl">
                {user.firstName} {user.lastName}{" "}
              </h2>
              <Pencil
                onClick={() => setOpen(!open)}
                className="absolute rounded-full cursor-pointer bg-accent text-white 
          h-9 w-9 p-2 -top-2 right-0"
              />
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className="text-accent text-2xl">
                    {index < Number(user.rating) ? "★" : ""}
                  </span>
                ))}
                {user.professional ? (
                  <button className="ml-2 bg-black text-white px-3 py-0.5 rounded-sm">
                    {t("userType")}
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div>
                {gotSponsors} {t("gotSponsor")} {gaveSponsors}
                {t("gaveSponsor")}
              </div>
              <div className="">
                {t("memberSince")} {moment(createdAt).format("DD MMM YYYY")}{" "}
              </div>
            </div>
          </div>
          <div className="mt-7">
            <div className="flex mb-1 justify-between items-center">
              <label className="font-semibold text-xl">{t("aboutYou")} </label>
              <Pencil
                onClick={() => setOpen(!open)}
                className=" rounded-full cursor-pointer bg-accent text-white 
          h-9 w-9 p-2 "
              />
            </div>
            <Textarea disabled></Textarea>
          </div>
          <div className="flex justify-between  mt-5">
            <div className="flex font-semibold text-lg items-center">
              <LocateIcon className="mr-3" /> <span>{t("addAddress")}</span>
            </div>
            <div>
              <AddAddress userId={user?.id} />
            </div>
          </div>
          <div className="shadow  p-4">
            <div className="mb-6">
              {userAddress?.length > 0 ? (
                <>
                  {userAddress.map((address: any, index: number) => (
                    <div key={index} className="flex mb-3">
                      <div>
                        <div>
                          <span className="font-semibold">
                            {address.firstName} {address.lastName}{" "}
                          </span>
                          {address.phone}
                        </div>
                        <div>
                          {address.zipCode} {address.address1}{" "}
                          {address.address2} {address.city}, FR
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-red-500 text-center font-semibold text-lg mb-3">
                  {t("notFoundAddress")}
                </div>
              )}
            </div>
          </div>
          <div className="mt-7">
            <div className="flex mb-1 justify-between items-center">
              <label className="font-semibold text-lg mb-3">
                {t("paymentMethods")}
              </label>
              {!data.data?.cardData?.Alias && (
                <AddCard card={data.data?.cardData} />
              )}
            </div>
            <div className="mt-1 border">
              {data.data?.cardData?.Alias ? (
                <div className="flex p-5 items-center ">
                  <CreditCard className="h-16 w-16 mr-4" />
                  <div>
                    <div>
                      <span className="font-semibold">
                        {user?.firstName} {user?.lastName}{" "}
                      </span>
                    </div>
                    <div>{data.data?.cardData.Alias}</div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-10 text-red-600">
                  {t("notFoundCard")}
                </div>
              )}
            </div>
          </div>
          {user?.professional && (
            <>
              <div className="flex justify-between items-center mt-5">
                <h2 className="font-semibold text-lg mb-3">
                  {t("proffesionalTitle")}
                </h2>
                <button onClick={() => setProInforModal(true)}>
                  <Pencil className=" font-bold bg-accent p-2 rounded-full h-9 w-9 text-white" />
                </button>
              </div>
              <div className="border bg-secondary py-2 px-2 mb-1">
                <div>
                  <h2 className="">{t("companyName")}</h2>
                  {user?.company_name && <div> {user?.company_name} </div>}
                </div>
              </div>
              <div className="border bg-secondary py-2 px-2 mb-1">
                <div>
                  <h2 className="">{t("siretNumber")}</h2>
                  {user?.siret_number && <div> {user?.siret_number} </div>}
                </div>
              </div>
              <div className="border bg-secondary py-2 px-2 mb-1">
                <div>
                  <h2 className="">{t("proof")}</h2>
                  {user?.proof && (
                    <a
                      className="bg-accent px-5 py-0.5 text-white rounded-sm"
                      href={user?.proof}
                      download={true}
                      target="_blank"
                    >
                      Télécharger
                    </a>
                  )}
                </div>
              </div>
              <div className="border bg-secondary py-2 px-2 mb-1">
                <div>
                  <h2 className="">{t("directDelivery")}</h2>
                  {<div> {user?.direct_delivery ? "Oui" : "Non"} </div>}
                </div>
              </div>
            </>
          )}
          <div className="mt-7">
            <h2 className="font-semibold text-lg mb-3">
              {t("preferenceTitle")}
            </h2>
            <div className="flex items-center mb-0.5">
              <Switch defaultChecked={true} />
              <span className="ml-3"> {t("notificationsEmail")} </span>
            </div>
            <div className="flex items-center mb-0.5">
              <Switch defaultChecked={true} />
              <span className="ml-3">{t("accountActivityAlerts")}</span>
            </div>
            <div className="flex items-center mb-0.5">
              <Switch defaultChecked={true} />
              <span className="ml-3">{t("marketingPromotion")}</span>
            </div>
            <div className="flex items-center mb-0.5">
              <Switch defaultChecked={true} />
              <span className="ml-3">{t("favoritesNotification")}</span>
            </div>
            <div className="flex items-center mb-0.5">
              <Switch defaultChecked={true} />
              <span className="ml-3">{t("personalizedContent")}</span>
            </div>
          </div>
        </div>
        {/* right column  */}
        <div className="lg:w-1/3">
          <h2 className="font-semibold text-xl text-accent">
            {t("verifiedInfo")}
          </h2>
          <div className="flex">
            {user?.emailVerified ? (
              <Check className="text-accent border border-accent h-5 w-5 mb-2 rounded-full p-0.5" />
            ) : (
              <X className="text-red-500 border-red-500 border h-5 w-5 mb-2 rounded-full p-0.5" />
            )}
            <span className="ml-2 text-sm">E-mail</span>
          </div>
          <div className="flex">
            <X className="text-red-500 border-red-500 border h-5 w-5 mb-2 rounded-full p-0.5" />
            <span className="ml-2 text-sm"> {t("phone")} </span>
          </div>
          <div className="flex">
            <X className="text-red-500 border border-red-500 h-5 w-5 mb-2 rounded-full p-0.5" />
            <span className="ml-2 text-sm w-full">{t("idProof")}</span>
          </div>
          <div className="border mt-5">
            <div className="flex py-6 px-2 justify-between items-center font-semibold text-lg">
              <span> {t("passwordChange")} </span>
              <Pencil
                onClick={() => setOpen(!open)}
                className=" rounded-full cursor-pointer bg-accent text-white 
          h-10 w-10 p-2 "
              />
            </div>
          </div>
          <div className="border mt-5">
            <div className="flex py-3 px-2  justify-between items-center font-semibold text-lg ">
              <span> {t("sponsorshipRequests")} </span>
            </div>
            <hr />
            {loading ? (
              <Loader2 />
            ) : pendingRequests.length > 0 ? (
              <div className="px-2 my-3">
                {pendingRequests.map((request) => (
                  <div
                    className="flex items-center justify-between"
                    key={request.id}
                  >
                    <div className="flex items-center">
                      <Image
                        src={request.receiverImg || "/"}
                        height={50}
                        width={50}
                        style={{ height: "50px" }}
                        alt="user"
                        className="rounded-full mr-2"
                      />
                      {request.receiverName}
                    </div>
                    <div
                      className={` px-3 py-0.5 rounded-full ${
                        request.status === "accepted"
                          ? "bg-accent text-white"
                          : request.status === "pending"
                          ? "bg-secondary"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {request.status === "accepted"
                        ? t("accepted")
                        : request.status === "pending"
                        ? t("pending")
                        : t("denied")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center my-2">{t("noRequest")}</div>
            )}
          </div>
        </div>
      </div>
      {/* Pro information dialog  */}
      <Dialog
        open={proInforModal}
        onOpenChange={() => setProInforModal(!proInforModal)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("proffesionalTitle")}</DialogTitle>
            {/* <DialogDescription>Edit you profile Details</DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="">
              <Input
                onChange={(e) =>
                  setProData({ ...proData, company_name: e.target.value })
                }
                className="mb-3"
                type="text"
                placeholder={t("companyName")}
                name="company_name"
              />
              <Input
                type="number"
                placeholder={t("siretNumber")}
                name="siret_number"
                onChange={(e) => {
                  const { value } = e.target;
                  // Regex to check if the value contains only digits
                  if (/^\d*$/.test(value)) {
                    // Check the length to ensure it's no more than 14 digits
                    if (value.length <= 14) {
                      setProData({ ...proData, siret_number: value });
                    }
                  }
                }}
                value={proData.siret_number}
              />
            </div>
            <Input
              onChange={async (e: any) => {
                const imageUrl = await uploadImageToStorage(
                  e.target.files[0],
                  user?.id || ""
                );
                setProData({ ...proData, proof: imageUrl });
              }}
              type="file"
            />
            <Select
              name="direct_delivery"
              onValueChange={(value) =>
                setProData({
                  ...proData,
                  direct_delivery: value === "1" ? true : false,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t("selfDelivery")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"1"}> {t("yes")} </SelectItem>
                <SelectItem value={"0"}> {t("no")} </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={() => setProInforModal(false)} variant={"outline"}>
              {t("close")}
            </Button>
            <Button
              onClick={async () => {
                setProInforModal(false);
                toast.loading("updating profile");
                await updateDoc(userRef, proData);
                router.refresh();
                setOpen(false);
                toast.dismiss();
                toast.success("updated profile");
              }}
              type="submit"
              className="bg-accent hover:bg-yellow-700"
            >
              {t("saveInfo")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Profile information dialog  */}
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle> {t("editProfile")} </DialogTitle>
            <DialogDescription> {t("editProfileDetails")}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Input
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                className="mb-3"
                type="text"
                placeholder={t("firstName")}
                defaultValue={user?.firstName}
              />
              <Input
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                className="mb-3"
                type="text"
                placeholder={t("lastName")}
                defaultValue={user?.lastName}
              />
            </div>
            <Input
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="mb-3"
              type="email"
              placeholder="E-mail"
              defaultValue={user?.email}
              disabled={true}
            />
            <div>
              <Input
                onChange={(e) =>
                  setUserData({ ...userData, phoneNumber: e.target.value })
                }
                className="mb-3"
                type="tel"
                placeholder={t("phonePlaceholder")}
                defaultValue={user?.phoneNumber}
              />
              <div className="relative">
                <ReactDatePicker
                  wrapperClassName="mb-3"
                  selected={
                    userData?.dateOfBirth || user.dateOfBirth || new Date()
                  }
                  onChange={(date) =>
                    setUserData({ ...userData, dateOfBirth: date })
                  }
                  placeholderText={t("dateOfBirth")}
                />
                <CalendarIcon className="absolute right-4 top-3 h-6 w-6 z-30" />
              </div>
              <Textarea
                onChange={(e) =>
                  setUserData({ ...userData, details: e.target.value })
                }
                className="mb-3"
                placeholder={t("details")}
                defaultValue={user?.details}
              ></Textarea>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant={"outline"}>
              {t("closeButton")}
            </Button>
            <Button
              onClick={handleUpdateProfile}
              type="submit"
              className="bg-accent hover:bg-yellow-700"
            >
              {t("updateProfile")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* card information dialog */}
      <Dialog open={cardDialog} onOpenChange={() => setCardDialog(!cardDialog)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle> {t("addPaymentMethod")} </DialogTitle>
          </DialogHeader>
          <div>
            {!data.data?.cardData?.Alias && (
              <AddCard card={data.data?.cardData} />
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant={"outline"}>
              Close
            </Button>
            <Button
              onClick={handleUpdateProfile}
              type="submit"
              className="bg-accent hover:bg-yellow-700"
            >
              Update Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
