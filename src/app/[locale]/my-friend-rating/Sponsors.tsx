"use client";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase-config";
import { User } from "@/types/user";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Invitation } from "@/types/invitation";
import Loader2 from "@/components/common/Loader2";
import { useTranslations } from "next-intl";

export default function Sponsors({
  user,
}: {
  user: { id: string; fullName: string; photoURL: string };
}) {
  const router = useRouter();
  const t = useTranslations("sponsor");

  const [verifiedUsers, setVerifiedUsers] = useState<User[]>([]);
  const [mySponsors, setMySponsors] = useState<Invitation[]>([]);
  const [message, setMessage] = useState<string>("");
  const [receiver, setReceiver] = useState<User>();
  const [selected, setSelected] = useState<User[]>([]);
  const [pendingInvitation, setPendingInvitation] = useState<Invitation[]>([]);
  const [selectedInvitation, setSelectedInvitation] = useState<Invitation>();
  const [inviteModalOpen, setInviteModalOpen] = useState<boolean>(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const getVerifiedUsers = async () => {
    setLoading(true);
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("verified", "==", true));
    const querySnapshot = await getDocs(q);
    const searchResults = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() } as User))
      .filter((item) => item.id !== user.id);
    setVerifiedUsers(searchResults);
    setLoading(false);
  };

  const getInvitations = async () => {
    setLoading(true);
    const invitationRef = collection(db, "userInvitations");
    const q = query(
      invitationRef,
      where("receiverId", "==", user.id),
      where("status", "==", "pending")
    );
    const querySnapshot = await getDocs(q);
    const searchResults = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Invitation)
    );
    setPendingInvitation(searchResults);
    setLoading(false);
  };

  const getSponsors = async () => {
    setLoading(true);
    try {
      const invitationRef = collection(db, "userInvitations");
      const q = query(
        invitationRef,
        where("senderId", "==", user.id),
        where("status", "==", "accepted")
      );
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Invitation)
      );
      setMySponsors(result);
    } catch (error) {
      console.log("error on fetching invitation", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSponsors();
    getVerifiedUsers();
    getInvitations();
  }, []);
  const handleSearchUser = (e: any) => {
    if (!e.target.value) {
      setSelected([]);
    } else {
      const input = e.target.value.toLowerCase();
      const searchUsers = verifiedUsers.filter(
        (user) =>
          user?.firstName?.toLowerCase().includes(input) ||
          user?.lastName?.toLowerCase().includes(input)
      );
      setSelected(searchUsers);
    }
  };

  const handleRequestSent = async () => {
    setInviteModalOpen(false);
    toast.loading("sending request");
    const requestRef = collection(db, "userInvitations");
    // Query for existing conversation between this buyer and seller regarding this product
    const inviteQuery = query(
      requestRef,
      where("senderId", "==", user.id),
      where("receiverId", "==", receiver?.id)
      // where("status", "==", "pending")
    );

    const inviteSnapshot = await getDocs(inviteQuery);
    if (inviteSnapshot.empty) {
      const querySnapshot = await addDoc(requestRef, {
        senderId: user.id,
        senderName: user.fullName,
        senderImg: user.photoURL,
        receiverId: receiver?.id,
        receiverName: receiver?.firstName + " " + receiver?.lastName,
        receiverImg: receiver?.photoURL,
        message: message,
        status: "pending", // accepted, declined
        createdAt: new Date().toISOString(),
      });
      toast.dismiss();
      toast.success("Successfully sent invitation");
    } else {
      toast.dismiss();
      toast.error("Invitation already sent");
    }
  };
  const handleAccept = async () => {
    setAcceptModalOpen(false);
    toast.loading("updating request status...");
    try {
      const userRef = doc(db, "users", user.id);
      const userData: any = (await getDoc(userRef)).data();
      const pendingRequestRef = doc(db, "userInvitations", requestId);
      await updateDoc(pendingRequestRef, {
        status: accepted ? "accepted" : "declined",
      });

      // Update the user's verified status if they have 3 verifications
      const requestRef = collection(db, "userInvitations");
      // Query for existing conversation between this buyer and seller regarding this product
      const inviteQuery = query(
        requestRef,
        where("senderId", "==", selectedInvitation?.senderId),
        where("receiverId", "==", selectedInvitation?.receiverId),
        where("status", "==", "accepted")
      );

      const inviteSnapshot = await getDocs(inviteQuery);
      const invitations = inviteSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (invitations.length >= 2 && !userData.verified) {
        await updateDoc(userRef, {
          verified: true,
        });
      }
      toast.dismiss();
      toast.success("successfully updated");
      getInvitations();
    } catch (error) {
      console.log("error", error);
      toast.dismiss();
      toast.error("update failed");
    }
  };

  return (
    <>
      <Toaster />
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="mt-8">
          <h3 className="underline text-xl font-bold"> {t("sponsorTitle")} </h3>
          {loading ? (
            <Loader2 />
          ) : mySponsors.length > 0 ? (
            <div className="mt-3">
              {mySponsors.map((sponsor) => (
                <div key={sponsor.id}>
                  <Image
                    src={sponsor.senderImg || "/"}
                    height={60}
                    width={60}
                    alt="sponsor"
                    className="rounded-full"
                    style={{ height: "60px" }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center border shadow py-10 mt-3">
              <div> {t("notFound")} </div>
            </div>
          )}
        </div>
        <div className="mt-8">
          <h3 className="underline text-xl font-bold">
            {" "}
            {t("childrenTitle")}{" "}
          </h3>
          <div className="text-center border shadow py-10 mt-3">
            <div> {t("notFound")}</div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="underline text-xl font-bold">{t("sponsorWaiting")}</h3>
          {loading ? (
            <Loader2 />
          ) : pendingInvitation.length > 0 ? (
            <div className="mt-4">
              {pendingInvitation.map((invitation) => (
                <div className="shadow p-4 border mb-3" key={invitation.id}>
                  <div className="flex items-center">
                    <Image
                      src={invitation.senderImg || "/"}
                      className="rounded-full mr-3"
                      height={70}
                      width={70}
                      style={{ height: "70px" }}
                      alt="invitation"
                    />
                    <div className="text-2xl font-semibold">
                      {" "}
                      {invitation.senderName}{" "}
                    </div>
                  </div>
                  <div>{invitation.message}</div>
                  <div className="flex justify-between mt-3 items-center">
                    <Button
                      onClick={() => {
                        setRequestId(invitation.id || "");
                        setSelectedInvitation(invitation);
                        setAcceptModalOpen(!inviteModalOpen);
                      }}
                      variant={"outline"}
                    >
                      Decline
                    </Button>
                    <Button
                      onClick={() => {
                        setRequestId(invitation.id || "");
                        setSelectedInvitation(invitation);
                        setAccepted(true);
                        setAcceptModalOpen(!inviteModalOpen);
                      }}
                      className="bg-accent hover:bg-yellow-600"
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center border shadow py-10 mt-3">
              <div> {t("notFound")} </div>
            </div>
          )}
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-bold">{t("search")}</h3>
          <div className="relative mt-3">
            <Input onChange={handleSearchUser} />
            <div className="absolute top-12 w-full">
              {selected.map((usr) => (
                <div
                  className="flex items-center cursor-pointer py-1"
                  onClick={() => {
                    setReceiver(usr);
                    setInviteModalOpen(true);
                  }}
                  key={usr.id}
                >
                  <Image
                    className="rounded-full mr-2"
                    src={usr.photoURL || "/"}
                    alt="usr"
                    height={40}
                    width={40}
                    style={{
                      height: "40px",
                    }}
                  />
                  <div>
                    {usr.firstName} {usr.lastName}{" "}
                  </div>
                </div>
              ))}
            </div>
            {/* modal for sending validation invitation  */}
            <Dialog
              open={inviteModalOpen}
              onOpenChange={() => setInviteModalOpen(!inviteModalOpen)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Envoyer une demande de vérification de profil.
                  </DialogTitle>
                  <DialogDescription>
                    <Textarea
                      className="mt-3"
                      rows={4}
                      defaultValue={`Bonjour ${receiver?.firstName} ${receiver?.lastName}
pourriez-vous s'il vous plaît me parrainer? J'aimerais aussi être membre d'alakave et voir ce que vous mettez en vente :)
Merci beaucoup
${user.fullName}`}
                      onChange={(e: any) => setMessage(e.target.value)}
                    ></Textarea>
                    <div className="text-center mt-3">
                      {" "}
                      <Button
                        onClick={handleRequestSent}
                        className="bg-accent hover:bg-yellow-700"
                      >
                        Envoyer un message{" "}
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            {/* modal for accept/decline invitation  */}
            <Dialog
              open={acceptModalOpen}
              onOpenChange={() => setAcceptModalOpen(!inviteModalOpen)}
            >
              <DialogContent className="py-5">
                <DialogHeader>
                  <DialogTitle className="text-center">Es-tu sûr?</DialogTitle>
                  <DialogDescription className="text-center">
                    <div>Vous ne pourrez pas revenir en arrière!</div>
                    <div className="flex justify-between mt-3">
                      <Button onClick={handleAccept} variant={"outline"}>
                        Non, annulez!
                      </Button>
                      <Button
                        onClick={handleAccept}
                        className="bg-accent hover:bg-yellow-700"
                      >
                        Oui, approuve-le
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
